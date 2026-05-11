import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { VendorsFormState } from './vendorsFormTypes';
import { getVendorsFormErrorKey, toggleStandSelection } from './vendorsFormUtils';
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
  const [submissionDate, setSubmissionDate] = useState(() => new Date());
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

  const submissionDateTime = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'long',
        timeStyle: 'medium'
      }).format(submissionDate),
    [i18n.language, submissionDate]
  );

  const submitForm = () => {
    if (currentError) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    setIsComplete(true);
  };

  return {
    currentError,
    formData,
    isComplete,
    logoFile,
    showErrors,
    submissionDateTime,
    submitForm,
    toggleStand,
    updateField,
    updateLogoFile
  };
};
