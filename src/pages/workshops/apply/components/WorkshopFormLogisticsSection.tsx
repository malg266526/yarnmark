import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  ErrorText,
  FieldHint,
  FieldLabel,
  Fieldset,
  FormSection,
  TextArea,
  TextInput
} from '../WorkshopFormPage.styled';
import type { WorkshopFormBindings } from './workshopFormViewContracts';

interface WorkshopFormLogisticsSectionProps {
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormLogisticsSection = ({ formBindings }: WorkshopFormLogisticsSectionProps) => {
  const t = useTypedTranslation();
  const { register, resolveFieldErrorMessage } = formBindings;

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.logistics.title')}</Typography>

        <FieldLabel htmlFor="duration">
          {t('workshopsFormPage.steps.logistics.durationLabel')}
          <TextInput
            id="duration"
            type="text"
            placeholder={t('workshopsFormPage.steps.logistics.durationPlaceholder')}
            {...register('duration')}
          />
        </FieldLabel>
        {resolveFieldErrorMessage('duration') ? <ErrorText>{resolveFieldErrorMessage('duration')}</ErrorText> : null}

        <FieldLabel htmlFor="participants_should_bring">
          {t('workshopsFormPage.steps.logistics.participantsShouldBringLabel')}
          <TextArea
            id="participants_should_bring"
            placeholder={t('workshopsFormPage.steps.logistics.participantsShouldBringPlaceholder')}
            {...register('participantsShouldBring')}
          />
        </FieldLabel>
        {resolveFieldErrorMessage('participantsShouldBring') ? (
          <ErrorText>{resolveFieldErrorMessage('participantsShouldBring')}</ErrorText>
        ) : null}

        <FieldLabel htmlFor="room_requirements">
          {t('workshopsFormPage.steps.logistics.roomRequirementsLabel')}
          <TextArea id="room_requirements" {...register('roomRequirements')} />
        </FieldLabel>
        {resolveFieldErrorMessage('roomRequirements') ? (
          <ErrorText>{resolveFieldErrorMessage('roomRequirements')}</ErrorText>
        ) : null}

        <FieldLabel htmlFor="required_equipment">
          {t('workshopsFormPage.steps.logistics.requiredEquipmentLabel')}
          <TextArea
            id="required_equipment"
            placeholder={t('workshopsFormPage.steps.logistics.requiredEquipmentPlaceholder')}
            {...register('requiredEquipment')}
          />
          <FieldHint>{t('workshopsFormPage.steps.logistics.requiredEquipmentHint')}</FieldHint>
        </FieldLabel>
      </Fieldset>
    </FormSection>
  );
};
