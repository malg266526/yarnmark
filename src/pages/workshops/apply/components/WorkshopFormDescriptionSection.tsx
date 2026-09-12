import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldHint, FieldLabel, Fieldset, FormSection, TextArea } from '../WorkshopFormPage.styled';
import { WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH } from '../../../../domain/workshopApplications/workshopFormConstants.ts';
import type { WorkshopFormActions, WorkshopFormBindings } from './workshopFormViewContracts';

interface WorkshopFormDescriptionSectionProps {
  formActions: Pick<WorkshopFormActions, 'updateDescription'>;
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormDescriptionSection = ({ formActions, formBindings }: WorkshopFormDescriptionSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const { updateDescription } = formActions;
  const descriptionField = register('description');

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.description.title')}</Typography>
        <FieldLabel htmlFor="workshop_description">
          {t('workshopsFormPage.steps.description.label')}
          <TextArea
            id="workshop_description"
            name={descriptionField.name}
            ref={descriptionField.ref}
            onBlur={descriptionField.onBlur}
            onChange={(event) => updateDescription(event.target.value)}
          />
          <FieldHint>
            {t('workshopsFormPage.steps.description.limitHint', {
              current: formData.description.length,
              max: WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH
            })}
          </FieldHint>
        </FieldLabel>
        {resolveFieldErrorMessage('description') ? (
          <ErrorText>{resolveFieldErrorMessage('description')}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
