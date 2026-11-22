import { z } from 'zod';
import { requestApi, resolveApiAssetUrl } from '../apiClient.ts';
import { VENDOR_ASSIGNED_STANDS_API_URL } from './vendorFormConstants.ts';

export interface AssignedStandVendor {
  storeName: string;
  logoUrl: string | null;
}

export type AssignedStandVendors = ReadonlyMap<string, AssignedStandVendor>;

const assignedStandVendorSchema = z.object({
  storeName: z.string(),
  logoUrl: z
    .string()
    .nullish()
    .transform((logoUrl) => resolveApiAssetUrl(logoUrl))
});

const assignedStandsResponseSchema = z.object({
  entries: z.array(z.tuple([z.string(), assignedStandVendorSchema]))
});

export const parseAssignedStandVendors = (responseBody: unknown): AssignedStandVendors =>
  new Map(assignedStandsResponseSchema.parse(responseBody).entries);

export const fetchAssignedStandVendorsFromApi = async (): Promise<AssignedStandVendors> =>
  parseAssignedStandVendors(await requestApi(VENDOR_ASSIGNED_STANDS_API_URL));
