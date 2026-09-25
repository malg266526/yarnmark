import { WORKSHOP_FORM_API_URL } from './workshopFormConstants.ts';
import type { WorkshopFormState } from './workshopFormTypes.ts';

export const submitWorkshopApplicationToApi = async (formData: WorkshopFormState): Promise<void> => {
  console.log('Workshop application submission payload', formData);

  try {
    await fetch(WORKSHOP_FORM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  } catch (error) {
    console.error('Workshop application API call failed', error);
  }
};
