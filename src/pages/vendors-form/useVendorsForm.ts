import { useEffect, useMemo, useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { VendorsFormState } from './vendorsFormTypes';
import { getVendorsFormErrorKey } from './vendorsFormUtils';
import { VENDORS_FORM_DRAFT_STORAGE_KEY } from './vendorsFormConstants';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage';

const readInitialDraft = () =>
  parseVendorsFormDraft(window.localStorage.getItem(VENDORS_FORM_DRAFT_STORAGE_KEY)) ?? getInitialVendorsFormDraft();

export const useVendorsForm = () => {
  const t = useTypedTranslation();
  const [initialDraft] = useState(readInitialDraft);
  const [formData, setFormData] = useState<VendorsFormState>(initialDraft.formData);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [showErrors, setShowErrors] = useState(false);
  // File objects can't be serialized to localStorage; kept in-memory so a future
  // submission flow can upload the actual bytes without forcing the user to re-pick.
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const currentError = useMemo(() => {
    const errorKey = getVendorsFormErrorKey(formData);

    return errorKey ? t(errorKey) : '';
  }, [formData, t]);

  const updateField = <K extends keyof VendorsFormState>(key: K, value: VendorsFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsComplete(false);
  };

  const updateLogoFile = (file: File | null) => {
    setLogoFile(file);
    updateField('logoFileName', file?.name ?? null);
  };

  useEffect(() => {
    window.localStorage.setItem(VENDORS_FORM_DRAFT_STORAGE_KEY, JSON.stringify({ formData, isComplete }));
  }, [formData, isComplete]);

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
    submitForm,
    updateField,
    updateLogoFile
  };
};
