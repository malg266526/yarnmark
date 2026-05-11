export type StepIndex = 0 | 1 | 2 | 3;

export interface VendorsFormState {
  storeName: string;
  attendedBefore: 'yes' | 'no' | '';
  phoneNumber: string;
  email: string;
  acceptedStatute: boolean;
}

export const INITIAL_VENDORS_FORM_STATE: VendorsFormState = {
  storeName: '',
  attendedBefore: '',
  phoneNumber: '',
  email: '',
  acceptedStatute: false
};

export const TOTAL_VENDORS_FORM_STEPS = 4;
