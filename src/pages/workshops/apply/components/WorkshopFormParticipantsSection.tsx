import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { FormFieldError } from '../../../../components/form/FormFieldError';
import { FormFieldHeading } from '../../../../components/form/FormFieldHeading';
import { Fieldset, FormSection, RadioGroup, RadioOption, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormActions, WorkshopFormBindings } from './workshopFormViewContracts';

const MIN_PARTICIPANTS_ERROR_ID = 'workshop-min-participants-error';
const MAX_PARTICIPANTS_ERROR_ID = 'workshop-max-participants-error';
const EXPERIENCE_LEVEL_ERROR_ID = 'workshop-experience-level-error';

interface WorkshopFormParticipantsSectionProps {
  formActions: Pick<WorkshopFormActions, 'setExperienceLevel' | 'setNumberFieldValue'>;
  formBindings: WorkshopFormBindings;
}

const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced', 'any'] as const;

export const WorkshopFormParticipantsSection = ({
  formActions,
  formBindings
}: WorkshopFormParticipantsSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const minParticipantsError = resolveFieldErrorMessage('minParticipants');
  const maxParticipantsError = resolveFieldErrorMessage('maxParticipants');
  const experienceLevelError = resolveFieldErrorMessage('experienceLevel');
  const { setExperienceLevel, setNumberFieldValue } = formActions;
  const minParticipantsField = register('minParticipants');
  const maxParticipantsField = register('maxParticipants');

  return (
    <>
      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('workshopsFormPage.steps.participants.title')}</Typography>
          <FormField
            htmlFor="min_participants"
            label={t('workshopsFormPage.steps.participants.minLabel')}
            requirement="required"
            error={minParticipantsError}
            errorId={MIN_PARTICIPANTS_ERROR_ID}
          >
            <TextInput
              id="min_participants"
              data-workshop-form-field="minParticipants"
              aria-invalid={Boolean(minParticipantsError)}
              aria-describedby={minParticipantsError ? MIN_PARTICIPANTS_ERROR_ID : undefined}
              type="number"
              min={1}
              name={minParticipantsField.name}
              ref={minParticipantsField.ref}
              onBlur={minParticipantsField.onBlur}
              value={formData.minParticipants ?? ''}
              onChange={(event) =>
                setNumberFieldValue('minParticipants', event.target.value === '' ? null : Number(event.target.value))
              }
            />
          </FormField>

          <FormField
            htmlFor="max_participants"
            label={t('workshopsFormPage.steps.participants.maxLabel')}
            requirement="required"
            error={maxParticipantsError}
            errorId={MAX_PARTICIPANTS_ERROR_ID}
          >
            <TextInput
              id="max_participants"
              data-workshop-form-field="maxParticipants"
              aria-invalid={Boolean(maxParticipantsError)}
              aria-describedby={maxParticipantsError ? MAX_PARTICIPANTS_ERROR_ID : undefined}
              type="number"
              min={1}
              name={maxParticipantsField.name}
              ref={maxParticipantsField.ref}
              onBlur={maxParticipantsField.onBlur}
              value={formData.maxParticipants ?? ''}
              onChange={(event) =>
                setNumberFieldValue('maxParticipants', event.target.value === '' ? null : Number(event.target.value))
              }
            />
          </FormField>
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FormFieldHeading title={t('workshopsFormPage.steps.experienceLevel.title')} requirement="required" />
          <RadioGroup
            role="radiogroup"
            data-workshop-form-field="experienceLevel"
            aria-invalid={Boolean(experienceLevelError)}
            aria-describedby={experienceLevelError ? EXPERIENCE_LEVEL_ERROR_ID : undefined}
          >
            {EXPERIENCE_LEVELS.map((experienceLevel) => (
              <RadioOption key={experienceLevel}>
                <input
                  type="radio"
                  name="experience_level"
                  checked={formData.experienceLevel === experienceLevel}
                  onChange={() => setExperienceLevel(experienceLevel)}
                />
                <span>{t(`workshopsFormPage.steps.experienceLevel.${experienceLevel}` as const)}</span>
              </RadioOption>
            ))}
          </RadioGroup>
          <FormFieldError id={EXPERIENCE_LEVEL_ERROR_ID} message={experienceLevelError} />
        </Fieldset>
      </FormSection>
    </>
  );
};
