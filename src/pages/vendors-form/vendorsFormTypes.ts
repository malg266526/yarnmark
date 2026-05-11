export type VendorsMainCategory = 'yarns' | 'accessories' | 'ceramics' | 'candles' | null;

export interface VendorsFormState {
  storeName: string;
  attendedBefore: boolean | null;
  mainCategory: VendorsMainCategory;
  preferredStands: string[];
  interestedIfUnavailable: boolean | null;
  phoneNumber: string;
  email: string;
  invoiceDetails: string;
  logoFileName: string | null;
  businessDescription: string;
  acceptedStatute: boolean;
}

export const INITIAL_VENDORS_FORM_STATE: VendorsFormState = {
  storeName: '',
  attendedBefore: null,
  mainCategory: null,
  preferredStands: [],
  interestedIfUnavailable: null,
  phoneNumber: '',
  email: '',
  invoiceDetails: '',
  logoFileName: null,
  businessDescription: '',
  acceptedStatute: false
};
