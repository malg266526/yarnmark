import { TOTAL_VENDORS_FORM_STEPS } from './vendorsFormTypes.ts';
import type { StepIndex, VendorsFormState } from './vendorsFormTypes.ts';

export type VendorsFormValidationErrorKey =
  | 'vendorsFormPage.validation.storeNameRequired'
  | 'vendorsFormPage.validation.attendedBeforeRequired'
  | 'vendorsFormPage.validation.phoneRequired'
  | 'vendorsFormPage.validation.phoneInvalid'
  | 'vendorsFormPage.validation.emailRequired'
  | 'vendorsFormPage.validation.emailInvalid'
  | 'vendorsFormPage.validation.statuteRequired';

export const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isPhoneValid = (value: string) => /^[+\d\s()-]{7,}$/.test(value.trim());

export const getVendorsFormErrorKey = (
  step: StepIndex,
  formData: VendorsFormState
): VendorsFormValidationErrorKey | null => {
  switch (step) {
    case 0:
      return formData.storeName.trim() ? null : 'vendorsFormPage.validation.storeNameRequired';
    case 1:
      return formData.attendedBefore === null ? 'vendorsFormPage.validation.attendedBeforeRequired' : null;
    case 2:
      if (!formData.phoneNumber.trim()) {
        return 'vendorsFormPage.validation.phoneRequired';
      }
      if (!isPhoneValid(formData.phoneNumber)) {
        return 'vendorsFormPage.validation.phoneInvalid';
      }
      if (!formData.email.trim()) {
        return 'vendorsFormPage.validation.emailRequired';
      }
      if (!isEmailValid(formData.email)) {
        return 'vendorsFormPage.validation.emailInvalid';
      }
      return null;
    case 3:
      return formData.acceptedStatute ? null : 'vendorsFormPage.validation.statuteRequired';
    default:
      return null;
  }
};

export const isLastVendorsFormStep = (step: StepIndex) => step === TOTAL_VENDORS_FORM_STEPS - 1;

export const getPreviousVendorsFormStep = (step: StepIndex): StepIndex => Math.max(0, step - 1) as StepIndex;

export const getNextVendorsFormStep = (step: StepIndex): StepIndex =>
  Math.min(TOTAL_VENDORS_FORM_STEPS - 1, step + 1) as StepIndex;
