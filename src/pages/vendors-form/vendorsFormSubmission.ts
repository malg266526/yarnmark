import type { VendorsFormState } from './vendorsFormTypes';

export type VendorApplicationStatus = 'accepted' | 'considered' | 'new' | 'reserve';

export type VendorApplicationAllocationState = 'confirmed' | 'manual-negotiation' | 'none' | 'suggested';

export interface VendorApplication extends VendorsFormState {
  allocatedStandId: string | null;
  allocationIteration: number | null;
  allocationState: VendorApplicationAllocationState;
  id: string;
  status: VendorApplicationStatus;
  submittedAt: string;
}

export interface CreateVendorApplicationRequest {
  formData: VendorsFormState;
}

export interface CreateVendorApplicationResponse {
  application: VendorApplication;
}

export interface VendorApplicationsResponse {
  applications: VendorApplication[];
}
