import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import {
  buildVendorApplicationsCsv,
  type VendorApplicationsExportLabels
} from '../utils/vendorApplicationsExportUtils.ts';

export const VENDOR_APPLICATIONS_EXPORT_FILE_NAME = 'yarnmark-vendor-applications.csv';

export const useVendorApplicationsExport = (
  applications: VendorApplication[],
  labels: VendorApplicationsExportLabels,
  resolveCategoryLabel: (category: NonNullable<VendorApplication['mainCategory']>) => string,
  resolveStatusLabel: (status: VendorApplication['status']) => string
) => {
  const csv = buildVendorApplicationsCsv(applications, labels, resolveCategoryLabel, resolveStatusLabel);
  return applications.length > 0 ? `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}` : undefined;
};
