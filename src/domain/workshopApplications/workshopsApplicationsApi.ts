import { z } from 'zod';
import type { WorkshopApplication, WorkshopApplicationStatus, WorkshopSchedule } from './workshopFormSubmission.ts';
import {
  applicationRecordsSchema,
  normalizeBackendApplicationRecord,
  requestApi,
  resolveApiAssetUrl,
  unwrapSubmissions
} from '../apiClient.ts';
import { workshopFormStateSchema } from './workshopFormSchema.ts';
import { WORKSHOP_FORM_API_URL } from './workshopFormConstants.ts';

const DEFAULT_WORKSHOP_APPLICATION_STATUS: WorkshopApplicationStatus = 'pending';

const workshopApplicationStatusSchema = z
  .enum(['pending', 'rejected', 'accepted'])
  .optional()
  .transform((status): WorkshopApplicationStatus => status ?? DEFAULT_WORKSHOP_APPLICATION_STATUS);

const workshopScheduleSchema = z
  .object({
    day: z.enum(['saturday', 'sunday']),
    durationMinutes: z.number().int().positive(),
    room: z.string().trim().min(1),
    roomCapacity: z.number().int().positive(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)
  })
  .nullable()
  .optional()
  .transform((schedule): WorkshopSchedule | null => schedule ?? null);

const workshopApplicationRecordSchema = workshopFormStateSchema.extend({
  id: z.string(),
  logoUrl: z
    .string()
    .nullable()
    .optional()
    .transform((logoUrl) => resolveApiAssetUrl(logoUrl)),
  schedule: workshopScheduleSchema,
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
      normalizeBackendApplicationRecord(applicationRecord)
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
  await requestApi(`${WORKSHOP_FORM_API_URL}/${encodeURIComponent(applicationId)}`, {
    method: 'PATCH',
    body: { status },
    token
  });
};

export const updateWorkshopApplicationSchedule = async (
  token: string,
  applicationId: string,
  schedule: WorkshopSchedule | null
): Promise<void> => {
  await requestApi(`${WORKSHOP_FORM_API_URL}/${encodeURIComponent(applicationId)}`, {
    method: 'PATCH',
    body: { schedule },
    token
  });
};
