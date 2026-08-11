import { z } from 'zod';
import type { WorkshopApplication, WorkshopApplicationStatus } from './workshopFormSubmission.ts';
import type { WorkshopFormState } from './workshopFormTypes.ts';
import { workshopFormStateSchema } from './workshopFormSchema.ts';

const WORKSHOP_APPLICATIONS_STORAGE_KEY = 'workshop-applications-json';
const DEFAULT_WORKSHOP_APPLICATION_STATUS: WorkshopApplicationStatus = 'new';

const storedWorkshopApplicationStatusSchema = z
  .enum(['new', 'considered', 'accepted', 'reserve'])
  .optional()
  .transform((status): WorkshopApplicationStatus => status ?? DEFAULT_WORKSHOP_APPLICATION_STATUS);

const storedWorkshopApplicationRecordSchema = workshopFormStateSchema.extend({
  id: z.string(),
  status: storedWorkshopApplicationStatusSchema,
  submittedAt: z.string()
});

export const parseStoredWorkshopApplications = (rawValue: string | null): WorkshopApplication[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.flatMap((applicationRecord) => {
      const parsedApplication = storedWorkshopApplicationRecordSchema.safeParse(applicationRecord);

      return parsedApplication.success ? [parsedApplication.data] : [];
    });
  } catch {
    return [];
  }
};

const readStoredWorkshopApplications = (): WorkshopApplication[] =>
  parseStoredWorkshopApplications(window.localStorage.getItem(WORKSHOP_APPLICATIONS_STORAGE_KEY));

const writeStoredWorkshopApplications = (applications: WorkshopApplication[]) => {
  window.localStorage.setItem(WORKSHOP_APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

export const listWorkshopApplications = async () => {
  return {
    applications: readStoredWorkshopApplications()
  };
};

export const createWorkshopApplication = async (formData: WorkshopFormState) => {
  const application: WorkshopApplication = {
    id: crypto.randomUUID(),
    status: DEFAULT_WORKSHOP_APPLICATION_STATUS,
    submittedAt: new Date().toISOString(),
    ...formData
  };

  const storedApplications = readStoredWorkshopApplications();
  writeStoredWorkshopApplications([...storedApplications, application]);

  return {
    application
  };
};
