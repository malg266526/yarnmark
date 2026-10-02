import { requestApi, resolveSubmittedAt } from '../apiClient.ts';
import { VENDOR_FORM_API_URL } from './vendorFormConstants.ts';
import type { VendorFormState } from './vendorFormTypes.ts';

export const submitVendorApplicationToApi = async (formData: VendorFormState): Promise<string> => {
  const responseBody = await requestApi(VENDOR_FORM_API_URL, { method: 'POST', body: formData });

  return resolveSubmittedAt(responseBody);
};
