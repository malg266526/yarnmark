import { requestApi, resolveSubmittedAt } from '../apiClient.ts';
import { WORKSHOP_FORM_API_URL } from './workshopFormConstants.ts';
import type { WorkshopFormState } from './workshopFormTypes.ts';

export const submitWorkshopApplicationToApi = async (formData: WorkshopFormState): Promise<string> => {
  const responseBody = await requestApi(WORKSHOP_FORM_API_URL, { method: 'POST', body: formData });

  return resolveSubmittedAt(responseBody);
};
