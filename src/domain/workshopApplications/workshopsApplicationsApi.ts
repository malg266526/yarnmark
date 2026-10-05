import { z } from 'zod';
import type { WorkshopApplication, WorkshopApplicationStatus } from './workshopFormSubmission.ts';
import {
  applicationRecordsSchema,
  normalizeBackendApplicationRecord,
  requestApi,
  resolveApiAssetUrl,
  unwrapSubmissions
} from '../apiClient.ts';
import { workshopFormStateSchema } from './workshopFormSchema.ts';
import { WORKSHOP_FORM_API_URL } from './workshopFormConstants.ts';

const DEFAULT_WORKSHOP_APPLICATION_STATUS: WorkshopApplicationStatus = 'new';

const workshopApplicationStatusSchema = z
  .enum(['new', 'considered', 'accepted', 'reserve'])
  .optional()
  .transform((status): WorkshopApplicationStatus => status ?? DEFAULT_WORKSHOP_APPLICATION_STATUS);

const workshopApplicationRecordSchema = workshopFormStateSchema.extend({
  id: z.string(),
  logoUrl: z
    .string()
    .nullable()
    .optional()
    .transform((logoUrl) => resolveApiAssetUrl(logoUrl)),
  status: workshopApplicationStatusSchema,
  submittedAt: z.string()
});

export const parseWorkshopApplications = (responseBody: unknown): WorkshopApplication[] => {
  const applicationRecords = applicationRecordsSchema.safeParse(unwrapSubmissions(responseBody));

  if (!applicationRecords.success) {
    return [];
  }

  return applicationRecords.data.flatMap((applicationRecord) => {
    const parsedApplication = workshopApplicationRecordSchema.safeParse(
      normalizeBackendApplicationRecord(applicationRecord, DEFAULT_WORKSHOP_APPLICATION_STATUS)
    );

    return parsedApplication.success ? [parsedApplication.data] : [];
  });
};

export const listWorkshopApplications = async (token: string): Promise<WorkshopApplication[]> =>
  parseWorkshopApplications(await requestApi(WORKSHOP_FORM_API_URL, { token }));

export const deleteWorkshopApplication = async (token: string, applicationId: string): Promise<void> => {
  await requestApi(`${WORKSHOP_FORM_API_URL}/${encodeURIComponent(applicationId)}`, {
    method: 'DELETE',
    token
  });
};

export const updateWorkshopApplicationStatus = async (
  token: string,
  applicationId: string,
  status: WorkshopApplicationStatus
): Promise<void> => {
  await requestApi(`${WORKSHOP_FORM_API_URL}/${encodeURIComponent(applicationId)}/status`, {
    method: 'PATCH',
    body: { status },
    token
  });
};
