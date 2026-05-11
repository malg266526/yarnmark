import { VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH } from './vendorsFormConstants.ts';
import type { VendorsFormState } from './vendorsFormTypes.ts';

export type VendorsFormValidationErrorKey =
  | 'vendorsFormPage.validation.storeNameRequired'
  | 'vendorsFormPage.validation.attendedBeforeRequired'
  | 'vendorsFormPage.validation.mainCategoryRequired'
  | 'vendorsFormPage.validation.mainCategoryOtherRequired'
  | 'vendorsFormPage.validation.interestedIfUnavailableRequired'
  | 'vendorsFormPage.validation.phoneRequired'
  | 'vendorsFormPage.validation.phoneInvalid'
  | 'vendorsFormPage.validation.emailRequired'
  | 'vendorsFormPage.validation.emailInvalid'
  | 'vendorsFormPage.validation.invoiceDetailsRequired'
  | 'vendorsFormPage.validation.businessDescriptionRequired'
  | 'vendorsFormPage.validation.businessDescriptionTooLong'
  | 'vendorsFormPage.validation.statuteRequired';

export const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const toggleStandSelection = (current: string[], standId: string, max: number): string[] => {
  if (current.includes(standId)) {
    return current.filter((id) => id !== standId);
  }

  if (current.length >= max) {
    return current;
  }

  return [...current, standId];
};

export const isPhoneValid = (value: string) => /^[+\d\s()-]{7,}$/.test(value.trim());

export const getVendorsFormErrorKey = (formData: VendorsFormState): VendorsFormValidationErrorKey | null => {
  if (!formData.storeName.trim()) {
    return 'vendorsFormPage.validation.storeNameRequired';
  }

  if (formData.attendedBefore === null) {
    return 'vendorsFormPage.validation.attendedBeforeRequired';
  }

  if (!formData.mainCategory) {
    return 'vendorsFormPage.validation.mainCategoryRequired';
  }

  if (formData.mainCategory === 'other' && !formData.mainCategoryOther.trim()) {
    return 'vendorsFormPage.validation.mainCategoryOtherRequired';
  }

  if (formData.interestedIfUnavailable === null) {
    return 'vendorsFormPage.validation.interestedIfUnavailableRequired';
  }

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

  if (!formData.invoiceDetails.trim()) {
    return 'vendorsFormPage.validation.invoiceDetailsRequired';
  }

  if (!formData.businessDescription.trim()) {
    return 'vendorsFormPage.validation.businessDescriptionRequired';
  }

  if (formData.businessDescription.length > VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH) {
    return 'vendorsFormPage.validation.businessDescriptionTooLong';
  }

  if (!formData.acceptedStatute) {
    return 'vendorsFormPage.validation.statuteRequired';
  }

  return null;
};
