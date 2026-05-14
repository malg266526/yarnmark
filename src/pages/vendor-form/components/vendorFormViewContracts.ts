import type { UseFormRegister } from 'react-hook-form';
import type { VendorFormValues } from '../vendorFormSchema.ts';
import type { VendorFormMainCategory, VendorFormState } from '../vendorFormTypes.ts';

export type VendorFormBooleanFieldName = 'attendedBefore' | 'interestedIfUnavailable' | 'sponsorshipInterest';

export type ResolveVendorFormErrorMessage = (...fieldNames: Array<keyof VendorFormValues>) => string;

export interface VendorFormBindings {
  formData: VendorFormState;
  register: UseFormRegister<VendorFormValues>;
  resolveFieldErrorMessage: ResolveVendorFormErrorMessage;
}

export interface VendorFormDerivedState {
  highInterestSelectedStandIds: string[];
  highInterestStandIds: string[];
  standInterestCounts: Map<string, number>;
}

export interface VendorFormStatusState {
  isComplete: boolean;
  isLoadingLogo: boolean;
  isSubmitting: boolean;
  submitError: string;
  submittedAtLabel: string | null;
}

export interface VendorFormActions {
  setAcceptedStatuteValue: (value: boolean) => void;
  setBooleanFieldValue: (fieldName: VendorFormBooleanFieldName, value: boolean) => void;
  setMainCategory: (category: VendorFormMainCategory) => void;
  submitVendorForm: () => Promise<void>;
  togglePreferredStand: (standId: string) => void;
  updateBusinessDescription: (value: string) => void;
  updateLogoFile: (file: File | null) => void;
}

export interface VendorFormViewProps {
  formActions: VendorFormActions;
  formBindings: VendorFormBindings;
  formStatus: VendorFormStatusState;
  derivedState: VendorFormDerivedState;
}
