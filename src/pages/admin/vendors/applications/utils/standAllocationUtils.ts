import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const compareApplicationsBySubmittedAt = (
  leftApplication: VendorApplication,
  rightApplication: VendorApplication
) => leftApplication.submittedAt.localeCompare(rightApplication.submittedAt);

export const sortApplicationsBySubmittedAt = (applications: VendorApplication[]) =>
  [...applications].sort(compareApplicationsBySubmittedAt);

export const getAcceptedApplicationsSortedBySubmittedAt = (applications: VendorApplication[]) =>
  sortApplicationsBySubmittedAt(applications.filter((application) => application.status === 'accepted'));
