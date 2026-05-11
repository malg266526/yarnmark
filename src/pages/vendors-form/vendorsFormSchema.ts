import { z } from 'zod';
import { VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH } from './vendorsFormConstants.ts';
import { isEmailValid, isPhoneValid } from './vendorsFormUtils.ts';

export const VENDORS_FORM_VALIDATION_KEYS = {
  attendedBeforeRequired: 'vendorsFormPage.validation.attendedBeforeRequired',
  businessDescriptionRequired: 'vendorsFormPage.validation.businessDescriptionRequired',
  businessDescriptionTooLong: 'vendorsFormPage.validation.businessDescriptionTooLong',
  emailInvalid: 'vendorsFormPage.validation.emailInvalid',
  emailRequired: 'vendorsFormPage.validation.emailRequired',
  interestedIfUnavailableRequired: 'vendorsFormPage.validation.interestedIfUnavailableRequired',
  invoiceDetailsRequired: 'vendorsFormPage.validation.invoiceDetailsRequired',
  mainCategoryOtherRequired: 'vendorsFormPage.validation.mainCategoryOtherRequired',
  mainCategoryRequired: 'vendorsFormPage.validation.mainCategoryRequired',
  phoneInvalid: 'vendorsFormPage.validation.phoneInvalid',
  phoneRequired: 'vendorsFormPage.validation.phoneRequired',
  statuteRequired: 'vendorsFormPage.validation.statuteRequired',
  storeNameRequired: 'vendorsFormPage.validation.storeNameRequired'
} as const;

export const vendorsFormSchema = z
  .object({
    storeName: z.string().trim().min(1, VENDORS_FORM_VALIDATION_KEYS.storeNameRequired),
    attendedBefore: z.boolean().nullable(),
    mainCategory: z.enum(['yarns', 'accessories', 'ceramics', 'candles', 'other']).nullable(),
    mainCategoryOther: z.string(),
    preferredStands: z.array(z.string()),
    interestedIfUnavailable: z.boolean().nullable(),
    phoneNumber: z
      .string()
      .trim()
      .min(1, VENDORS_FORM_VALIDATION_KEYS.phoneRequired)
      .refine(isPhoneValid, VENDORS_FORM_VALIDATION_KEYS.phoneInvalid),
    email: z
      .string()
      .trim()
      .min(1, VENDORS_FORM_VALIDATION_KEYS.emailRequired)
      .refine(isEmailValid, VENDORS_FORM_VALIDATION_KEYS.emailInvalid),
    invoiceDetails: z.string().trim().min(1, VENDORS_FORM_VALIDATION_KEYS.invoiceDetailsRequired),
    logoFileName: z.string().nullable(),
    businessDescription: z
      .string()
      .trim()
      .min(1, VENDORS_FORM_VALIDATION_KEYS.businessDescriptionRequired)
      .max(VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH, VENDORS_FORM_VALIDATION_KEYS.businessDescriptionTooLong),
    acceptedStatute: z.boolean()
  })
  .superRefine((value, ctx) => {
    if (value.attendedBefore === null) {
      ctx.addIssue({
        code: 'custom',
        message: VENDORS_FORM_VALIDATION_KEYS.attendedBeforeRequired,
        path: ['attendedBefore']
      });
    }

    if (value.mainCategory === null) {
      ctx.addIssue({
        code: 'custom',
        message: VENDORS_FORM_VALIDATION_KEYS.mainCategoryRequired,
        path: ['mainCategory']
      });
    }

    if (value.mainCategory === 'other' && !value.mainCategoryOther.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: VENDORS_FORM_VALIDATION_KEYS.mainCategoryOtherRequired,
        path: ['mainCategoryOther']
      });
    }

    if (value.interestedIfUnavailable === null) {
      ctx.addIssue({
        code: 'custom',
        message: VENDORS_FORM_VALIDATION_KEYS.interestedIfUnavailableRequired,
        path: ['interestedIfUnavailable']
      });
    }

    if (!value.acceptedStatute) {
      ctx.addIssue({
        code: 'custom',
        message: VENDORS_FORM_VALIDATION_KEYS.statuteRequired,
        path: ['acceptedStatute']
      });
    }
  });

export type VendorsFormValues = z.infer<typeof vendorsFormSchema>;
