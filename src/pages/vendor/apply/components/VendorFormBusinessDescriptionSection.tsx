import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextArea } from '../VendorFormPage.styled';
import { VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH } from '../../../../domain/vendorApplications/vendorFormConstants.ts';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';

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
        <FormField
          htmlFor="business_description"
          label={t('vendorsFormPage.steps.businessDescription.label')}
          requirement="required"
          error={businessDescriptionError}
          errorId={BUSINESS_DESCRIPTION_ERROR_ID}
          hint={t('vendorsFormPage.steps.businessDescription.limitHint', {
            current: formData.businessDescription.length,
            max: VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH
          })}
        >
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
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
