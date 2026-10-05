import type { VendorApplicationStatus } from '../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const VENDOR_APPLICATION_STATUS_ORDER: VendorApplicationStatus[] = [
  'pending',
  'rejected',
  'reserve-list',
  'accepted',
  'stand-assigned'
];
