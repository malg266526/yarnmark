import { downloadStoredLogo } from '../vendors-form/vendorsFormLogoUtils';
import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';

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
