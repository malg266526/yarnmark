import { z } from 'zod';
import { WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH } from './workshopFormConstants.ts';
import { isEmailValid, isPhoneValid } from '../vendorApplications/vendorFormUtils.ts';

export const WORKSHOP_FORM_VALIDATION_KEYS = {
  descriptionRequired: 'workshopsFormPage.validation.descriptionRequired',
  descriptionTooLong: 'workshopsFormPage.validation.descriptionTooLong',
  emailInvalid: 'workshopsFormPage.validation.emailInvalid',
  emailRequired: 'workshopsFormPage.validation.emailRequired',
  phoneInvalid: 'workshopsFormPage.validation.phoneInvalid',
  phoneRequired: 'workshopsFormPage.validation.phoneRequired',
  tutorNameRequired: 'workshopsFormPage.validation.tutorNameRequired',
  workshopTitleRequired: 'workshopsFormPage.validation.workshopTitleRequired'
} as const;

export const workshopFormStateSchema = z.object({
  tutorName: z.string(),
  workshopTitle: z.string(),
  description: z.string(),
  phoneNumber: z.string(),
  email: z.string()
});

export const workshopFormValidationSchema = workshopFormStateSchema.extend({
  tutorName: z.string().trim().min(1, WORKSHOP_FORM_VALIDATION_KEYS.tutorNameRequired),
  workshopTitle: z.string().trim().min(1, WORKSHOP_FORM_VALIDATION_KEYS.workshopTitleRequired),
  description: z
    .string()
    .trim()
    .min(1, WORKSHOP_FORM_VALIDATION_KEYS.descriptionRequired)
    .max(WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH, WORKSHOP_FORM_VALIDATION_KEYS.descriptionTooLong),
  phoneNumber: z
    .string()
    .trim()
    .min(1, WORKSHOP_FORM_VALIDATION_KEYS.phoneRequired)
    .refine(isPhoneValid, WORKSHOP_FORM_VALIDATION_KEYS.phoneInvalid),
  email: z
    .string()
    .trim()
    .min(1, WORKSHOP_FORM_VALIDATION_KEYS.emailRequired)
    .refine(isEmailValid, WORKSHOP_FORM_VALIDATION_KEYS.emailInvalid)
});

export type WorkshopFormValues = z.infer<typeof workshopFormValidationSchema>;

export const collectWorkshopFormValidationErrors = (values: WorkshopFormValues) => {
  const parsedValues = workshopFormValidationSchema.safeParse(values);

  if (parsedValues.success) {
    return {} as Partial<Record<keyof WorkshopFormValues, string>>;
  }

  const validationErrors: Partial<Record<keyof WorkshopFormValues, string>> = {};

  for (const issue of parsedValues.error.issues) {
    const fieldName = issue.path[0];

    if (typeof fieldName !== 'string' || fieldName in validationErrors) {
      continue;
    }

    validationErrors[fieldName as keyof WorkshopFormValues] = issue.message;
  }

  return validationErrors;
};
