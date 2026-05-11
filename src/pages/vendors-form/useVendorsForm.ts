import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { FieldErrors } from 'react-hook-form';
import { toggleStandSelection } from './vendorsFormUtils';
import { createVendorApplication, listVendorApplications } from '../vendors-applications/vendorsApplicationsStorage';
import { VENDORS_FORM_DRAFT_STORAGE_KEY, VENDORS_FORM_MAX_PREFERRED_STANDS } from './vendorsFormConstants';
import { vendorsFormSchema, type VendorsFormValues } from './vendorsFormSchema';
import { readLogoFileAsDataUrl } from './vendorsFormLogoUtils';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage';
import { getHighInterestStandIds, getStandInterestCounts } from './vendorsFormStandInterestUtils';
import type { VendorApplication } from './vendorsFormSubmission';
import type { VendorsFormState } from './vendorsFormTypes';

const readInitialDraft = () =>
  parseVendorsFormDraft(window.localStorage.getItem(VENDORS_FORM_DRAFT_STORAGE_KEY)) ?? getInitialVendorsFormDraft();

const getFirstErrorKey = (errors: FieldErrors<VendorsFormValues>) => {
  const errorOrder: Array<keyof VendorsFormValues> = [
    'storeName',
    'attendedBefore',
    'mainCategory',
    'mainCategoryOther',
    'interestedIfUnavailable',
    'phoneNumber',
    'email',
    'invoiceDetails',
    'businessDescription',
    'acceptedStatute'
  ];

  for (const fieldName of errorOrder) {
    const message = errors[fieldName]?.message;

    if (typeof message === 'string') {
      return message;
    }
  }

  return '';
};

export const useVendorsForm = () => {
  const t = useTypedTranslation();
  const { i18n, t: rawT } = useTranslation();
  const [initialDraft] = useState(readInitialDraft);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const form = useForm<VendorsFormValues>({
    defaultValues: initialDraft.formData,
    mode: 'onSubmit',
    resolver: zodResolver(vendorsFormSchema)
  });
  const { formState, getValues, handleSubmit, register, reset, setValue, watch } = form;
  const formData = watch();

  const currentError = useMemo(() => {
    const firstErrorKey = getFirstErrorKey(formState.errors);

    return firstErrorKey ? rawT(firstErrorKey) : '';
  }, [formState.errors, rawT]);

  useEffect(() => {
    void listVendorApplications().then((response) => {
      setApplications(response.applications);
    });
  }, []);

  const standInterestCounts = useMemo(() => getStandInterestCounts(applications), [applications]);
  const highInterestStandIds = useMemo(() => getHighInterestStandIds(applications), [applications]);
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

    try {
      const logoDataUrl = await readLogoFileAsDataUrl(file);

      setValue('logoFileName', file.name, { shouldDirty: true, shouldValidate: true });
      setValue('logoDataUrl', logoDataUrl, { shouldDirty: true, shouldValidate: true });
      setValue('logoMimeType', file.type || null, { shouldDirty: true, shouldValidate: true });
      setIsComplete(false);
      setSubmitError('');
    } catch (error) {
      console.error(error);
      setSubmitError(t('vendorsFormPage.logoUploadError'));
    }
  };

  const toggleStand = (standId: string) => {
    const nextValue = toggleStandSelection(getValues('preferredStands'), standId, VENDORS_FORM_MAX_PREFERRED_STANDS);

    setValue('preferredStands', nextValue, { shouldDirty: true });
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

  const submitForm = handleSubmit(async (validatedFormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await createVendorApplication(validatedFormData);

      setSubmittedAt(response.application.submittedAt);
      setApplications((currentApplications) => [...currentApplications, response.application]);
      setIsComplete(true);
      reset(validatedFormData);
    } catch (error) {
      console.error(error);
      setSubmitError(t('vendorsFormPage.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  });

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

  return {
    currentError,
    formData,
    formState,
    highInterestSelectedStandIds,
    highInterestStandIds,
    register,
    isComplete,
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
