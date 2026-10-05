import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import type { UnprefixedTranslationKeys } from '../../../../translations/useTypedTranslation';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { VendorFormViewProps } from '../components/vendorFormViewContracts';
import { toggleStandSelection } from '../../../../domain/vendorApplications/vendorFormUtils.ts';
import {
  fetchStandsDemandFromApi,
  submitVendorApplicationToApi
} from '../../../../domain/vendorApplications/vendorFormApi.ts';
import {
  VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH,
  VENDOR_FORM_DRAFT_STORAGE_KEY,
  VENDOR_FORM_LOGO_MAX_BYTES,
  VENDOR_FORM_MAX_PREFERRED_STANDS
} from '../../../../domain/vendorApplications/vendorFormConstants.ts';
import {
  collectVendorFormValidationErrors,
  vendorFormValidationSchema,
  type VendorFormValues
} from '../../../../domain/vendorApplications/vendorFormSchema.ts';
import { LogoTooLargeError, prepareLogoForUpload } from '../../../../domain/vendorApplications/vendorFormLogoUtils.ts';
import {
  INITIAL_VENDOR_FORM_STATE,
  type StandDemand,
  type VendorFormState
} from '../../../../domain/vendorApplications/vendorFormTypes.ts';
import { focusFirstInvalidField } from '../../../../components/form/formFocus.ts';
import { isFormDraftRestorable, resolveFormDraftStatus } from '../../../../components/form/formDraftStatusUtils.ts';
import { createEmptyVendorFormDraft, parseStoredVendorFormDraft } from '../vendorFormStorage.ts';
import { getHighDemandStandIds } from '../../../../domain/vendorApplications/vendorFormStandInterestUtils.ts';

const VENDOR_FORM_FIELD_ATTRIBUTE = 'data-vendor-form-field';

const collectSchemaErrors = (values: VendorFormValues) => {
  const result = vendorFormValidationSchema.safeParse(values);

  return result.success
    ? {}
    : Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message]));
};

const readInitialVendorFormDraft = () => {
  const storedDraft = parseStoredVendorFormDraft(window.localStorage.getItem(VENDOR_FORM_DRAFT_STORAGE_KEY));

  return {
    draft: storedDraft ?? createEmptyVendorFormDraft(),
    wasRestored: isFormDraftRestorable(storedDraft, INITIAL_VENDOR_FORM_STATE)
  };
};

