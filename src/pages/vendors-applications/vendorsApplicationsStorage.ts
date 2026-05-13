import { z } from 'zod';
import type {
  VendorApplication,
  VendorApplicationAllocationState,
  VendorApplicationStatus
} from '../vendor-form/vendorFormSubmission.ts';
import type { VendorFormState } from '../vendor-form/vendorFormTypes.ts';
import { VENDORS_APPLICATIONS_MOCK } from './vendorsApplicationsMock.ts';
import { vendorFormStateSchema } from '../vendor-form/vendorFormSchema.ts';
import { getStandInterestCounts } from '../vendor-form/vendorFormStandInterestUtils.ts';

const VENDOR_APPLICATIONS_STORAGE_KEY = 'vendor-applications-json';
const DEFAULT_VENDOR_APPLICATION_STATUS: VendorApplicationStatus = 'new';
const DEFAULT_VENDOR_APPLICATION_ALLOCATION_STATE: VendorApplicationAllocationState = 'none';

const storedVendorApplicationStatusSchema = z
  .enum(['new', 'considered', 'accepted', 'reserve', 'rejected'])
  .optional()
  .transform(
    (status): VendorApplicationStatus =>
      status === 'rejected' ? 'reserve' : (status ?? DEFAULT_VENDOR_APPLICATION_STATUS)
  );

const storedVendorApplicationAllocationStateSchema = z
  .enum(['none', 'suggested', 'confirmed', 'manual-negotiation'])
  .optional()
  .transform(
    (allocationState): VendorApplicationAllocationState =>
      allocationState ?? DEFAULT_VENDOR_APPLICATION_ALLOCATION_STATE
  );

const storedVendorApplicationRecordSchema = vendorFormStateSchema.extend({
  allocatedStandId: z
    .string()
    .nullable()
    .optional()
    .transform((allocatedStandId) => allocatedStandId ?? null),
  allocationIteration: z
    .number()
    .nullable()
    .optional()
    .transform((allocationIteration) => allocationIteration ?? null),
  allocationState: storedVendorApplicationAllocationStateSchema,
  id: z.string(),
  status: storedVendorApplicationStatusSchema,
  submittedAt: z.string()
});

export const parseStoredVendorApplications = (rawValue: string | null): VendorApplication[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.flatMap((applicationRecord) => {
      const parsedApplication = storedVendorApplicationRecordSchema.safeParse(applicationRecord);

      return parsedApplication.success ? [parsedApplication.data] : [];
    });
  } catch {
    return [];
  }
};

const getStoredOrMockVendorApplications = () => {
  const storedApplications = readStoredVendorApplications();

  return storedApplications.length > 0 ? storedApplications : VENDORS_APPLICATIONS_MOCK;
};

const readStoredVendorApplications = (): VendorApplication[] =>
  parseStoredVendorApplications(window.localStorage.getItem(VENDOR_APPLICATIONS_STORAGE_KEY));

const writeStoredVendorApplications = (applications: VendorApplication[]) => {
  window.localStorage.setItem(VENDOR_APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

export const listVendorApplications = async () => {
  return {
    applications: getStoredOrMockVendorApplications()
  };
};

export const listStandInterestCounts = async () => {
  return {
    standInterestCounts: getStandInterestCounts(getStoredOrMockVendorApplications())
  };
};

export const createVendorApplication = async (formData: VendorFormState) => {
  const application: VendorApplication = {
    allocatedStandId: null,
    allocationIteration: null,
    allocationState: DEFAULT_VENDOR_APPLICATION_ALLOCATION_STATE,
    id: crypto.randomUUID(),
    status: DEFAULT_VENDOR_APPLICATION_STATUS,
    submittedAt: new Date().toISOString(),
    ...formData
  };

  const storedApplications = readStoredVendorApplications();
  writeStoredVendorApplications([...storedApplications, application]);

  return {
    application
  };
};

export const updateVendorApplicationStatus = async (applicationId: string, status: VendorApplicationStatus) => {
  const storedApplications = readStoredVendorApplications();
  const updatedApplications = storedApplications.map((application) =>
    application.id === applicationId ? { ...application, status } : application
  );

  writeStoredVendorApplications(updatedApplications);

  return {
    applications: getStoredOrMockVendorApplications()
  };
};
