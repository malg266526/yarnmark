import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { CheckboxRow, DisclaimerText, ErrorText, Fieldset, FormSection, InlineLink } from '../VendorFormPage.styled';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';

const ACCEPTED_STATUTE_ERROR_ID = 'vendor-accepted-statute-error';

interface VendorFormStatuteSectionProps {
  formActions: Pick<VendorFormActions, 'setAcceptedStatuteValue'>;
  formBindings: VendorFormBindings;
}

export const VendorFormStatuteSection = ({ formActions, formBindings }: VendorFormStatuteSectionProps) => {
  const t = useTypedTranslation();
  const { formData, resolveFieldErrorMessage } = formBindings;
  const { setAcceptedStatuteValue } = formActions;
  const acceptedStatuteError = resolveFieldErrorMessage('acceptedStatute');

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.statute.title')}</Typography>
        <CheckboxRow htmlFor="accept_statute">
          <input
            id="accept_statute"
            type="checkbox"
            data-vendor-form-field="acceptedStatute"
            aria-invalid={Boolean(acceptedStatuteError)}
            aria-describedby={acceptedStatuteError ? ACCEPTED_STATUTE_ERROR_ID : undefined}
            checked={formData.acceptedStatute}
            onChange={(event) => setAcceptedStatuteValue(event.target.checked)}
          />
          <span>
            {t('vendorsFormPage.steps.statute.prefix')}{' '}
            <InlineLink href="/vendor/statute">{t('vendorsFormPage.steps.statute.linkLabel')}</InlineLink>
          </span>
        </CheckboxRow>
        <DisclaimerText>{t('vendorsFormPage.steps.statute.complianceHint')}</DisclaimerText>
        {acceptedStatuteError ? <ErrorText id={ACCEPTED_STATUTE_ERROR_ID}>{acceptedStatuteError}</ErrorText> : null}
      </Fieldset>
    </FormSection>
  );
};
