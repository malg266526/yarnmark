export interface WorkshopFormState {
  tutorName: string;
  workshopTitle: string;
  description: string;
  phoneNumber: string;
  email: string;
}

export const INITIAL_WORKSHOP_FORM_STATE: WorkshopFormState = {
  tutorName: '',
  workshopTitle: '',
  description: '',
  phoneNumber: '',
  email: ''
};
