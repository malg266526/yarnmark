import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormFieldError } from '../../../../components/form/FormFieldError';
import { FormFieldHeading } from '../../../../components/form/FormFieldHeading';
import { CheckboxRow, DisclaimerText, Fieldset, FormSection, InlineLink } from '../VendorFormPage.styled';
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
        <FormFieldHeading title={t('vendorsFormPage.steps.statute.title')} requirement="required" />
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
        <FormFieldError id={ACCEPTED_STATUTE_ERROR_ID} message={acceptedStatuteError} />
      </Fieldset>
    </FormSection>
  );
};
