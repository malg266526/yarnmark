import type { VendorsFormState } from './vendorsFormTypes.ts';
import { INITIAL_VENDORS_FORM_STATE } from './vendorsFormTypes.ts';

export interface VendorsFormDraft {
  formData: VendorsFormState;
  isComplete: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isAttendedBeforeValue = (value: unknown): value is VendorsFormState['attendedBefore'] =>
  value === null || typeof value === 'boolean';

const isMainCategoryValue = (value: unknown): value is VendorsFormState['mainCategory'] =>
  value === null || value === 'yarns' || value === 'accessories' || value === 'ceramics' || value === 'candles';

const isNullableString = (value: unknown): value is string | null => value === null || typeof value === 'string';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === 'string');

export const isVendorsFormState = (value: unknown): value is VendorsFormState => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.storeName === 'string' &&
    isAttendedBeforeValue(value.attendedBefore) &&
    isMainCategoryValue(value.mainCategory) &&
    isStringArray(value.preferredStands) &&
    isAttendedBeforeValue(value.interestedIfUnavailable) &&
    typeof value.phoneNumber === 'string' &&
    typeof value.email === 'string' &&
    typeof value.invoiceDetails === 'string' &&
    isNullableString(value.logoFileName) &&
    typeof value.businessDescription === 'string' &&
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
