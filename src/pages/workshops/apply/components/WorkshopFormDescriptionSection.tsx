import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextArea } from '../WorkshopFormPage.styled';
import { WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH } from '../../../../domain/workshopApplications/workshopFormConstants.ts';
import type { WorkshopFormActions, WorkshopFormBindings } from './workshopFormViewContracts';

const DESCRIPTION_ERROR_ID = 'workshop-description-error';

interface WorkshopFormDescriptionSectionProps {
  formActions: Pick<WorkshopFormActions, 'updateDescription'>;
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormDescriptionSection = ({ formActions, formBindings }: WorkshopFormDescriptionSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const descriptionError = resolveFieldErrorMessage('description');
  const { updateDescription } = formActions;
  const descriptionField = register('description');

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.description.title')}</Typography>
        <FormField
          htmlFor="workshop_description"
          label={t('workshopsFormPage.steps.description.label')}
          requirement="required"
          hint={t('workshopsFormPage.steps.description.limitHint', {
            current: formData.description.length,
            max: WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH
          })}
          error={descriptionError}
          errorId={DESCRIPTION_ERROR_ID}
        >
          <TextArea
            id="workshop_description"
            data-workshop-form-field="description"
            aria-invalid={Boolean(descriptionError)}
            aria-describedby={descriptionError ? DESCRIPTION_ERROR_ID : undefined}
            name={descriptionField.name}
            ref={descriptionField.ref}
            onBlur={descriptionField.onBlur}
            onChange={(event) => updateDescription(event.target.value)}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
