import type { VendorsFormState } from './vendorsFormTypes';

export interface VendorApplication extends VendorsFormState {
  id: string;
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
