import type { VendorsFormState } from './vendorsFormTypes';

export type VendorApplicationStatus = 'accepted' | 'considered' | 'new' | 'rejected';

export interface VendorApplication extends VendorsFormState {
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
