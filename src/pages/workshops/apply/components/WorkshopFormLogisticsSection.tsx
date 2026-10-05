import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextArea, TextInput } from '../WorkshopFormPage.styled';
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

        <FormField
          htmlFor="duration"
          label={t('workshopsFormPage.steps.logistics.durationLabel')}
          requirement="required"
          error={resolveFieldErrorMessage('duration')}
        >
          <TextInput
            id="duration"
            type="text"
            placeholder={t('workshopsFormPage.steps.logistics.durationPlaceholder')}
            {...register('duration')}
          />
        </FormField>

        <FormField
          htmlFor="participants_should_bring"
          label={t('workshopsFormPage.steps.logistics.participantsShouldBringLabel')}
          requirement="required"
          error={resolveFieldErrorMessage('participantsShouldBring')}
        >
          <TextArea
            id="participants_should_bring"
            placeholder={t('workshopsFormPage.steps.logistics.participantsShouldBringPlaceholder')}
            {...register('participantsShouldBring')}
          />
        </FormField>

        <FormField
          htmlFor="room_requirements"
          label={t('workshopsFormPage.steps.logistics.roomRequirementsLabel')}
          requirement="optional"
          hint={t('workshopsFormPage.steps.logistics.roomRequirementsHint')}
        >
          <TextArea id="room_requirements" {...register('roomRequirements')} />
        </FormField>

        <FormField
          htmlFor="required_equipment"
          label={t('workshopsFormPage.steps.logistics.requiredEquipmentLabel')}
          requirement="optional"
          hint={t('workshopsFormPage.steps.logistics.requiredEquipmentHint')}
        >
          <TextArea
            id="required_equipment"
            placeholder={t('workshopsFormPage.steps.logistics.requiredEquipmentPlaceholder')}
            {...register('requiredEquipment')}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
