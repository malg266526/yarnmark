import { z } from 'zod';
import { requestApi, resolveSubmittedAt } from '../apiClient.ts';
import { VENDOR_FORM_API_URL, VENDOR_STANDS_DEMAND_API_URL } from './vendorFormConstants.ts';
import type { StandDemand, VendorFormState } from './vendorFormTypes.ts';

export const submitVendorApplicationToApi = async (formData: VendorFormState): Promise<string> => {
  const responseBody = await requestApi(VENDOR_FORM_API_URL, { method: 'POST', body: formData });

  return resolveSubmittedAt(responseBody);
};

const standsDemandResponseSchema = z.object({ standDemand: z.record(z.string(), z.string()) });

export const fetchStandsDemandFromApi = async (): Promise<StandDemand> => {
  const responseBody = await requestApi(VENDOR_STANDS_DEMAND_API_URL);

  return standsDemandResponseSchema.parse(responseBody).standDemand;
};
