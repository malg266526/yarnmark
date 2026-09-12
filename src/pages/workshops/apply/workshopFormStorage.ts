import { z } from 'zod';
import type { WorkshopFormState } from '../../../domain/workshopApplications/workshopFormTypes.ts';
import { INITIAL_WORKSHOP_FORM_STATE } from '../../../domain/workshopApplications/workshopFormTypes.ts';
import { workshopFormStateSchema } from '../../../domain/workshopApplications/workshopFormSchema.ts';

export interface WorkshopFormDraft {
  formData: WorkshopFormState;
  isComplete: boolean;
}

const storedWorkshopFormDraftSchema = z.object({
  formData: workshopFormStateSchema,
  isComplete: z.boolean()
});

export const parseStoredWorkshopFormDraft = (rawValue: string | null): WorkshopFormDraft | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;
    const parsedDraft = storedWorkshopFormDraftSchema.safeParse(parsedValue);

    return parsedDraft.success ? parsedDraft.data : null;
  } catch {
    return null;
  }
};

export const createEmptyWorkshopFormDraft = (): WorkshopFormDraft => ({
  formData: INITIAL_WORKSHOP_FORM_STATE,
  isComplete: false
});
