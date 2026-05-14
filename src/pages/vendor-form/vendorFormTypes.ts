export type VendorFormMainCategory = 'yarns' | 'accessories' | 'ceramics' | 'candles' | 'other' | null;

export interface VendorFormState {
  storeName: string;
  attendedBefore: boolean | null;
  mainCategory: VendorFormMainCategory;
  mainCategoryOther: string;
  preferredStands: string[];
  interestedIfUnavailable: boolean | null;
  sponsorshipInterest: boolean | null;
  phoneNumber: string;
  email: string;
  invoiceDetails: string;
  logoFileName: string | null;
  logoDataUrl: string | null;
  logoMimeType: string | null;
  businessDescription: string;
  acceptedStatute: boolean;
}

export const INITIAL_VENDOR_FORM_STATE: VendorFormState = {
  storeName: '',
  attendedBefore: null,
  mainCategory: null,
  mainCategoryOther: '',
  preferredStands: [],
  interestedIfUnavailable: null,
  sponsorshipInterest: null,
  phoneNumber: '',
  email: '',
  invoiceDetails: '',
  logoFileName: null,
  logoDataUrl: null,
  logoMimeType: null,
  businessDescription: '',
  acceptedStatute: false
};
