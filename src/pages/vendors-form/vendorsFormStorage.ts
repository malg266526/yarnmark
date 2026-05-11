import type { VendorsFormState } from './vendorsFormTypes.ts';
import { INITIAL_VENDORS_FORM_STATE } from './vendorsFormTypes.ts';

export interface VendorsFormDraft {
  formData: VendorsFormState;
  isComplete: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isAttendedBeforeValue = (value: unknown): value is VendorsFormState['attendedBefore'] =>
  value === '' || value === 'yes' || value === 'no';

export const isVendorsFormState = (value: unknown): value is VendorsFormState => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.storeName === 'string' &&
    isAttendedBeforeValue(value.attendedBefore) &&
    typeof value.phoneNumber === 'string' &&
    typeof value.email === 'string' &&
    typeof value.acceptedStatute === 'boolean'
  );
};

export const parseVendorsFormDraft = (rawValue: string | null): VendorsFormDraft | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    if (
      !isRecord(parsedValue) ||
      !isVendorsFormState(parsedValue.formData) ||
      typeof parsedValue.isComplete !== 'boolean'
    ) {
      return null;
    }

    return {
      formData: parsedValue.formData,
      isComplete: parsedValue.isComplete
    };
  } catch {
    return null;
  }
};

export const getInitialVendorsFormDraft = (): VendorsFormDraft => ({
  formData: INITIAL_VENDORS_FORM_STATE,
  isComplete: false
});
