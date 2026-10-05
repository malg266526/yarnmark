import React from 'react';
import { CtaButton } from '../../../../components/Button';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldHint } from '../../../../components/form/FormField.styled';
import { ActionsRow, ActionsSpacer } from '../WorkshopFormPage.styled';
import type { WorkshopFormStatusState } from './workshopFormViewContracts';

interface WorkshopFormSubmissionSectionProps {
  formStatus: Pick<WorkshopFormStatusState, 'draftStatus' | 'isLoadingLogo' | 'isSubmitting' | 'submitError'>;
}

export const WorkshopFormSubmissionSection = ({ formStatus }: WorkshopFormSubmissionSectionProps) => {
  const t = useTypedTranslation();
  const { draftStatus, isLoadingLogo, isSubmitting, submitError } = formStatus;

  return (
    <>
      <FieldHint>{t('workshopsFormPage.draftBanner')}</FieldHint>
      {draftStatus !== 'none' ? (
        <FieldHint role="status">{t(`workshopsFormPage.draftStatus.${draftStatus}` as const)}</FieldHint>
      ) : null}

      {submitError ? <ErrorText>{submitError}</ErrorText> : null}

      <ActionsRow>
        <ActionsSpacer />
        <CtaButton type="submit" disabled={isLoadingLogo || isSubmitting}>
          {isSubmitting ? t('workshopsFormPage.submitting') : t('workshopsFormPage.submit')}
        </CtaButton>
      </ActionsRow>
    </>
  );
};
