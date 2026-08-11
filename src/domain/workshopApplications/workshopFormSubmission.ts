import type { WorkshopFormState } from './workshopFormTypes.ts';

export type WorkshopApplicationStatus = 'accepted' | 'considered' | 'new' | 'reserve';

export interface WorkshopApplication extends WorkshopFormState {
  id: string;
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
