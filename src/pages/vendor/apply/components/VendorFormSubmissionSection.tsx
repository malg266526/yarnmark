import React from 'react';
import { CtaButton } from '../../../../components/Button';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldHint } from '../../../../components/form/FormField.styled';
import { ActionsRow, ActionsSpacer } from '../VendorFormPage.styled';
import type { VendorFormStatusState } from './vendorFormViewContracts';

interface VendorFormSubmissionSectionProps {
  formStatus: Pick<VendorFormStatusState, 'draftStatus' | 'isLoadingLogo' | 'isSubmitting' | 'submitError'>;
}

export const VendorFormSubmissionSection = ({ formStatus }: VendorFormSubmissionSectionProps) => {
  const t = useTypedTranslation();
  const { draftStatus, isLoadingLogo, isSubmitting, submitError } = formStatus;

  return (
    <>
      <FieldHint>{t('vendorsFormPage.draftBanner')}</FieldHint>
      {draftStatus !== 'none' ? (
        <FieldHint role="status">{t(`vendorsFormPage.draftStatus.${draftStatus}` as const)}</FieldHint>
      ) : null}

      {submitError ? <ErrorText>{submitError}</ErrorText> : null}

      <ActionsRow>
        <ActionsSpacer />
        <CtaButton type="submit" disabled={isLoadingLogo || isSubmitting}>
          {isSubmitting ? t('vendorsFormPage.submitting') : t('vendorsFormPage.submit')}
        </CtaButton>
      </ActionsRow>
    </>
  );
};
