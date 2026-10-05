import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormBindings } from './workshopFormViewContracts';

const TUTOR_NAME_ERROR_ID = 'workshop-tutor-name-error';
const WORKSHOP_TITLE_ERROR_ID = 'workshop-workshop-title-error';

interface WorkshopFormBasicsSectionProps {
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormBasicsSection = ({ formBindings }: WorkshopFormBasicsSectionProps) => {
  const t = useTypedTranslation();
  const { register, resolveFieldErrorMessage } = formBindings;
  const tutorNameError = resolveFieldErrorMessage('tutorName');
  const workshopTitleError = resolveFieldErrorMessage('workshopTitle');

  return (
    <FormSection $isFirst>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.basics.title')}</Typography>

        <FormField
          htmlFor="tutor_name"
          label={t('workshopsFormPage.steps.basics.tutorNameLabel')}
          requirement="required"
          error={tutorNameError}
          errorId={TUTOR_NAME_ERROR_ID}
        >
          <TextInput
            id="tutor_name"
            data-workshop-form-field="tutorName"
            aria-invalid={Boolean(tutorNameError)}
            aria-describedby={tutorNameError ? TUTOR_NAME_ERROR_ID : undefined}
            type="text"
            placeholder={t('workshopsFormPage.steps.basics.tutorNamePlaceholder')}
            {...register('tutorName')}
          />
        </FormField>

        <FormField
          htmlFor="workshop_title"
          label={t('workshopsFormPage.steps.basics.workshopTitleLabel')}
          requirement="required"
          error={workshopTitleError}
          errorId={WORKSHOP_TITLE_ERROR_ID}
        >
          <TextInput
            id="workshop_title"
            data-workshop-form-field="workshopTitle"
            aria-invalid={Boolean(workshopTitleError)}
            aria-describedby={workshopTitleError ? WORKSHOP_TITLE_ERROR_ID : undefined}
            type="text"
            placeholder={t('workshopsFormPage.steps.basics.workshopTitlePlaceholder')}
            {...register('workshopTitle')}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
