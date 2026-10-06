import { z } from 'zod';
import type {
  VendorApplication,
  VendorApplicationAllocationState,
  VendorApplicationStatus
} from './vendorFormSubmission.ts';
import {
  applicationRecordsSchema,
  normalizeBackendApplicationRecord,
  requestApi,
  resolveApiAssetUrl,
  unwrapSubmissions
} from '../apiClient.ts';
import { vendorFormStateSchema } from './vendorFormSchema.ts';
import { normalizeStandIds } from './vendorFormStandIds.ts';
import { VENDOR_FORM_API_URL } from './vendorFormConstants.ts';

const DEFAULT_VENDOR_APPLICATION_STATUS: VendorApplicationStatus = 'pending';
const DEFAULT_VENDOR_APPLICATION_ALLOCATION_STATE: VendorApplicationAllocationState = 'none';

const vendorApplicationStatusSchema = z
  .enum(['pending', 'rejected', 'reserve-list', 'accepted', 'stand-assigned'])
  .optional()
  .transform((status): VendorApplicationStatus => status ?? DEFAULT_VENDOR_APPLICATION_STATUS);

const vendorApplicationAllocationStateSchema = z
  .enum(['none', 'suggested', 'confirmed', 'manual-negotiation'])
  .optional()
  .transform(
    (allocationState): VendorApplicationAllocationState =>
      allocationState ?? DEFAULT_VENDOR_APPLICATION_ALLOCATION_STATE
  );

const vendorApplicationRecordSchema = vendorFormStateSchema
  .extend({
    allocatedStandId: z.string().nullable().optional(),
    allocationIteration: z
      .number()
      .nullable()
      .optional()
      .transform((allocationIteration) => allocationIteration ?? null),
    allocationState: vendorApplicationAllocationStateSchema,
    assignedStands: z.array(z.string()).optional(),
    id: z.string(),
    logoUrl: z
      .string()
      .nullable()
      .optional()
      .transform((logoUrl) => resolveApiAssetUrl(logoUrl)),
    status: vendorApplicationStatusSchema,
    submittedAt: z.string()
  })
  .transform(
    ({ allocatedStandId, assignedStands, ...application }): VendorApplication => ({
      ...application,
      assignedStands: normalizeStandIds(assignedStands ?? (allocatedStandId ? [allocatedStandId] : []))
    })
  );

export const parseVendorApplications = (responseBody: unknown): VendorApplication[] => {
  const applicationRecords = applicationRecordsSchema.safeParse(unwrapSubmissions(responseBody));

  if (!applicationRecords.success) {
    return [];
  }

  return applicationRecords.data.flatMap((applicationRecord) => {
    const parsedApplication = vendorApplicationRecordSchema.safeParse(
      normalizeBackendApplicationRecord(applicationRecord)
    );

    return parsedApplication.success ? [parsedApplication.data] : [];
  });
};

export const listVendorApplications = async (token: string): Promise<VendorApplication[]> =>
  parseVendorApplications(await requestApi(VENDOR_FORM_API_URL, { token }));

export const deleteVendorApplication = async (token: string, applicationId: string): Promise<void> => {
  await requestApi(`${VENDOR_FORM_API_URL}/${encodeURIComponent(applicationId)}`, {
    method: 'DELETE',
    token
  });
};

export const updateVendorApplicationStatus = async (
  token: string,
  applicationId: string,
  assignedStands: string[],
  status: VendorApplicationStatus
): Promise<void> => {
  await requestApi(`${VENDOR_FORM_API_URL}/${encodeURIComponent(applicationId)}`, {
    method: 'PATCH',
    body: { assignedStands, status },
    token
  });
};
