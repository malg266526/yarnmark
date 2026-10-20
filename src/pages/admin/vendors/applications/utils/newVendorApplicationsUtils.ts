import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const findNewVendorApplicationIds = (
  knownApplicationIds: ReadonlySet<string>,
  fetchedApplications: VendorApplication[]
): string[] => fetchedApplications.flatMap(({ id }) => (knownApplicationIds.has(id) ? [] : [id]));
