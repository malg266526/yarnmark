import { z } from 'zod';
import { WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH } from './workshopFormConstants.ts';
import { isEmailValid, isPhoneValid } from '../vendorApplications/vendorFormUtils.ts';

export const WORKSHOP_FORM_VALIDATION_KEYS = {
  contractTypeOtherRequired: 'workshopsFormPage.validation.contractTypeOtherRequired',
  contractTypeRequired: 'workshopsFormPage.validation.contractTypeRequired',
  descriptionRequired: 'workshopsFormPage.validation.descriptionRequired',
  descriptionTooLong: 'workshopsFormPage.validation.descriptionTooLong',
  durationRequired: 'workshopsFormPage.validation.durationRequired',
  emailInvalid: 'workshopsFormPage.validation.emailInvalid',
  emailRequired: 'workshopsFormPage.validation.emailRequired',
  experienceLevelRequired: 'workshopsFormPage.validation.experienceLevelRequired',
  grossPricePerParticipantRequired: 'workshopsFormPage.validation.grossPricePerParticipantRequired',
  logoRequired: 'workshopsFormPage.validation.logoRequired',
  maxParticipantsRequired: 'workshopsFormPage.validation.maxParticipantsRequired',
  maxParticipantsTooSmall: 'workshopsFormPage.validation.maxParticipantsTooSmall',
  minParticipantsRequired: 'workshopsFormPage.validation.minParticipantsRequired',
  phoneInvalid: 'workshopsFormPage.validation.phoneInvalid',
  phoneRequired: 'workshopsFormPage.validation.phoneRequired',
  roomRequirementsRequired: 'workshopsFormPage.validation.roomRequirementsRequired',
  participantsShouldBringRequired: 'workshopsFormPage.validation.participantsShouldBringRequired',
  tutorNameRequired: 'workshopsFormPage.validation.tutorNameRequired',
  workshopTitleRequired: 'workshopsFormPage.validation.workshopTitleRequired'
} as const;

const workshopFormNullableStringSchema = z
  .string()
  .nullable()
  .optional()
  .transform((value) => value ?? null);

const workshopFormNullableNumberSchema = z.preprocess(
  (value) => (typeof value === 'number' && Number.isNaN(value) ? null : value),
  z
    .number()
    .nullable()
    .optional()
    .transform((value) => value ?? null)
);

const workshopFormNullableLogoDataUrlSchema = z
  .string()
  .regex(/^data:image\/(png|jpe?g|webp|avif|gif);base64,/)
  .nullable()
  .optional()
  .transform((value) => value ?? null);

const workshopFormNullableLogoMimeTypeSchema = z
  .string()
  .regex(/^image\/(png|jpe?g|webp|avif|gif)$/)
  .nullable()
  .optional()
  .transform((value) => value ?? null);

export const workshopFormStateSchema = z.object({
  tutorName: z.string(),
  workshopTitle: z.string(),
  description: z.string(),
  minParticipants: workshopFormNullableNumberSchema,
  maxParticipants: workshopFormNullableNumberSchema,
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced', 'any']).nullable(),
  duration: z.string(),
  participantsShouldBring: z.string(),
  roomRequirements: z.string(),
  requiredEquipment: z.string(),
  grossPricePerParticipant: workshopFormNullableNumberSchema,
  contractType: z.enum(['commission', 'specificWork', 'invoice', 'other']).nullable(),
  contractTypeOther: z.string(),
  additionalInfo: z.string(),
  logoFileName: workshopFormNullableStringSchema,
  logoDataUrl: workshopFormNullableLogoDataUrlSchema,
  logoMimeType: workshopFormNullableLogoMimeTypeSchema,
  phoneNumber: z.string(),
  email: z.string()
});

export const workshopFormValidationSchema = workshopFormStateSchema
  .extend({
    tutorName: z.string().trim().min(1, WORKSHOP_FORM_VALIDATION_KEYS.tutorNameRequired),
    workshopTitle: z.string().trim().min(1, WORKSHOP_FORM_VALIDATION_KEYS.workshopTitleRequired),
    description: z
      .string()
      .trim()
      .min(1, WORKSHOP_FORM_VALIDATION_KEYS.descriptionRequired)
      .max(WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH, WORKSHOP_FORM_VALIDATION_KEYS.descriptionTooLong),
    duration: z.string().trim().min(1, WORKSHOP_FORM_VALIDATION_KEYS.durationRequired),
    participantsShouldBring: z.string().trim().min(1, WORKSHOP_FORM_VALIDATION_KEYS.participantsShouldBringRequired),
    roomRequirements: z.string().trim().min(1, WORKSHOP_FORM_VALIDATION_KEYS.roomRequirementsRequired),
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
  })
  .superRefine((value, ctx) => {
    if (value.minParticipants === null || value.minParticipants <= 0) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.minParticipantsRequired,
        path: ['minParticipants']
      });
    }

    if (value.maxParticipants === null || value.maxParticipants <= 0) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.maxParticipantsRequired,
        path: ['maxParticipants']
      });
    } else if (value.minParticipants !== null && value.maxParticipants < value.minParticipants) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.maxParticipantsTooSmall,
        path: ['maxParticipants']
      });
    }

    if (value.experienceLevel === null) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.experienceLevelRequired,
        path: ['experienceLevel']
      });
    }

    if (value.grossPricePerParticipant === null || value.grossPricePerParticipant <= 0) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.grossPricePerParticipantRequired,
        path: ['grossPricePerParticipant']
      });
    }

    if (value.contractType === null) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.contractTypeRequired,
        path: ['contractType']
      });
    }

    if (value.contractType === 'other' && !value.contractTypeOther.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.contractTypeOtherRequired,
        path: ['contractTypeOther']
      });
    }

    if (!value.logoFileName || !value.logoDataUrl) {
      ctx.addIssue({
        code: 'custom',
        message: WORKSHOP_FORM_VALIDATION_KEYS.logoRequired,
        path: ['logoFileName']
      });
    }
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
