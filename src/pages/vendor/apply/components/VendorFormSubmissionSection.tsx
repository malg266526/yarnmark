import React from 'react';
import { CtaButton } from '../../../../components/Button';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { ErrorText, FieldHint } from '../../../../components/form/FormField.styled';
import { ActionsRow, ActionsSpacer } from '../VendorFormPage.styled';
import type { VendorFormStatusState } from './vendorFormViewContracts';

interface VendorFormSubmissionSectionProps {
  formStatus: Pick<VendorFormStatusState, 'isLoadingLogo' | 'isSubmitting' | 'submitError'>;
}

export const VendorFormSubmissionSection = ({ formStatus }: VendorFormSubmissionSectionProps) => {
  const t = useTypedTranslation();
  const { isLoadingLogo, isSubmitting, submitError } = formStatus;

  return (
    <>
      <FieldHint>{t('vendorsFormPage.draftBanner')}</FieldHint>

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
