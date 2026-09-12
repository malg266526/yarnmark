import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldLabel, Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
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

        <FieldLabel htmlFor="tutor_name">
          {t('workshopsFormPage.steps.basics.tutorNameLabel')}
          <TextInput
            id="tutor_name"
            type="text"
            placeholder={t('workshopsFormPage.steps.basics.tutorNamePlaceholder')}
            {...register('tutorName')}
          />
        </FieldLabel>
        {resolveFieldErrorMessage('tutorName') ? <ErrorText>{resolveFieldErrorMessage('tutorName')}</ErrorText> : null}

        <FieldLabel htmlFor="workshop_title">
          {t('workshopsFormPage.steps.basics.workshopTitleLabel')}
          <TextInput
            id="workshop_title"
            type="text"
            placeholder={t('workshopsFormPage.steps.basics.workshopTitlePlaceholder')}
            {...register('workshopTitle')}
          />
        </FieldLabel>
        {resolveFieldErrorMessage('workshopTitle') ? (
          <ErrorText>{resolveFieldErrorMessage('workshopTitle')}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
