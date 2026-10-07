import type {
  WorkshopApplication,
  WorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';
import type { WorkshopApplicationWarning } from '../utils/workshopScheduleUtils.ts';

export interface WorkshopsApplicationsCardsViewProps {
  applications: WorkshopApplication[];
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  locale: string;
  setApplicationStatus: (applicationId: string, status: WorkshopApplicationStatus) => Promise<void>;
  translate: (translationKey: string, options?: Record<string, unknown>) => string;
  warningsByApplicationId: Map<string, WorkshopApplicationWarning[]>;
}

export interface WorkshopApplicationDetailsViewProps {
  application: WorkshopApplication;
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  setApplicationStatus: (applicationId: string, status: WorkshopApplicationStatus) => Promise<void>;
  translate: (translationKey: string, options?: Record<string, unknown>) => string;
  warnings: WorkshopApplicationWarning[];
}

export interface WorkshopApplicationDetailsDrawerProps
  extends Omit<WorkshopApplicationDetailsViewProps, 'application'> {
  application: WorkshopApplication | null;
  closeApplication: () => void;
  locale: string;
}
