import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormBindings } from './workshopFormViewContracts';

const PHONE_NUMBER_ERROR_ID = 'workshop-phone-number-error';
const EMAIL_ERROR_ID = 'workshop-email-error';

interface WorkshopFormContactSectionProps {
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormContactSection = ({ formBindings }: WorkshopFormContactSectionProps) => {
  const t = useTypedTranslation();
  const { register, resolveFieldErrorMessage } = formBindings;
  const phoneNumberError = resolveFieldErrorMessage('phoneNumber');
  const emailError = resolveFieldErrorMessage('email');

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.contact.title')}</Typography>
        <FormField
          htmlFor="phone_number"
          label={t('workshopsFormPage.steps.contact.phoneLabel')}
          requirement="required"
          error={phoneNumberError}
          errorId={PHONE_NUMBER_ERROR_ID}
        >
          <TextInput
            id="phone_number"
            data-workshop-form-field="phoneNumber"
            aria-invalid={Boolean(phoneNumberError)}
            aria-describedby={phoneNumberError ? PHONE_NUMBER_ERROR_ID : undefined}
            type="tel"
            placeholder={t('workshopsFormPage.steps.contact.phonePlaceholder')}
            {...register('phoneNumber')}
          />
        </FormField>

        <FormField
          htmlFor="email_address"
          label={t('workshopsFormPage.steps.contact.emailLabel')}
          requirement="required"
          error={emailError}
          errorId={EMAIL_ERROR_ID}
        >
          <TextInput
            id="email_address"
            data-workshop-form-field="email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? EMAIL_ERROR_ID : undefined}
            type="email"
            placeholder={t('workshopsFormPage.steps.contact.emailPlaceholder')}
            {...register('email')}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
