import type { WorkshopFormState } from './workshopFormTypes.ts';

export type WorkshopApplicationStatus = 'accepted' | 'pending' | 'rejected';

export type WorkshopScheduleDay = 'saturday' | 'sunday';

export interface WorkshopSchedule {
  day: WorkshopScheduleDay;
  durationMinutes: number;
  room: string;
  roomCapacity: number;
  startTime: string;
}

export interface WorkshopApplication extends WorkshopFormState {
  id: string;
  logoUrl: string | null;
  schedule: WorkshopSchedule | null;
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
