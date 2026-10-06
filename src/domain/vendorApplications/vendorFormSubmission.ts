import type { VendorFormState } from './vendorFormTypes.ts';

export type VendorApplicationStatus = 'accepted' | 'pending' | 'rejected' | 'reserve-list' | 'stand-assigned';

export type VendorApplicationAllocationState = 'confirmed' | 'manual-negotiation' | 'none' | 'suggested';

export interface VendorApplication extends VendorFormState {
  allocationIteration: number | null;
  allocationState: VendorApplicationAllocationState;
  assignedStands: string[];
  id: string;
  logoUrl: string | null;
  status: VendorApplicationStatus;
  submittedAt: string;
}

export interface CreateVendorApplicationRequest {
  formData: VendorFormState;
}

export interface CreateVendorApplicationResponse {
  application: VendorApplication;
}

export interface VendorApplicationsResponse {
  applications: VendorApplication[];
}
