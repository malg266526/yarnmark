import type { VendorApplication } from './vendorsFormSubmission';
import type { VendorsFormState } from './vendorsFormTypes';

const VENDOR_APPLICATIONS_STORAGE_KEY = 'vendor-applications-json';

const readStoredApplications = (): VendorApplication[] => {
  const rawValue = window.localStorage.getItem(VENDOR_APPLICATIONS_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    return Array.isArray(parsedValue) ? (parsedValue as VendorApplication[]) : [];
  } catch {
    return [];
  }
};

const writeStoredApplications = (applications: VendorApplication[]) => {
  window.localStorage.setItem(VENDOR_APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

export const listVendorApplications = async () => {
  return {
    applications: readStoredApplications()
  };
};

export const createVendorApplication = async (formData: VendorsFormState) => {
  const application: VendorApplication = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    ...formData
  };

  const applications = readStoredApplications();
  writeStoredApplications([...applications, application]);

  return {
    application
  };
};
