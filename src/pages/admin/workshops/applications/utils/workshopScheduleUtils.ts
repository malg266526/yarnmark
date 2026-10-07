import type { WorkshopApplication } from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export type WorkshopApplicationWarning = 'missingContract';

export const buildWorkshopApplicationWarnings = (applications: WorkshopApplication[]) =>
  new Map<string, WorkshopApplicationWarning[]>(
    applications.map((application) => [application.id, application.contractType === null ? ['missingContract'] : []])
  );
