import { downloadStoredLogo } from '../../../../../domain/vendorApplications/vendorFormLogoUtils.ts';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const downloadVendorApplicationLogo = async (
  application: VendorApplication,
  preferredMimeType: 'image/png' | 'image/webp' | 'image/avif'
) => {
  const logoSource = application.logoDataUrl ?? application.logoUrl;

  if (!logoSource) {
    throw new Error('No stored logo data available.');
  }

  await downloadStoredLogo({
    dataUrl: logoSource,
    storedMimeType: application.logoMimeType,
    preferredMimeType,
    logoFileName: application.logoFileName,
    fallbackStem: application.storeName
  });
};
