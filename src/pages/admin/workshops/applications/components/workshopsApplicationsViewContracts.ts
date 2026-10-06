import type {
  WorkshopApplication,
  WorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export interface WorkshopsApplicationsCardsViewProps {
  applications: WorkshopApplication[];
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  locale: string;
  setApplicationStatus: (applicationId: string, status: WorkshopApplicationStatus) => Promise<void>;
  translate: (translationKey: string, options?: Record<string, unknown>) => string;
}
