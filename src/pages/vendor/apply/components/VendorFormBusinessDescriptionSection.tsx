import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  ErrorText,
  FieldHint,
  FieldLabel,
  FieldLabelText,
  Fieldset,
  FormSection,
  TextArea
} from '../VendorFormPage.styled';
import { VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH } from '../../../../domain/vendorApplications/vendorFormConstants.ts';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';
import { VendorFormFieldRequirement } from './VendorFormFieldRequirement';

const BUSINESS_DESCRIPTION_ERROR_ID = 'vendor-business-description-error';

interface VendorFormBusinessDescriptionSectionProps {
  formActions: Pick<VendorFormActions, 'updateBusinessDescription'>;
  formBindings: VendorFormBindings;
}

export const VendorFormBusinessDescriptionSection = ({
  formActions,
  formBindings
}: VendorFormBusinessDescriptionSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const { updateBusinessDescription } = formActions;
  const businessDescriptionField = register('businessDescription');
  const businessDescriptionError = resolveFieldErrorMessage('businessDescription');

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.businessDescription.title')}</Typography>
        <FieldLabel htmlFor="business_description">
          <FieldLabelText>
            {t('vendorsFormPage.steps.businessDescription.label')}
            <VendorFormFieldRequirement requirement="required" />
          </FieldLabelText>
          <TextArea
            id="business_description"
            name={businessDescriptionField.name}
            data-vendor-form-field="businessDescription"
            aria-invalid={Boolean(businessDescriptionError)}
            aria-describedby={businessDescriptionError ? BUSINESS_DESCRIPTION_ERROR_ID : undefined}
            placeholder={t('vendorsFormPage.steps.businessDescription.placeholder')}
            ref={businessDescriptionField.ref}
            onBlur={businessDescriptionField.onBlur}
            onChange={(event) => updateBusinessDescription(event.target.value)}
          />
          <FieldHint>
            {t('vendorsFormPage.steps.businessDescription.limitHint', {
              current: formData.businessDescription.length,
              max: VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH
            })}
          </FieldHint>
        </FieldLabel>
        {businessDescriptionError ? (
          <ErrorText id={BUSINESS_DESCRIPTION_ERROR_ID}>{businessDescriptionError}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
