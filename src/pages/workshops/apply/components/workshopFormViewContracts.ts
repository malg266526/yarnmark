import type { UseFormRegister } from 'react-hook-form';
import type { WorkshopFormValues } from '../../../../domain/workshopApplications/workshopFormSchema.ts';
import type {
  WorkshopFormContractType,
  WorkshopFormExperienceLevel,
  WorkshopFormState
} from '../../../../domain/workshopApplications/workshopFormTypes.ts';

export type WorkshopFormNumberFieldName = 'minParticipants' | 'maxParticipants' | 'grossPricePerParticipant';

export type ResolveWorkshopFormErrorMessage = (...fieldNames: Array<keyof WorkshopFormValues>) => string;

export interface WorkshopFormBindings {
  formData: WorkshopFormState;
  register: UseFormRegister<WorkshopFormValues>;
  resolveFieldErrorMessage: ResolveWorkshopFormErrorMessage;
}

export interface WorkshopFormStatusState {
  isComplete: boolean;
  isLoadingLogo: boolean;
  isSubmitting: boolean;
  submitError: string;
  submittedAtLabel: string | null;
}

export interface WorkshopFormActions {
  setContractType: (contractType: WorkshopFormContractType) => void;
  setExperienceLevel: (experienceLevel: WorkshopFormExperienceLevel) => void;
  setNumberFieldValue: (fieldName: WorkshopFormNumberFieldName, value: number | null) => void;
  submitWorkshopForm: () => Promise<void>;
  updateDescription: (value: string) => void;
  updateLogoFile: (file: File | null) => void;
}

export interface WorkshopFormViewProps {
  formActions: WorkshopFormActions;
  formBindings: WorkshopFormBindings;
  formStatus: WorkshopFormStatusState;
}
