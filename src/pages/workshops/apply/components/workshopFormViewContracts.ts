import type { UseFormRegister } from 'react-hook-form';
import type { WorkshopFormValues } from '../../../../domain/workshopApplications/workshopFormSchema.ts';
import type { WorkshopFormState } from '../../../../domain/workshopApplications/workshopFormTypes.ts';

export type ResolveWorkshopFormErrorMessage = (...fieldNames: Array<keyof WorkshopFormValues>) => string;

export interface WorkshopFormBindings {
  formData: WorkshopFormState;
  register: UseFormRegister<WorkshopFormValues>;
  resolveFieldErrorMessage: ResolveWorkshopFormErrorMessage;
}

export interface WorkshopFormStatusState {
  isComplete: boolean;
  isSubmitting: boolean;
  submitError: string;
  submittedAtLabel: string | null;
}

export interface WorkshopFormActions {
  submitWorkshopForm: () => Promise<void>;
  updateDescription: (value: string) => void;
}

export interface WorkshopFormViewProps {
  formActions: WorkshopFormActions;
  formBindings: WorkshopFormBindings;
  formStatus: WorkshopFormStatusState;
}
