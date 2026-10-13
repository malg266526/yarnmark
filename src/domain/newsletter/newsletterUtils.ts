import { isEmailValid } from '../vendorApplications/vendorFormUtils.ts';

export const NEWSLETTER_VALIDATION_KEYS = {
  emailInvalid: 'infoForVendorsPage.newsletter.validation.emailInvalid',
  emailRequired: 'infoForVendorsPage.newsletter.validation.emailRequired'
} as const;

export type NewsletterValidationKey = (typeof NEWSLETTER_VALIDATION_KEYS)[keyof typeof NEWSLETTER_VALIDATION_KEYS];

export const normalizeNewsletterEmail = (email: string) => email.trim();

export const validateNewsletterEmail = (email: string): NewsletterValidationKey | null => {
  const normalizedEmail = normalizeNewsletterEmail(email);

  if (!normalizedEmail) {
    return NEWSLETTER_VALIDATION_KEYS.emailRequired;
  }

  return isEmailValid(normalizedEmail) ? null : NEWSLETTER_VALIDATION_KEYS.emailInvalid;
};
