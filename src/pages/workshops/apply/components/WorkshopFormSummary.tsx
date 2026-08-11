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
        <dt>{t('workshopsFormPage.summary.phone')}</dt>
        <dd>{formData.phoneNumber}</dd>
        <dt>{t('workshopsFormPage.summary.email')}</dt>
        <dd>{formData.email}</dd>
        <dt>{t('workshopsFormPage.summary.workshopDescription')}</dt>
        <dd>{formData.description}</dd>
      </SummaryList>
    </Fieldset>
  );
};
