import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export interface VendorMapAssignment {
  applicationId: string;
  storeName: string;
  logoSource: string | null;
}

export const buildVendorMapAssignments = (
  applications: VendorApplication[]
): ReadonlyMap<string, VendorMapAssignment[]> => {
  const assignments = new Map<string, VendorMapAssignment[]>();
  for (const application of applications) {
    if (application.status !== 'stand-assigned') continue;
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
