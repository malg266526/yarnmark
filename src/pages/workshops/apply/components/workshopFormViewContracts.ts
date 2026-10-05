import type { FormDraftStatus } from '../../../../components/form/formDraftStatusUtils.ts';
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
  draftStatus: FormDraftStatus;
  isLoadingLogo: boolean;
  isSuccessModalOpen: boolean;
  isSubmitting: boolean;
  submitError: string;
  submittedFormData: WorkshopFormState | null;
  submittedAtLabel: string | null;
}

export interface WorkshopFormActions {
  closeSuccessModal: () => void;
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
