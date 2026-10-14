import { VENDOR_FORM_OPENS_AT } from './vendorFormConstants.ts';

export const VENDOR_FORM_OPENS_AT_TIMESTAMP = Date.parse(VENDOR_FORM_OPENS_AT);

export const isVendorFormAvailable = (now: number): boolean => now >= VENDOR_FORM_OPENS_AT_TIMESTAMP;
