import { useEffect, useMemo, useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { VendorsFormState } from './vendorsFormTypes';
import { getVendorsFormErrorKey } from './vendorsFormUtils';
import { VENDORS_FORM_DRAFT_STORAGE_KEY } from './vendorsFormConstants';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage';

export const useVendorsForm = () => {
  const t = useTypedTranslation();
  const initialDraft = getInitialVendorsFormDraft();
  const [formData, setFormData] = useState<VendorsFormState>(() => {
    return (
      parseVendorsFormDraft(window.localStorage.getItem(VENDORS_FORM_DRAFT_STORAGE_KEY))?.formData ||
      initialDraft.formData
    );
  });

  const [showErrors, setShowErrors] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(() => {
    return parseVendorsFormDraft(window.localStorage.getItem(VENDORS_FORM_DRAFT_STORAGE_KEY))?.isComplete || false;
  });

  const currentError = useMemo(() => {
    const errorKey = getVendorsFormErrorKey(formData);

    return errorKey ? t(errorKey) : '';
  }, [formData, t]);

  const updateField = <K extends keyof VendorsFormState>(key: K, value: VendorsFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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
    showErrors,
    submitForm,
    updateField
  };
};
