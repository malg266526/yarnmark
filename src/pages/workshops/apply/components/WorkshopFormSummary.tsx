import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { Fieldset, SummaryList } from '../WorkshopFormPage.styled';
import type { WorkshopFormBindings, WorkshopFormStatusState } from './workshopFormViewContracts';

interface WorkshopFormSummaryProps {
  formBindings: Pick<WorkshopFormBindings, 'formData'>;
  formStatus: Pick<WorkshopFormStatusState, 'submittedAtLabel'>;
}

export const WorkshopFormSummary = ({ formBindings, formStatus }: WorkshopFormSummaryProps) => {
  const t = useTypedTranslation();
  const { formData } = formBindings;
  const { submittedAtLabel } = formStatus;

  return (
    <Fieldset>
      <Typography size="xl">{t('workshopsFormPage.summary.title')}</Typography>
      <Typography size="md">{t('workshopsFormPage.summary.description')}</Typography>

      <SummaryList>
        <dt>{t('workshopsFormPage.summary.tutorName')}</dt>
        <dd>{formData.tutorName}</dd>
        <dt>{t('workshopsFormPage.summary.workshopTitle')}</dt>
        <dd>{formData.workshopTitle}</dd>
        <dt>{t('workshopsFormPage.summary.submittedAt')}</dt>
        <dd>{submittedAtLabel ?? t('workshopsFormPage.summary.notProvided')}</dd>
        <dt>{t('workshopsFormPage.summary.participants')}</dt>
        <dd>
          {t('workshopsFormPage.summary.participantsRange', {
            min: formData.minParticipants,
            max: formData.maxParticipants
          })}
        </dd>
        <dt>{t('workshopsFormPage.summary.experienceLevel')}</dt>
        <dd>
          {formData.experienceLevel
            ? t(`workshopsFormPage.steps.experienceLevel.${formData.experienceLevel}` as const)
            : t('workshopsFormPage.summary.notProvided')}
        </dd>
        <dt>{t('workshopsFormPage.summary.duration')}</dt>
        <dd>{formData.duration}</dd>
        <dt>{t('workshopsFormPage.summary.workshopDescription')}</dt>
        <dd>{formData.description}</dd>
        <dt>{t('workshopsFormPage.summary.participantsShouldBring')}</dt>
        <dd>{formData.participantsShouldBring}</dd>
        <dt>{t('workshopsFormPage.summary.roomRequirements')}</dt>
        <dd>{formData.roomRequirements}</dd>
        <dt>{t('workshopsFormPage.summary.requiredEquipment')}</dt>
        <dd>{formData.requiredEquipment || t('workshopsFormPage.summary.notProvided')}</dd>
        <dt>{t('workshopsFormPage.summary.grossPricePerParticipant')}</dt>
        <dd>
          {t('workshopsFormPage.summary.grossPricePerParticipantValue', { price: formData.grossPricePerParticipant })}
        </dd>
        <dt>{t('workshopsFormPage.summary.contractType')}</dt>
        <dd>
          {formData.contractType === 'other'
            ? formData.contractTypeOther
            : formData.contractType
              ? t(`workshopsFormPage.steps.contractType.${formData.contractType}` as const)
              : t('workshopsFormPage.summary.notProvided')}
        </dd>
        <dt>{t('workshopsFormPage.summary.logo')}</dt>
        <dd>{formData.logoFileName ?? t('workshopsFormPage.summary.notProvided')}</dd>
        <dt>{t('workshopsFormPage.summary.additionalInfo')}</dt>
        <dd>{formData.additionalInfo || t('workshopsFormPage.summary.notProvided')}</dd>
        <dt>{t('workshopsFormPage.summary.phone')}</dt>
        <dd>{formData.phoneNumber}</dd>
        <dt>{t('workshopsFormPage.summary.email')}</dt>
        <dd>{formData.email}</dd>
      </SummaryList>
    </Fieldset>
  );
};
