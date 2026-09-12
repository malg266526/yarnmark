import type { WorkshopApplication } from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export const formatDateTime = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'medium'
  }).format(new Date(value));

export const sortApplicationsBySubmittedAt = (applications: WorkshopApplication[]) =>
  [...applications].sort((leftApplication, rightApplication) =>
    leftApplication.submittedAt.localeCompare(rightApplication.submittedAt)
  );
