import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldLabel, Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormBindings } from './workshopFormViewContracts';

interface WorkshopFormContactSectionProps {
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormContactSection = ({ formBindings }: WorkshopFormContactSectionProps) => {
  const t = useTypedTranslation();
  const { register, resolveFieldErrorMessage } = formBindings;

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.contact.title')}</Typography>
        <FieldLabel htmlFor="phone_number">
          {t('workshopsFormPage.steps.contact.phoneLabel')}
          <TextInput
            id="phone_number"
            type="tel"
            placeholder={t('workshopsFormPage.steps.contact.phonePlaceholder')}
            {...register('phoneNumber')}
          />
        </FieldLabel>

        <FieldLabel htmlFor="email_address">
          {t('workshopsFormPage.steps.contact.emailLabel')}
          <TextInput
            id="email_address"
            type="email"
            placeholder={t('workshopsFormPage.steps.contact.emailPlaceholder')}
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
