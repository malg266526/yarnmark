import type { WorkshopFormState } from './workshopFormTypes.ts';

export type WorkshopApplicationStatus = 'accepted' | 'pending' | 'rejected';

export interface WorkshopApplication extends WorkshopFormState {
  id: string;
  logoUrl: string | null;
  status: WorkshopApplicationStatus;
  submittedAt: string;
}

export interface CreateWorkshopApplicationRequest {
  formData: WorkshopFormState;
}

export interface CreateWorkshopApplicationResponse {
  application: WorkshopApplication;
}

export interface WorkshopApplicationsResponse {
  applications: WorkshopApplication[];
}
