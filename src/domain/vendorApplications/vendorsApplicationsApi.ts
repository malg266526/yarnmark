import { z } from 'zod';
import type {
  VendorApplication,
  VendorApplicationAllocationState,
  VendorApplicationStatus
} from './vendorFormSubmission.ts';
import { applicationRecordsSchema, requestApi } from '../apiClient.ts';
import { vendorFormStateSchema } from './vendorFormSchema.ts';
import { VENDOR_FORM_API_URL } from './vendorFormConstants.ts';

const DEFAULT_VENDOR_APPLICATION_STATUS: VendorApplicationStatus = 'new';
const DEFAULT_VENDOR_APPLICATION_ALLOCATION_STATE: VendorApplicationAllocationState = 'none';

const vendorApplicationStatusSchema = z
  .enum(['new', 'considered', 'accepted', 'reserve', 'rejected'])
  .optional()
  .transform(
    (status): VendorApplicationStatus =>
      status === 'rejected' ? 'reserve' : (status ?? DEFAULT_VENDOR_APPLICATION_STATUS)
  );

const vendorApplicationAllocationStateSchema = z
  .enum(['none', 'suggested', 'confirmed', 'manual-negotiation'])
  .optional()
  .transform(
    (allocationState): VendorApplicationAllocationState =>
      allocationState ?? DEFAULT_VENDOR_APPLICATION_ALLOCATION_STATE
  );

const vendorApplicationRecordSchema = vendorFormStateSchema.extend({
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
  allocationState: vendorApplicationAllocationStateSchema,
  id: z.string(),
  status: vendorApplicationStatusSchema,
  submittedAt: z.string()
});

const BACKEND_PENDING_STATUS = 'pending';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const unwrapSubmissions = (responseBody: unknown): unknown =>
  isRecord(responseBody) && 'submissions' in responseBody ? responseBody.submissions : responseBody;

const normalizeBackendRecord = (record: unknown): unknown => {
  if (!isRecord(record)) {
    return record;
  }

  return {
    ...record,
    logoFileName: record.logoFileName ?? record.logoOriginalFilename,
    status: record.status === BACKEND_PENDING_STATUS ? DEFAULT_VENDOR_APPLICATION_STATUS : record.status,
    submittedAt: record.submittedAt ?? record.createdAt
  };
};

export const parseVendorApplications = (responseBody: unknown): VendorApplication[] => {
  const applicationRecords = applicationRecordsSchema.safeParse(unwrapSubmissions(responseBody));

  if (!applicationRecords.success) {
    return [];
  }

  return applicationRecords.data.flatMap((applicationRecord) => {
    const parsedApplication = vendorApplicationRecordSchema.safeParse(normalizeBackendRecord(applicationRecord));

    return parsedApplication.success ? [parsedApplication.data] : [];
  });
};

export const listVendorApplications = async (token: string): Promise<VendorApplication[]> =>
  parseVendorApplications(await requestApi(VENDOR_FORM_API_URL, { token }));

export const updateVendorApplicationStatus = async (
  token: string,
  applicationId: string,
  status: VendorApplicationStatus
): Promise<void> => {
  await requestApi(`${VENDOR_FORM_API_URL}/${encodeURIComponent(applicationId)}/status`, {
    method: 'PATCH',
    body: { status },
    token
  });
};
