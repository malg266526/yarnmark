import { z } from 'zod';
import { VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH } from './vendorFormConstants.ts';
import { isEmailValid, isPhoneValid } from './vendorFormUtils.ts';
import { normalizeStandIds } from './vendorFormStandIds.ts';

export const VENDOR_FORM_VALIDATION_KEYS = {
  attendedBeforeRequired: 'vendorsFormPage.validation.attendedBeforeRequired',
  businessDescriptionRequired: 'vendorsFormPage.validation.businessDescriptionRequired',
  businessDescriptionTooLong: 'vendorsFormPage.validation.businessDescriptionTooLong',
  emailInvalid: 'vendorsFormPage.validation.emailInvalid',
  emailRequired: 'vendorsFormPage.validation.emailRequired',
  interestedIfUnavailableRequired: 'vendorsFormPage.validation.interestedIfUnavailableRequired',
  invoiceDetailsRequired: 'vendorsFormPage.validation.invoiceDetailsRequired',
  logoRequired: 'vendorsFormPage.validation.logoRequired',
  mainCategoryOtherRequired: 'vendorsFormPage.validation.mainCategoryOtherRequired',
  mainCategoryRequired: 'vendorsFormPage.validation.mainCategoryRequired',
  phoneInvalid: 'vendorsFormPage.validation.phoneInvalid',
  phoneRequired: 'vendorsFormPage.validation.phoneRequired',
  preferredStandsRequired: 'vendorsFormPage.validation.preferredStandsRequired',
  statuteRequired: 'vendorsFormPage.validation.statuteRequired',
  storeNameRequired: 'vendorsFormPage.validation.storeNameRequired'
} as const;

const vendorFormNullableBooleanSchema = z
  .boolean()
  .nullable()
  .optional()
  .transform((value) => value ?? null);

const vendorFormNullableStringSchema = z
  .string()
  .nullable()
  .optional()
  .transform((value) => value ?? null);

const vendorFormNullableLogoDataUrlSchema = z
  .string()
  .regex(/^data:image\/(png|jpe?g|webp|avif|gif);base64,/)
  .nullable()
  .optional()
  .transform((value) => value ?? null);

const vendorFormNullableLogoMimeTypeSchema = z
  .string()
  .regex(/^image\/(png|jpe?g|webp|avif|gif)$/)
  .nullable()
  .optional()
  .transform((value) => value ?? null);

export const vendorFormStateSchema = z.object({
  storeName: z.string(),
  attendedBefore: vendorFormNullableBooleanSchema,
  mainCategory: z.enum(['yarns', 'accessories', 'ceramics', 'candles', 'other']).nullable(),
  mainCategoryOther: z.string(),
  preferredStands: z.array(z.string()).transform((standIds) => normalizeStandIds(standIds)),
  interestedIfUnavailable: vendorFormNullableBooleanSchema,
  sponsorshipInterest: vendorFormNullableBooleanSchema,
  phoneNumber: z.string(),
  email: z.string(),
  invoiceDetails: z.string(),
  logoFileName: vendorFormNullableStringSchema,
  logoDataUrl: vendorFormNullableLogoDataUrlSchema,
  logoMimeType: vendorFormNullableLogoMimeTypeSchema,
  businessDescription: z.string(),
  acceptedStatute: z.boolean()
});

export const vendorFormValidationSchema = vendorFormStateSchema
  .extend({
    storeName: z.string().trim().min(1, VENDOR_FORM_VALIDATION_KEYS.storeNameRequired),
    phoneNumber: z
      .string()
      .trim()
      .min(1, VENDOR_FORM_VALIDATION_KEYS.phoneRequired)
      .refine(isPhoneValid, VENDOR_FORM_VALIDATION_KEYS.phoneInvalid),
    email: z
      .string()
      .trim()
      .min(1, VENDOR_FORM_VALIDATION_KEYS.emailRequired)
      .refine(isEmailValid, VENDOR_FORM_VALIDATION_KEYS.emailInvalid),
    invoiceDetails: z.string().trim().min(1, VENDOR_FORM_VALIDATION_KEYS.invoiceDetailsRequired),
    businessDescription: z
      .string()
      .trim()
      .min(1, VENDOR_FORM_VALIDATION_KEYS.businessDescriptionRequired)
      .max(VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH, VENDOR_FORM_VALIDATION_KEYS.businessDescriptionTooLong)
  })
  .superRefine((value, ctx) => {
    if (value.attendedBefore === null) {
      ctx.addIssue({
        code: 'custom',
        message: VENDOR_FORM_VALIDATION_KEYS.attendedBeforeRequired,
        path: ['attendedBefore']
      });
    }

    if (value.mainCategory === null) {
      ctx.addIssue({
        code: 'custom',
        message: VENDOR_FORM_VALIDATION_KEYS.mainCategoryRequired,
        path: ['mainCategory']
      });
    }

    if (value.mainCategory === 'other' && !value.mainCategoryOther.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: VENDOR_FORM_VALIDATION_KEYS.mainCategoryOtherRequired,
        path: ['mainCategoryOther']
      });
    }

    if (value.preferredStands.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: VENDOR_FORM_VALIDATION_KEYS.preferredStandsRequired,
        path: ['preferredStands']
      });
    }

    if (value.interestedIfUnavailable === null) {
      ctx.addIssue({
        code: 'custom',
        message: VENDOR_FORM_VALIDATION_KEYS.interestedIfUnavailableRequired,
        path: ['interestedIfUnavailable']
      });
    }

    if (!value.acceptedStatute) {
      ctx.addIssue({
        code: 'custom',
        message: VENDOR_FORM_VALIDATION_KEYS.statuteRequired,
        path: ['acceptedStatute']
      });
    }

    if (!value.logoFileName || !value.logoDataUrl) {
      ctx.addIssue({
        code: 'custom',
        message: VENDOR_FORM_VALIDATION_KEYS.logoRequired,
        path: ['logoFileName']
      });
    }
  });

export type VendorFormValues = z.infer<typeof vendorFormValidationSchema>;

export const collectVendorFormValidationErrors = (values: VendorFormValues) => {
  const parsedValues = vendorFormValidationSchema.safeParse(values);

  if (parsedValues.success) {
    return {} as Partial<Record<keyof VendorFormValues, string>>;
  }

  const validationErrors: Partial<Record<keyof VendorFormValues, string>> = {};

  for (const issue of parsedValues.error.issues) {
    const fieldName = issue.path[0];

    if (typeof fieldName !== 'string' || fieldName in validationErrors) {
      continue;
    }

    validationErrors[fieldName as keyof VendorFormValues] = issue.message;
  }

  return validationErrors;
};
