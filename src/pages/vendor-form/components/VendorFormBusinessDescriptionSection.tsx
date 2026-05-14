import React from 'react';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { ErrorText, FieldHint, FieldLabel, Fieldset, FormSection, TextArea } from '../VendorFormPage.styled';
import { VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH } from '../vendorFormConstants.ts';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';

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

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.businessDescription.title')}</Typography>
        <FieldLabel htmlFor="business_description">
          {t('vendorsFormPage.steps.businessDescription.label')}
          <TextArea
            id="business_description"
            name={businessDescriptionField.name}
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
        {resolveFieldErrorMessage('businessDescription') ? (
          <ErrorText>{resolveFieldErrorMessage('businessDescription')}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
