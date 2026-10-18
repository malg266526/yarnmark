export type VendorFormMainCategory = 'yarns' | 'accessories' | 'ceramics' | 'candles' | 'other' | null;

export interface VendorFormState {
  storeName: string;
  attendedBefore: boolean | null;
  mainCategory: VendorFormMainCategory;
  mainCategoryOther: string;
  preferredStandGroups: string[][];
  interestedIfUnavailable: boolean | null;
  sponsorshipInterest: boolean | null;
  phoneNumber: string;
  email: string;
  invoiceDetails: string;
  logoFileName: string | null;
  logoDataUrl: string | null;
  logoMimeType: string | null;
  businessDescription: string;
  comments: string;
  acceptedStatute: boolean;
}

export const INITIAL_VENDOR_FORM_STATE: VendorFormState = {
  storeName: '',
  attendedBefore: null,
  mainCategory: null,
  mainCategoryOther: '',
  preferredStandGroups: [],
  interestedIfUnavailable: null,
  sponsorshipInterest: null,
  phoneNumber: '',
  email: '',
  invoiceDetails: '',
  logoFileName: null,
  logoDataUrl: null,
  logoMimeType: null,
  businessDescription: '',
  comments: '',
  acceptedStatute: false
};

export type StandDemand = Record<string, string>;
