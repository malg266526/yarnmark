import { VENDOR_FORM_API_URL } from './vendorFormConstants.ts';
import type { VendorFormState } from './vendorFormTypes.ts';

export const submitVendorApplicationToApi = async (formData: VendorFormState): Promise<void> => {
  console.log('Vendor application submission payload', formData);

  try {
    await fetch(VENDOR_FORM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  } catch (error) {
    console.error('Vendor application API call failed', error);
  }
};
