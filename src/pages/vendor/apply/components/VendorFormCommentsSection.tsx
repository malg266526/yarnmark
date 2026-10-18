import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { Fieldset, FormSection, TextArea } from '../VendorFormPage.styled';
import type { VendorFormBindings } from './vendorFormViewContracts';

interface VendorFormCommentsSectionProps {
  formBindings: VendorFormBindings;
}

export const VendorFormCommentsSection = ({ formBindings }: VendorFormCommentsSectionProps) => {
  const t = useTypedTranslation();

  return (
    <FormSection>
      <Fieldset>
        <FormField htmlFor="vendor_comments" label={t('vendorsFormPage.steps.comments.label')} requirement="optional">
          <TextArea id="vendor_comments" data-vendor-form-field="comments" {...formBindings.register('comments')} />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
