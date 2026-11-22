import type { AssignedStandVendors } from './assignedStandsApi.ts';

const VENDOR_NAME_LOCALE = 'pl';

export interface VendorLogo {
  storeName: string;
  logoUrl: string;
}

export const getVendorLogos = (assignedVendors: AssignedStandVendors): VendorLogo[] => {
  const logosByUrl = new Map<string, VendorLogo>();

  assignedVendors.forEach(({ storeName, logoUrl }) => {
    if (logoUrl && !logosByUrl.has(logoUrl)) {
      logosByUrl.set(logoUrl, { storeName: storeName.trim(), logoUrl });
    }
  });

  return [...logosByUrl.values()].sort((first, second) =>
    first.storeName.localeCompare(second.storeName, VENDOR_NAME_LOCALE, { sensitivity: 'base' })
  );
};
