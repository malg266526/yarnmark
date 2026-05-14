import React from 'react';
import { CtaButton } from '../../../components/Button';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { ActionsRow, ActionsSpacer, ErrorText, FieldHint } from '../VendorFormPage.styled';
import { SubmissionDateTimePreview } from './SubmissionDateTimePreview';
import type { VendorFormStatusState } from './vendorFormViewContracts';

interface VendorFormSubmissionSectionProps {
  formStatus: Pick<VendorFormStatusState, 'isSubmitting' | 'submitError'>;
}

export const VendorFormSubmissionSection = ({ formStatus }: VendorFormSubmissionSectionProps) => {
  const t = useTypedTranslation();
  const { isSubmitting, submitError } = formStatus;

  return (
    <>
      <FieldHint>{t('vendorsFormPage.draftBanner')}</FieldHint>

      <SubmissionDateTimePreview />

      {submitError ? <ErrorText>{submitError}</ErrorText> : null}

      <ActionsRow>
        <ActionsSpacer />
        <CtaButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('vendorsFormPage.submitting') : t('vendorsFormPage.submit')}
        </CtaButton>
      </ActionsRow>
    </>
  );
};
