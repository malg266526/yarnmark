import React from 'react';
import { CtaButton } from '../../../../components/Button';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldHint } from '../../../../components/form/FormField.styled';
import { ActionsRow, ActionsSpacer } from '../WorkshopFormPage.styled';
import { SubmissionDateTimePreview } from './SubmissionDateTimePreview';
import type { WorkshopFormStatusState } from './workshopFormViewContracts';

interface WorkshopFormSubmissionSectionProps {
  formStatus: Pick<WorkshopFormStatusState, 'isSubmitting' | 'submitError'>;
}

export const WorkshopFormSubmissionSection = ({ formStatus }: WorkshopFormSubmissionSectionProps) => {
  const t = useTypedTranslation();
  const { isSubmitting, submitError } = formStatus;

  return (
    <>
      <FieldHint>{t('workshopsFormPage.draftBanner')}</FieldHint>

      <SubmissionDateTimePreview />

      {submitError ? <ErrorText>{submitError}</ErrorText> : null}

      <ActionsRow>
        <ActionsSpacer />
        <CtaButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('workshopsFormPage.submitting') : t('workshopsFormPage.submit')}
        </CtaButton>
      </ActionsRow>
    </>
  );
};
