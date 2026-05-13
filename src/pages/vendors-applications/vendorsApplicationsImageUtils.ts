import { downloadStoredLogo } from '../vendor-form/vendorFormLogoUtils.ts';
import type { VendorApplication } from '../vendor-form/vendorFormSubmission.ts';

export const downloadVendorApplicationLogo = async (
  application: VendorApplication,
  preferredMimeType: 'image/png' | 'image/webp' | 'image/avif'
) => {
  if (!application.logoDataUrl) {
    throw new Error('No stored logo data available.');
  }

  await downloadStoredLogo({
    dataUrl: application.logoDataUrl,
    storedMimeType: application.logoMimeType,
    preferredMimeType,
    logoFileName: application.logoFileName,
    fallbackStem: application.storeName
  });
};
