import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldLabel, Fieldset, FormSection, TextInput } from '../VendorFormPage.styled';
import type { VendorFormBindings } from './vendorFormViewContracts';

const PHONE_NUMBER_ERROR_ID = 'vendor-phone-number-error';
const EMAIL_ERROR_ID = 'vendor-email-error';

interface VendorFormContactSectionProps {
  formBindings: VendorFormBindings;
}

export const VendorFormContactSection = ({ formBindings }: VendorFormContactSectionProps) => {
  const t = useTypedTranslation();
  const { register, resolveFieldErrorMessage } = formBindings;
  const phoneNumberError = resolveFieldErrorMessage('phoneNumber');
  const emailError = resolveFieldErrorMessage('email');

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.contact.title')}</Typography>
        <FieldLabel htmlFor="phone_number">
          {t('vendorsFormPage.steps.contact.phoneLabel')}
          <TextInput
            id="phone_number"
            type="tel"
            data-vendor-form-field="phoneNumber"
            aria-invalid={Boolean(phoneNumberError)}
            aria-describedby={phoneNumberError ? PHONE_NUMBER_ERROR_ID : undefined}
            placeholder={t('vendorsFormPage.steps.contact.phonePlaceholder')}
            {...register('phoneNumber')}
          />
        </FieldLabel>
        {phoneNumberError ? <ErrorText id={PHONE_NUMBER_ERROR_ID}>{phoneNumberError}</ErrorText> : null}

        <FieldLabel htmlFor="email_address">
          {t('vendorsFormPage.steps.contact.emailLabel')}
          <TextInput
            id="email_address"
            type="email"
            data-vendor-form-field="email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? EMAIL_ERROR_ID : undefined}
            placeholder={t('vendorsFormPage.steps.contact.emailPlaceholder')}
            {...register('email')}
          />
        </FieldLabel>
        {emailError ? <ErrorText id={EMAIL_ERROR_ID}>{emailError}</ErrorText> : null}
      </Fieldset>
    </FormSection>
  );
};
