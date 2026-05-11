export type VendorsMainCategory = 'yarns' | 'accessories' | 'ceramics' | 'candles' | 'other' | null;

export interface VendorsFormState {
  storeName: string;
  attendedBefore: boolean | null;
  mainCategory: VendorsMainCategory;
  mainCategoryOther: string;
  preferredStands: string[];
  interestedIfUnavailable: boolean | null;
  phoneNumber: string;
  email: string;
  invoiceDetails: string;
  logoFileName: string | null;
  logoDataUrl: string | null;
  logoMimeType: string | null;
  businessDescription: string;
  acceptedStatute: boolean;
}

export const INITIAL_VENDORS_FORM_STATE: VendorsFormState = {
  storeName: '',
  attendedBefore: null,
  mainCategory: null,
  mainCategoryOther: '',
  preferredStands: [],
  interestedIfUnavailable: null,
  phoneNumber: '',
  email: '',
  invoiceDetails: '',
  logoFileName: null,
  logoDataUrl: null,
  logoMimeType: null,
  businessDescription: '',
  acceptedStatute: false
};
