import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export interface VendorMapAssignment {
  applicationId: string;
  storeName: string;
  logoSource: string | null;
}

export const isStandAssignedApplication = ({ status }: VendorApplication) => status === 'stand-assigned';

export const buildVendorMapAssignments = (
  applications: VendorApplication[],
  isAssignmentShown: (application: VendorApplication) => boolean = isStandAssignedApplication
): ReadonlyMap<string, VendorMapAssignment[]> => {
  const assignments = new Map<string, VendorMapAssignment[]>();
  for (const application of applications) {
    if (!isAssignmentShown(application)) continue;
    const vendor: VendorMapAssignment = {
      applicationId: application.id,
      storeName: application.storeName,
      logoSource: application.logoUrl || application.logoDataUrl || null
    };
    for (const standId of new Set(application.assignedStands)) {
      const vendors = assignments.get(standId) ?? [];
      vendors.push(vendor);
      assignments.set(standId, vendors);
    }
  }
  return assignments;
};
