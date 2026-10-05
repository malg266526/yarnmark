import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormBindings } from './workshopFormViewContracts';

interface WorkshopFormBasicsSectionProps {
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormBasicsSection = ({ formBindings }: WorkshopFormBasicsSectionProps) => {
  const t = useTypedTranslation();
  const { register, resolveFieldErrorMessage } = formBindings;

  return (
    <FormSection $isFirst>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.basics.title')}</Typography>

        <FormField
          htmlFor="tutor_name"
          label={t('workshopsFormPage.steps.basics.tutorNameLabel')}
          requirement="required"
          error={resolveFieldErrorMessage('tutorName')}
        >
          <TextInput
            id="tutor_name"
            type="text"
            placeholder={t('workshopsFormPage.steps.basics.tutorNamePlaceholder')}
            {...register('tutorName')}
          />
        </FormField>

        <FormField
          htmlFor="workshop_title"
          label={t('workshopsFormPage.steps.basics.workshopTitleLabel')}
          requirement="required"
          error={resolveFieldErrorMessage('workshopTitle')}
        >
          <TextInput
            id="workshop_title"
            type="text"
            placeholder={t('workshopsFormPage.steps.basics.workshopTitlePlaceholder')}
            {...register('workshopTitle')}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
