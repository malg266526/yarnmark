import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextInput } from '../VendorFormPage.styled';
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
        <FormField
          htmlFor="phone_number"
          label={t('vendorsFormPage.steps.contact.phoneLabel')}
          requirement="required"
          error={phoneNumberError}
          errorId={PHONE_NUMBER_ERROR_ID}
        >
          <TextInput
            id="phone_number"
            type="tel"
            data-vendor-form-field="phoneNumber"
            aria-invalid={Boolean(phoneNumberError)}
            aria-describedby={phoneNumberError ? PHONE_NUMBER_ERROR_ID : undefined}
            placeholder={t('vendorsFormPage.steps.contact.phonePlaceholder')}
            {...register('phoneNumber')}
          />
        </FormField>

        <FormField
          htmlFor="email_address"
          label={t('vendorsFormPage.steps.contact.emailLabel')}
          requirement="required"
          error={emailError}
          errorId={EMAIL_ERROR_ID}
        >
          <TextInput
            id="email_address"
            type="email"
            data-vendor-form-field="email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? EMAIL_ERROR_ID : undefined}
            placeholder={t('vendorsFormPage.steps.contact.emailPlaceholder')}
            {...register('email')}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
