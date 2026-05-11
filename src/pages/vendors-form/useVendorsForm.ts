import { useMemo, useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { INITIAL_VENDORS_FORM_STATE, StepIndex, TOTAL_VENDORS_FORM_STEPS, VendorsFormState } from './vendorsFormTypes';
import {
  getNextVendorsFormStep,
  getPreviousVendorsFormStep,
  getVendorsFormErrorKey,
  isLastVendorsFormStep
} from './vendorsFormUtils';

export const useVendorsForm = () => {
  const t = useTypedTranslation();
  const [step, setStep] = useState<StepIndex>(0);
  const [formData, setFormData] = useState<VendorsFormState>(INITIAL_VENDORS_FORM_STATE);
  const [showErrors, setShowErrors] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentError = useMemo(() => {
    const errorKey = getVendorsFormErrorKey(step, formData);

    return errorKey ? t(errorKey) : '';
  }, [formData, step, t]);

  const updateField = <K extends keyof VendorsFormState>(key: K, value: VendorsFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => {
    if (currentError) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);

    if (isLastVendorsFormStep(step)) {
      setIsComplete(true);
      return;
    }

    setStep((prev) => getNextVendorsFormStep(prev));
  };

  const goBack = () => {
    setShowErrors(false);
    setIsComplete(false);
    setStep((prev) => getPreviousVendorsFormStep(prev));
  };

  return {
    currentError,
    formData,
    goBack,
    goNext,
    isComplete,
    setShowErrors,
    showErrors,
    step,
    totalSteps: TOTAL_VENDORS_FORM_STEPS,
    updateField
  };
};
