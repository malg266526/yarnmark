import type {
  WorkshopApplication,
  WorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export interface WorkshopsApplicationsCardsViewProps {
  applications: WorkshopApplication[];
  locale: string;
  setApplicationStatus: (applicationId: string, status: WorkshopApplicationStatus) => Promise<void>;
  translate: (translationKey: string) => string;
}
