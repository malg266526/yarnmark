import { z } from 'zod';
import type { VendorFormState } from './vendorFormTypes.ts';
import { INITIAL_VENDOR_FORM_STATE } from './vendorFormTypes.ts';
import { vendorFormStateSchema } from './vendorFormSchema.ts';

export interface VendorFormDraft {
  formData: VendorFormState;
  isComplete: boolean;
}

const storedVendorFormDraftSchema = z.object({
  formData: vendorFormStateSchema,
  isComplete: z.boolean()
});

export const parseStoredVendorFormDraft = (rawValue: string | null): VendorFormDraft | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;
    const parsedDraft = storedVendorFormDraftSchema.safeParse(parsedValue);

    return parsedDraft.success ? parsedDraft.data : null;
  } catch {
    return null;
  }
};

export const createEmptyVendorFormDraft = (): VendorFormDraft => ({
  formData: INITIAL_VENDOR_FORM_STATE,
  isComplete: false
});
