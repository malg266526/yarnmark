import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { toggleStandSelection } from '../vendorFormUtils.ts';
import {
  createVendorApplication,
  listStandInterestCounts
} from '../../vendors-applications/vendorsApplicationsStorage.ts';
import {
  VENDOR_FORM_DRAFT_STORAGE_KEY,
  VENDOR_FORM_LOGO_MAX_BYTES,
  VENDOR_FORM_MAX_PREFERRED_STANDS
} from '../vendorFormConstants.ts';
import {
  collectVendorFormValidationErrors,
  vendorFormValidationSchema,
  type VendorFormValues
} from '../vendorFormSchema.ts';
import { LogoTooLargeError, prepareLogoForUpload } from '../vendorFormLogoUtils.ts';
import { createEmptyVendorFormDraft, parseStoredVendorFormDraft } from '../vendorFormStorage.ts';
import { isHighInterestStand } from '../vendorFormStandInterestUtils.ts';

const readStoredVendorFormDraftOrCreateEmptyDraft = () =>
  parseStoredVendorFormDraft(window.localStorage.getItem(VENDOR_FORM_DRAFT_STORAGE_KEY)) ??
  createEmptyVendorFormDraft();

export const useVendorForm = () => {
  const t = useTypedTranslation();
  const { i18n, t: rawT } = useTranslation();
  const [initialDraft] = useState(readStoredVendorFormDraftOrCreateEmptyDraft);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [standInterestCounts, setStandInterestCounts] = useState<Map<string, number>>(() => new Map());
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof VendorFormValues, string>>>({});
  const form = useForm<VendorFormValues>({
    defaultValues: initialDraft.formData,
    mode: 'onSubmit',
    resolver: zodResolver(vendorFormValidationSchema)
  });
  const { formState, getValues, register, reset, setValue, trigger, watch } = form;
  const formData = watch();

  useEffect(() => {
    void listStandInterestCounts().then((response) => {
      setStandInterestCounts(response.standInterestCounts);
    });
  }, []);

  const highInterestStandIds = useMemo(
    () =>
      [...standInterestCounts.entries()]
        .filter(([, interestCount]) => isHighInterestStand(interestCount))
        .map(([standId]) => standId),
    [standInterestCounts]
  );
  const highInterestSelectedStandIds = useMemo(
    () => formData.preferredStands.filter((standId) => highInterestStandIds.includes(standId)),
    [formData.preferredStands, highInterestStandIds]
  );

  const updateLogoFile = async (file: File | null) => {
    if (!file) {
      setValue('logoFileName', null, { shouldDirty: true, shouldValidate: true });
      setValue('logoDataUrl', null, { shouldDirty: true, shouldValidate: true });
      setValue('logoMimeType', null, { shouldDirty: true, shouldValidate: true });
      setIsComplete(false);
      setSubmitError('');
      return;
    }

    setIsLoadingLogo(true);

    try {
      const preparedLogo = await prepareLogoForUpload(file, VENDOR_FORM_LOGO_MAX_BYTES);

      setValue('logoFileName', file.name, { shouldDirty: true, shouldValidate: true });
      setValue('logoDataUrl', preparedLogo.dataUrl, { shouldDirty: true, shouldValidate: true });
      setValue('logoMimeType', preparedLogo.mimeType, { shouldDirty: true, shouldValidate: true });
      setIsComplete(false);
      setSubmitError('');
    } catch (error) {
      console.error(error);
      setSubmitError(
        t(error instanceof LogoTooLargeError ? 'vendorsFormPage.logoTooLargeError' : 'vendorsFormPage.logoUploadError')
      );
    } finally {
      setIsLoadingLogo(false);
    }
  };

  const toggleStand = (standId: string) => {
    const nextValue = toggleStandSelection(getValues('preferredStands'), standId, VENDOR_FORM_MAX_PREFERRED_STANDS);

    setValue('preferredStands', nextValue, { shouldDirty: true, shouldValidate: hasAttemptedSubmit });
    setIsComplete(false);
    setSubmitError('');
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

    return new Intl.DateTimeFormat(i18n.language, {
      dateStyle: 'long',
      timeStyle: 'medium'
    }).format(new Date(submittedAt));
  }, [i18n.language, submittedAt]);

  useEffect(() => {
    if (!hasAttemptedSubmit) {
      return;
    }

    setValidationErrors(collectVendorFormValidationErrors(formData));
  }, [formData, hasAttemptedSubmit]);

  const submitForm = async () => {
    setHasAttemptedSubmit(true);
    setSubmitError('');
    const nextValidationErrors = collectVendorFormValidationErrors(getValues());
    setValidationErrors(nextValidationErrors);

    const isValid = Object.keys(nextValidationErrors).length === 0 && (await trigger());

    if (!isValid) {
      return;
    }

    const validatedFormData = getValues();

    setIsSubmitting(true);

    try {
      const response = await createVendorApplication(validatedFormData);

      setSubmittedAt(response.application.submittedAt);
      setStandInterestCounts((current) => {
        const next = new Map(current);

        for (const standId of new Set(response.application.preferredStands)) {
          next.set(standId, (next.get(standId) ?? 0) + 1);
        }

        return next;
      });
      setIsComplete(true);
      reset(validatedFormData);
    } catch (error) {
      console.error(error);
      setSubmitError(t('vendorsFormPage.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const setCategory = (category: VendorFormValues['mainCategory']) => {
    setValue('mainCategory', category, { shouldDirty: true, shouldValidate: true });

    if (category !== 'other') {
      setValue('mainCategoryOther', '', { shouldDirty: true, shouldValidate: true });
    }

    setIsComplete(false);
    setSubmitError('');
  };

  const setBooleanField = (
    fieldName: 'attendedBefore' | 'interestedIfUnavailable' | 'sponsorshipInterest',
    value: boolean
  ) => {
    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
    setIsComplete(false);
    setSubmitError('');
  };

  const setAcceptedStatute = (value: boolean) => {
    setValue('acceptedStatute', value, { shouldDirty: true, shouldValidate: true });
    setIsComplete(false);
    setSubmitError('');
  };

  const getFieldError = (...fieldNames: Array<keyof VendorFormValues>): string => {
    if (!hasAttemptedSubmit) {
      return '';
    }

    for (const fieldName of fieldNames) {
      const messageKey = validationErrors[fieldName] ?? formState.errors[fieldName]?.message;

      if (typeof messageKey === 'string') {
        return rawT(messageKey);
      }
    }

    return '';
  };

  return {
    formData,
    getFieldError,
    highInterestSelectedStandIds,
    highInterestStandIds,
    register,
    isComplete,
    isLoadingLogo,
    isSubmitting,
    standInterestCounts,
    submitError,
    submittedAtLabel,
    submitForm,
    toggleStand,
    setAcceptedStatute,
    setBooleanField,
    setCategory,
    setValue,
    updateLogoFile
  };
};
