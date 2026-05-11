import { TOTAL_VENDORS_FORM_STEPS } from './vendorsFormTypes.ts';
import type { StepIndex } from './vendorsFormTypes.ts';

export const getVendorsFormStepFromQuery = (rawValue: string | null): StepIndex => {
  const parsedValue = Number(rawValue);

  if (!Number.isInteger(parsedValue)) {
    return 0;
  }

  const clampedValue = Math.min(TOTAL_VENDORS_FORM_STEPS, Math.max(1, parsedValue));

  return (clampedValue - 1) as StepIndex;
};

export const getVendorsFormStepQueryValue = (step: StepIndex): string => String(step + 1);
