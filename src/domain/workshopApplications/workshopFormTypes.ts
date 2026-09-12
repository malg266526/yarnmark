export type WorkshopFormContractType = 'commission' | 'specificWork' | 'invoice' | 'other' | null;

export type WorkshopFormExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'any' | null;

export interface WorkshopFormState {
  tutorName: string;
  workshopTitle: string;
  description: string;
  minParticipants: number | null;
  maxParticipants: number | null;
  experienceLevel: WorkshopFormExperienceLevel;
  duration: string;
  participantsShouldBring: string;
  roomRequirements: string;
  requiredEquipment: string;
  grossPricePerParticipant: number | null;
  contractType: WorkshopFormContractType;
  contractTypeOther: string;
  additionalInfo: string;
  logoFileName: string | null;
  logoDataUrl: string | null;
  logoMimeType: string | null;
  phoneNumber: string;
  email: string;
}

export const INITIAL_WORKSHOP_FORM_STATE: WorkshopFormState = {
  tutorName: '',
  workshopTitle: '',
  description: '',
  minParticipants: null,
  maxParticipants: null,
  experienceLevel: null,
  duration: '',
  participantsShouldBring: '',
  roomRequirements: '',
  requiredEquipment: '',
  grossPricePerParticipant: null,
  contractType: null,
  contractTypeOther: '',
  additionalInfo: '',
  logoFileName: null,
  logoDataUrl: null,
  logoMimeType: null,
  phoneNumber: '',
  email: ''
};
