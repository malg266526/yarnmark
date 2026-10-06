import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { buildCsv } from './csvUtils.ts';

export interface VendorApplicationsExportLabels {
  applicationId: string;
  submittedAt: string;
  storeName: string;
  email: string;
  phoneNumber: string;
  category: string;
  status: string;
  preferredStands: string;
  assignedStands: string;
}

export const buildVendorApplicationsCsv = (
  applications: VendorApplication[],
  labels: VendorApplicationsExportLabels,
  resolveCategoryLabel: (category: NonNullable<VendorApplication['mainCategory']>) => string,
  resolveStatusLabel: (status: VendorApplication['status']) => string
): string =>
  buildCsv([
    [
      labels.applicationId,
      labels.submittedAt,
      labels.storeName,
      labels.email,
      labels.phoneNumber,
      labels.category,
      labels.status,
      labels.preferredStands,
      labels.assignedStands
    ],
    ...applications.map((application) => [
      application.id,
      application.submittedAt,
      application.storeName,
      application.email,
      application.phoneNumber,
      application.mainCategory === 'other'
        ? application.mainCategoryOther
        : application.mainCategory
          ? resolveCategoryLabel(application.mainCategory)
          : '',
      resolveStatusLabel(application.status),
      application.preferredStands.join(', '),
      application.assignedStands.join(', ')
    ])
  ]);