export const useVendorForm = (): VendorFormViewProps => {
  const t = useTypedTranslation();
  const [{ draft: initialDraft, wasRestored: wasDraftRestored }] = useState(readInitialVendorFormDraft);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [submittedFormData, setSubmittedFormData] = useState<VendorFormState | null>(null);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof VendorFormValues, string>>>({});
  const [standDemand, setStandDemand] = useState<StandDemand>({});

  const form = useForm<VendorFormValues>({
    defaultValues: initialDraft.formData,
    mode: 'onSubmit',
    resolver: zodResolver(vendorFormValidationSchema) as Resolver<VendorFormValues>
  });

  const { formState, getValues, register, reset, setValue, trigger, watch } = form;
  const formData = watch();
  const draftStatus = resolveFormDraftStatus({
    isComplete,
    isDirty: formState.isDirty,
    wasRestored: wasDraftRestored
  });

  useEffect(() => {
    if (formState.isDirty) {
      setIsComplete(false);
    }
  }, [formState.isDirty]);

  const markFormAsIncompleteAndClearSubmitError = () => {
    setIsComplete(false);
    setSubmitError('');
  };

  useEffect(() => {
    fetchStandsDemandFromApi()
      .then(setStandDemand)
      .catch(() => setStandDemand({}));
  }, []);

  const highInterestStandIds = useMemo(() => getHighDemandStandIds(standDemand), [standDemand]);

  const highInterestSelectedStandIds = useMemo(
    () => formData.preferredStands.filter((standId) => highInterestStandIds.includes(standId)),
    [formData.preferredStands, highInterestStandIds]
  );

  const updateLogoFile = async (file: File | null) => {
    if (!file) {
      setValue('logoFileName', null, { shouldDirty: true });
      setValue('logoDataUrl', null, { shouldDirty: true });
      setValue('logoMimeType', null, { shouldDirty: true });
      void trigger(['logoFileName', 'logoDataUrl', 'logoMimeType']);
      markFormAsIncompleteAndClearSubmitError();
      return;
    }

    setIsLoadingLogo(true);

    try {
      const preparedLogo = await prepareLogoForUpload(file, VENDOR_FORM_LOGO_MAX_BYTES);

      setValue('logoFileName', file.name, { shouldDirty: true });
      setValue('logoDataUrl', preparedLogo.dataUrl, { shouldDirty: true });
      setValue('logoMimeType', preparedLogo.mimeType, { shouldDirty: true });
      void trigger(['logoFileName', 'logoDataUrl', 'logoMimeType']);
      markFormAsIncompleteAndClearSubmitError();
    } catch (error) {
      console.error(error);
      setSubmitError(
        t(error instanceof LogoTooLargeError ? 'vendorsFormPage.logoTooLargeError' : 'vendorsFormPage.logoUploadError')
      );
    } finally {
      setIsLoadingLogo(false);
    }
  };

  const togglePreferredStand = (standId: string) => {
    const nextValue = toggleStandSelection(getValues('preferredStands'), standId, VENDOR_FORM_MAX_PREFERRED_STANDS);

    setValue('preferredStands', nextValue, { shouldDirty: true, shouldValidate: hasAttemptedSubmit });
    markFormAsIncompleteAndClearSubmitError();
  };

  useEffect(() => {
    if (isComplete) {
      window.localStorage.removeItem(VENDOR_FORM_DRAFT_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(VENDOR_FORM_DRAFT_STORAGE_KEY, JSON.stringify({ formData, isComplete }));
  }, [formData, isComplete]);

  const submittedAtLabel = useMemo(() => {
    if (!submittedAt) {
      return null;
    }

    return new Intl.DateTimeFormat(t.i18n.language, {
      dateStyle: 'long',
      timeStyle: 'medium'
    }).format(new Date(submittedAt));
  }, [submittedAt, t.i18n.language]);

  useEffect(() => {
    if (!hasAttemptedSubmit) {
      return;
    }

    const nextValidationErrors = collectVendorFormValidationErrors(formData);

    setValidationErrors((currentValidationErrors) =>
      JSON.stringify(currentValidationErrors) === JSON.stringify(nextValidationErrors)
        ? currentValidationErrors
        : nextValidationErrors
    );
  }, [formData, hasAttemptedSubmit]);

  const submitVendorForm = async () => {
    if (isLoadingLogo) {
      return;
    }

    setHasAttemptedSubmit(true);
    setSubmitError('');
    const nextValidationErrors = collectVendorFormValidationErrors(getValues());
    setValidationErrors(nextValidationErrors);

    const isValid = Object.keys(nextValidationErrors).length === 0 && (await trigger());

    if (!isValid) {
      focusFirstInvalidField(
        VENDOR_FORM_FIELD_ATTRIBUTE,
        Object.keys(
          Object.keys(nextValidationErrors).length > 0 ? nextValidationErrors : collectSchemaErrors(getValues())
        )
      );
      return;
    }

    const validatedFormData = getValues();

    setIsSubmitting(true);

    try {
      setSubmittedAt(await submitVendorApplicationToApi(validatedFormData));
      setSubmittedFormData(validatedFormData);
      setIsComplete(true);
      setIsSuccessModalOpen(true);
      setHasAttemptedSubmit(false);
      setValidationErrors({});
      reset(INITIAL_VENDOR_FORM_STATE);
    } catch (error) {
      console.error(error);
      setSubmitError(t('vendorsFormPage.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const setMainCategory = (category: VendorFormValues['mainCategory']) => {
    setValue('mainCategory', category, { shouldDirty: true, shouldValidate: true });

    if (category !== 'other') {
      setValue('mainCategoryOther', '', { shouldDirty: true, shouldValidate: true });
    }

    markFormAsIncompleteAndClearSubmitError();
  };

  const setBooleanFieldValue = (
    fieldName: 'attendedBefore' | 'interestedIfUnavailable' | 'sponsorshipInterest',
    value: boolean
  ) => {
    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
    markFormAsIncompleteAndClearSubmitError();
  };

  const setAcceptedStatuteValue = (value: boolean) => {
    setValue('acceptedStatute', value, { shouldDirty: true, shouldValidate: true });
    markFormAsIncompleteAndClearSubmitError();
  };

  const updateBusinessDescription = (value: string) => {
    setValue('businessDescription', value.slice(0, VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH), {
      shouldDirty: true,
      shouldValidate: true
    });
    markFormAsIncompleteAndClearSubmitError();
  };

  const resolveFieldErrorMessage = (...fieldNames: Array<keyof VendorFormValues>): string => {
    if (!hasAttemptedSubmit) {
      return '';
    }

    for (const fieldName of fieldNames) {
      const messageKey = validationErrors[fieldName] ?? formState.errors[fieldName]?.message;

      if (typeof messageKey === 'string') {
        return t(messageKey as UnprefixedTranslationKeys);
      }
    }

    return '';
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return {
    derivedState: {
      highInterestSelectedStandIds,
      highInterestStandIds
    },
    formActions: {
      closeSuccessModal,
      setAcceptedStatuteValue,
      setBooleanFieldValue,
      setMainCategory,
      submitVendorForm,
      togglePreferredStand,
      updateBusinessDescription,
      updateLogoFile
    },
    formBindings: {
      formData,
      register,
      resolveFieldErrorMessage
    },
    formStatus: {
      draftStatus,
      isLoadingLogo,
      isSuccessModalOpen,
      isSubmitting,
      submitError,
      submittedFormData,
      submittedAtLabel
    }
  };
};
