import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { VendorsFormState } from './vendorsFormTypes';
import { getVendorsFormErrorKey, toggleStandSelection } from './vendorsFormUtils';
import { createVendorApplication } from './vendorsApplicationsStorage';
import { VENDORS_FORM_DRAFT_STORAGE_KEY, VENDORS_FORM_MAX_PREFERRED_STANDS } from './vendorsFormConstants';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage';

const readInitialDraft = () =>
  parseVendorsFormDraft(window.localStorage.getItem(VENDORS_FORM_DRAFT_STORAGE_KEY)) ?? getInitialVendorsFormDraft();

export const useVendorsForm = () => {
  const t = useTypedTranslation();
  const { i18n } = useTranslation();
  const [initialDraft] = useState(readInitialDraft);
  const [formData, setFormData] = useState<VendorsFormState>(initialDraft.formData);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submissionDate, setSubmissionDate] = useState(() => new Date());
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  // File objects can't be serialized to localStorage; kept in-memory so a future
  // submission flow can upload the actual bytes without forcing the user to re-pick.
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const currentError = useMemo(() => {
    const errorKey = getVendorsFormErrorKey(formData);

    return errorKey ? t(errorKey) : '';
  }, [formData, t]);

  const updateField = <K extends keyof VendorsFormState>(key: K, value: VendorsFormState[K]) => {
    setFormData((prev) => {
      if (key === 'mainCategory') {
        const nextCategory = value as VendorsFormState['mainCategory'];

        if (nextCategory !== 'other') {
          return { ...prev, mainCategory: nextCategory, mainCategoryOther: '' };
        }

        return { ...prev, mainCategory: nextCategory };
      }

      return { ...prev, [key]: value };
    });
    setIsComplete(false);
    setSubmitError('');
  };

  const updateLogoFile = (file: File | null) => {
    setLogoFile(file);
    updateField('logoFileName', file?.name ?? null);
  };

  const toggleStand = (standId: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredStands: toggleStandSelection(prev.preferredStands, standId, VENDORS_FORM_MAX_PREFERRED_STANDS)
    }));
    setIsComplete(false);
    setSubmitError('');
  };

  useEffect(() => {
    window.localStorage.setItem(VENDORS_FORM_DRAFT_STORAGE_KEY, JSON.stringify({ formData, isComplete }));
  }, [formData, isComplete]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSubmissionDate(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const submissionDateTimePreview = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'long',
        timeStyle: 'medium'
      }).format(submissionDate),
    [i18n.language, submissionDate]
  );

  const submittedAtLabel = useMemo(() => {
    if (!submittedAt) {
      return null;
    }

    return new Intl.DateTimeFormat(i18n.language, {
      dateStyle: 'long',
      timeStyle: 'medium'
    }).format(new Date(submittedAt));
  }, [i18n.language, submittedAt]);

  const submitForm = async () => {
    if (currentError) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setShowErrors(false);

    try {
      const response = await createVendorApplication(formData);

      setSubmittedAt(response.application.submittedAt);
      setIsComplete(true);
    } catch (error) {
      console.error(error);
      setSubmitError(t('vendorsFormPage.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentError,
    formData,
    isComplete,
    isSubmitting,
    logoFile,
    showErrors,
    submissionDateTimePreview,
    submitError,
    submittedAtLabel,
    submitForm,
    toggleStand,
    updateField,
    updateLogoFile
  };
};
