import React from 'react';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { ErrorText, FieldLabel, Fieldset, FormSection, TextInput } from '../VendorFormPage.styled';
import type { VendorFormBindings } from './vendorFormViewContracts';

interface VendorFormContactSectionProps {
  formBindings: VendorFormBindings;
}

export const VendorFormContactSection = ({ formBindings }: VendorFormContactSectionProps) => {
  const t = useTypedTranslation();
  const { register, resolveFieldErrorMessage } = formBindings;

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.contact.title')}</Typography>
        <FieldLabel htmlFor="phone_number">
          {t('vendorsFormPage.steps.contact.phoneLabel')}
          <TextInput
            id="phone_number"
            type="tel"
            placeholder={t('vendorsFormPage.steps.contact.phonePlaceholder')}
            {...register('phoneNumber')}
          />
        </FieldLabel>

        <FieldLabel htmlFor="email_address">
          {t('vendorsFormPage.steps.contact.emailLabel')}
          <TextInput
            id="email_address"
            type="email"
            placeholder={t('vendorsFormPage.steps.contact.emailPlaceholder')}
            {...register('email')}
          />
        </FieldLabel>
        {resolveFieldErrorMessage('phoneNumber', 'email') ? (
          <ErrorText>{resolveFieldErrorMessage('phoneNumber', 'email')}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
