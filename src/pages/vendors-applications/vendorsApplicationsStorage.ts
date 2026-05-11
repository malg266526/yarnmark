import type { VendorApplication, VendorApplicationStatus } from '../vendors-form/vendorsFormSubmission';
import type { VendorsFormState } from '../vendors-form/vendorsFormTypes';
import { VENDORS_APPLICATIONS_MOCK } from './vendorsApplicationsMock';
import { isVendorsFormState } from '../vendors-form/vendorsFormStorage';
import { normalizeStandIds } from '../vendors-form/vendorsFormStandIds';
import { getStandInterestCounts } from '../vendors-form/vendorsFormStandInterestUtils';

const VENDOR_APPLICATIONS_STORAGE_KEY = 'vendor-applications-json';
const DEFAULT_VENDOR_APPLICATION_STATUS: VendorApplicationStatus = 'new';

const isVendorApplication = (value: unknown): value is VendorApplication => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.submittedAt === 'string' &&
    (candidate.status === undefined ||
      candidate.status === 'new' ||
      candidate.status === 'considered' ||
      candidate.status === 'accepted' ||
      candidate.status === 'rejected') &&
    isVendorsFormState(candidate)
  );
};

const normalizeVendorApplication = (application: VendorApplication): VendorApplication => ({
  ...application,
  preferredStands: normalizeStandIds(application.preferredStands),
  status: application.status ?? DEFAULT_VENDOR_APPLICATION_STATUS
});

const getEffectiveApplications = () => {
  const storedApplications = readStoredApplications();

  return storedApplications.length > 0 ? storedApplications : VENDORS_APPLICATIONS_MOCK;
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

    return parsedValue.filter(isVendorApplication).map(normalizeVendorApplication);
  } catch {
    return [];
  }
};

const writeStoredApplications = (applications: VendorApplication[]) => {
  window.localStorage.setItem(VENDOR_APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

export const listVendorApplications = async () => {
  return {
    applications: getEffectiveApplications()
  };
};

export const listStandInterestCounts = async () => {
  return {
    standInterestCounts: getStandInterestCounts(getEffectiveApplications())
  };
};

export const createVendorApplication = async (formData: VendorsFormState) => {
  const application: VendorApplication = {
    id: crypto.randomUUID(),
    status: DEFAULT_VENDOR_APPLICATION_STATUS,
    submittedAt: new Date().toISOString(),
    ...formData
  };

  const storedApplications = readStoredApplications();
  writeStoredApplications([...storedApplications, application]);

  return {
    application
  };
};

export const updateVendorApplicationStatus = async (applicationId: string, status: VendorApplicationStatus) => {
  const storedApplications = readStoredApplications();
  const updatedApplications = storedApplications.map((application) =>
    application.id === applicationId ? { ...application, status } : application
  );

  writeStoredApplications(updatedApplications);

  return {
    applications: getEffectiveApplications()
  };
};
