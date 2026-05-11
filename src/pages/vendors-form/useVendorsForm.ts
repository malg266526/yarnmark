import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { FieldErrors } from 'react-hook-form';
import { toggleStandSelection } from './vendorsFormUtils';
import { createVendorApplication } from './vendorsApplicationsStorage';
import { VENDORS_FORM_DRAFT_STORAGE_KEY, VENDORS_FORM_MAX_PREFERRED_STANDS } from './vendorsFormConstants';
import { vendorsFormSchema, type VendorsFormValues } from './vendorsFormSchema';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage';
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
  // File objects can't be serialized to localStorage; kept in-memory so a future
  // submission flow can upload the actual bytes without forcing the user to re-pick.
  const [logoFile, setLogoFile] = useState<File | null>(null);
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

  const updateLogoFile = (file: File | null) => {
    setLogoFile(file);
    setValue('logoFileName', file?.name ?? null, { shouldDirty: true, shouldValidate: true });
    setIsComplete(false);
    setSubmitError('');
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
    register,
    isComplete,
    isSubmitting,
    logoFile,
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
