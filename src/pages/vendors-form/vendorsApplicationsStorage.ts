import type { VendorApplication } from './vendorsFormSubmission';
import type { VendorsFormState } from './vendorsFormTypes';
import { VENDORS_APPLICATIONS_MOCK } from '../vendors-applications/vendorsApplicationsMock';
import { isVendorsFormState } from './vendorsFormStorage';

const VENDOR_APPLICATIONS_STORAGE_KEY = 'vendor-applications-json';

const isVendorApplication = (value: unknown): value is VendorApplication => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.id === 'string' && typeof candidate.submittedAt === 'string' && isVendorsFormState(candidate);
};

const readStoredApplications = (): VendorApplication[] => {
  const rawValue = window.localStorage.getItem(VENDOR_APPLICATIONS_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isVendorApplication);
  } catch {
    return [];
  }
};

const writeStoredApplications = (applications: VendorApplication[]) => {
  window.localStorage.setItem(VENDOR_APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

export const listVendorApplications = async () => {
  return {
    applications: (() => {
      const applications = readStoredApplications();

      return applications.length > 0 ? applications : VENDORS_APPLICATIONS_MOCK;
    })()
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
