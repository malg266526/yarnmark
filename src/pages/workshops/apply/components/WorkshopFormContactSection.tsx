import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
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
        <FormField
          htmlFor="phone_number"
          label={t('workshopsFormPage.steps.contact.phoneLabel')}
          requirement="required"
          error={resolveFieldErrorMessage('phoneNumber')}
        >
          <TextInput
            id="phone_number"
            type="tel"
            placeholder={t('workshopsFormPage.steps.contact.phonePlaceholder')}
            {...register('phoneNumber')}
          />
        </FormField>

        <FormField
          htmlFor="email_address"
          label={t('workshopsFormPage.steps.contact.emailLabel')}
          requirement="required"
          error={resolveFieldErrorMessage('email')}
        >
          <TextInput
            id="email_address"
            type="email"
            placeholder={t('workshopsFormPage.steps.contact.emailPlaceholder')}
            {...register('email')}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
