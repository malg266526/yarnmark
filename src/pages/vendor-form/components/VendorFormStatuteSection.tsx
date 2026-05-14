import React from 'react';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { CheckboxRow, DisclaimerText, ErrorText, Fieldset, FormSection, InlineLink } from '../VendorFormPage.styled';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';

interface VendorFormStatuteSectionProps {
  formActions: Pick<VendorFormActions, 'setAcceptedStatuteValue'>;
  formBindings: VendorFormBindings;
}

export const VendorFormStatuteSection = ({ formActions, formBindings }: VendorFormStatuteSectionProps) => {
  const t = useTypedTranslation();
  const { formData, resolveFieldErrorMessage } = formBindings;
  const { setAcceptedStatuteValue } = formActions;

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.statute.title')}</Typography>
        <CheckboxRow htmlFor="accept_statute">
          <input
            id="accept_statute"
            type="checkbox"
            checked={formData.acceptedStatute}
            onChange={(event) => setAcceptedStatuteValue(event.target.checked)}
          />
          <span>
            {t('vendorsFormPage.steps.statute.prefix')}{' '}
            <InlineLink href="/info-for-vendors-statue">{t('vendorsFormPage.steps.statute.linkLabel')}</InlineLink>
          </span>
        </CheckboxRow>
        <DisclaimerText>{t('vendorsFormPage.steps.statute.complianceHint')}</DisclaimerText>
        {resolveFieldErrorMessage('acceptedStatute') ? (
          <ErrorText>{resolveFieldErrorMessage('acceptedStatute')}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
