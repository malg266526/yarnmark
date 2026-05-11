import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { toggleStandSelection } from './vendorsFormUtils';
import { createVendorApplication, listStandInterestCounts } from '../vendors-applications/vendorsApplicationsStorage';
import {
  VENDORS_FORM_DRAFT_STORAGE_KEY,
  VENDORS_FORM_LOGO_MAX_BYTES,
  VENDORS_FORM_MAX_PREFERRED_STANDS
} from './vendorsFormConstants';
import { getVendorsFormValidationErrors, vendorsFormSchema, type VendorsFormValues } from './vendorsFormSchema';
import { LogoTooLargeError, prepareLogoForUpload } from './vendorsFormLogoUtils';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage';
import { isHighInterestStand } from './vendorsFormStandInterestUtils';
import type { VendorsFormState } from './vendorsFormTypes';

const readInitialDraft = () =>
  parseVendorsFormDraft(window.localStorage.getItem(VENDORS_FORM_DRAFT_STORAGE_KEY)) ?? getInitialVendorsFormDraft();

export const useVendorsForm = () => {
  const t = useTypedTranslation();
  const { i18n, t: rawT } = useTranslation();
  const [initialDraft] = useState(readInitialDraft);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [standInterestCounts, setStandInterestCounts] = useState<Map<string, number>>(() => new Map());
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof VendorsFormValues, string>>>({});
  const form = useForm<VendorsFormValues>({
    defaultValues: initialDraft.formData,
    mode: 'onSubmit',
    resolver: zodResolver(vendorsFormSchema)
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
      const preparedLogo = await prepareLogoForUpload(file, VENDORS_FORM_LOGO_MAX_BYTES);

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
    const nextValue = toggleStandSelection(getValues('preferredStands'), standId, VENDORS_FORM_MAX_PREFERRED_STANDS);

    setValue('preferredStands', nextValue, { shouldDirty: true, shouldValidate: hasAttemptedSubmit });
    setIsComplete(false);
    setSubmitError('');
  };

  useEffect(() => {
    if (isComplete) {
      window.localStorage.removeItem(VENDORS_FORM_DRAFT_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      VENDORS_FORM_DRAFT_STORAGE_KEY,
      JSON.stringify({ formData: formData as VendorsFormState, isComplete })
    );
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

    setValidationErrors(getVendorsFormValidationErrors(formData));
  }, [formData, hasAttemptedSubmit]);

  const submitForm = async () => {
    setHasAttemptedSubmit(true);
    setSubmitError('');
    const nextValidationErrors = getVendorsFormValidationErrors(getValues());
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

  const setCategory = (category: VendorsFormState['mainCategory']) => {
    setValue('mainCategory', category, { shouldDirty: true, shouldValidate: true });

    if (category !== 'other') {
      setValue('mainCategoryOther', '', { shouldDirty: true, shouldValidate: true });
    }

    setIsComplete(false);
    setSubmitError('');
  };

  const setBooleanField = (fieldName: 'attendedBefore' | 'interestedIfUnavailable', value: boolean) => {
    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
    setIsComplete(false);
    setSubmitError('');
  };

  const setAcceptedStatute = (value: boolean) => {
    setValue('acceptedStatute', value, { shouldDirty: true, shouldValidate: true });
    setIsComplete(false);
    setSubmitError('');
  };

  const getFieldError = (...fieldNames: Array<keyof VendorsFormValues>): string => {
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
