import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import type { UnprefixedTranslationKeys } from '../../../../translations/useTypedTranslation';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { VendorFormViewProps } from '../components/vendorFormViewContracts';
import {
  getActivePairingStandId,
  getSelectedStandIds,
  removeSecondStand,
  toggleStandOption
} from '../../../../domain/vendorApplications/vendorFormUtils.ts';
import { isVendorStand, parseHallStands } from '../../../../components/hall/hallStands.ts';
import { isReservedStand } from '../../../../components/hall/standReservationUtils.ts';
import { getFreeNeighbourStandIds, getUnpairableStandIds } from '../vendorFormStandOptionsUtils.ts';
import {
  fetchStandsDemandFromApi,
  submitVendorApplicationToApi
} from '../../../../domain/vendorApplications/vendorFormApi.ts';
import {
  VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH,
  VENDOR_FORM_DRAFT_STORAGE_KEY,
  VENDOR_FORM_LOGO_MAX_BYTES
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
import { isVendorFormOpenByServerClock } from '../../../../domain/vendorApplications/vendorFormServerClock.ts';
import { hasVerifiedVendorFormAdminAccess } from '../vendorFormAdminAccess';

const VENDOR_FORM_FIELD_ATTRIBUTE = 'data-vendor-form-field';

const collectSchemaErrors = (values: VendorFormValues) => {
  const result = vendorFormValidationSchema.safeParse(values);

  return result.success
    ? {}
    : Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message]));
};

const readSelectableHallStands = () => {
  const parsedStands = parseHallStands();

  return parsedStands.success
    ? parsedStands.data.filter((stand) => isVendorStand(stand) && !isReservedStand(stand))
    : [];
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
  const [isStandDemandLoaded, setIsStandDemandLoaded] = useState<boolean>(false);
  const [pairingStandId, setPairingStandId] = useState<string | null>(null);
  const [selectableHallStands] = useState(readSelectableHallStands);

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
      .then((data) => {
        setStandDemand(data);
        setIsStandDemandLoaded(true);
      })
      .catch(() => {
        setStandDemand({});
        setIsStandDemandLoaded(false);
      });
  }, []);

  const highInterestStandIds = useMemo(() => getHighDemandStandIds(standDemand), [standDemand]);

  const selectedStandIds = useMemo(
    () => getSelectedStandIds(formData.preferredStandGroups),
    [formData.preferredStandGroups]
  );

  const activePairingStandId = getActivePairingStandId(formData.preferredStandGroups, pairingStandId);

  const pairableStandIds = useMemo(
    () =>
      activePairingStandId
        ? getFreeNeighbourStandIds(selectableHallStands, activePairingStandId, selectedStandIds)
        : null,
    [activePairingStandId, selectableHallStands, selectedStandIds]
  );

  const unpairableStandIds = useMemo(
    () => getUnpairableStandIds(selectableHallStands, formData.preferredStandGroups),
    [selectableHallStands, formData.preferredStandGroups]
  );

  const highInterestSelectedStandIds = useMemo(
    () => selectedStandIds.filter((standId) => highInterestStandIds.includes(standId)),
    [selectedStandIds, highInterestStandIds]
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

  const setPreferredStandGroups = (preferredStandGroups: string[][]) => {
    setValue('preferredStandGroups', preferredStandGroups, { shouldDirty: true, shouldValidate: hasAttemptedSubmit });
    markFormAsIncompleteAndClearSubmitError();
  };

  const togglePreferredStand = (standId: string) => {
    setPreferredStandGroups(toggleStandOption(getValues('preferredStandGroups'), standId, activePairingStandId));
    setPairingStandId(null);
  };

  const setStandOptionPaired = (optionIndex: number, isPaired: boolean) => {
    const preferredStandGroups = getValues('preferredStandGroups');

    if (isPaired) {
      setPairingStandId(preferredStandGroups[optionIndex]?.[0] ?? null);
      return;
    }

    setPairingStandId(null);
    setPreferredStandGroups(removeSecondStand(preferredStandGroups, optionIndex));
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
    if (isLoadingLogo || !(hasVerifiedVendorFormAdminAccess() || isVendorFormOpenByServerClock())) {
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
      setPairingStandId(null);
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
      highInterestStandIds,
      interestKnownStandIds: Object.keys(standDemand),
      isStandDemandAvailable: isStandDemandLoaded,
      pairableStandIds,
      pairingStandId: activePairingStandId,
      selectedStandIds,
      unpairableStandIds
    },
    formActions: {
      closeSuccessModal,
      setAcceptedStatuteValue,
      setBooleanFieldValue,
      setMainCategory,
      setStandOptionPaired,
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
