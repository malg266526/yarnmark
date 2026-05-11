import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { StepIndex, TOTAL_VENDORS_FORM_STEPS, VendorsFormState } from './vendorsFormTypes';
import {
  getNextVendorsFormStep,
  getPreviousVendorsFormStep,
  getVendorsFormErrorKey,
  isLastVendorsFormStep
} from './vendorsFormUtils';
import { VENDORS_FORM_DRAFT_STORAGE_KEY, VENDORS_FORM_STEP_QUERY_PARAM } from './vendorsFormConstants';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage';
import { getVendorsFormStepFromQuery, getVendorsFormStepQueryValue } from './vendorsFormUrl';

export const useVendorsForm = () => {
  const t = useTypedTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDraft = getInitialVendorsFormDraft();
  const [step, setStep] = useState<StepIndex>(() =>
    getVendorsFormStepFromQuery(searchParams.get(VENDORS_FORM_STEP_QUERY_PARAM))
  );
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
    const errorKey = getVendorsFormErrorKey(step, formData);

    return errorKey ? t(errorKey) : '';
  }, [formData, step, t]);

  const updateField = <K extends keyof VendorsFormState>(key: K, value: VendorsFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const stepFromQuery = getVendorsFormStepFromQuery(searchParams.get(VENDORS_FORM_STEP_QUERY_PARAM));

    setStep((currentStep) => (currentStep === stepFromQuery ? currentStep : stepFromQuery));
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(
      (currentSearchParams) => {
        const nextSearchParams = new URLSearchParams(currentSearchParams);

        nextSearchParams.set(VENDORS_FORM_STEP_QUERY_PARAM, getVendorsFormStepQueryValue(step));

        return nextSearchParams;
      },
      { replace: true }
    );
  }, [setSearchParams, step]);

  useEffect(() => {
    window.localStorage.setItem(VENDORS_FORM_DRAFT_STORAGE_KEY, JSON.stringify({ formData, isComplete }));
  }, [formData, isComplete]);

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
