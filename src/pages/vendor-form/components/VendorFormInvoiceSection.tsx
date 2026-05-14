import React from 'react';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import {
  DownloadActions,
  ErrorText,
  FieldHint,
  FieldLabel,
  Fieldset,
  FormSection,
  TextArea,
  TextInput
} from '../VendorFormPage.styled';
import type { VendorFormActions, VendorFormBindings, VendorFormStatusState } from './vendorFormViewContracts';

interface VendorFormInvoiceSectionProps {
  formActions: Pick<VendorFormActions, 'updateLogoFile'>;
  formBindings: VendorFormBindings;
  formStatus: Pick<VendorFormStatusState, 'isLoadingLogo'>;
}

export const VendorFormInvoiceSection = ({ formActions, formBindings, formStatus }: VendorFormInvoiceSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const { isLoadingLogo } = formStatus;
  const { updateLogoFile } = formActions;

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.invoice.title')}</Typography>
        <FieldLabel htmlFor="invoice_details">
          {t('vendorsFormPage.steps.invoice.detailsLabel')}
          <TextArea
            id="invoice_details"
            placeholder={t('vendorsFormPage.steps.invoice.detailsPlaceholder')}
            {...register('invoiceDetails')}
          />
        </FieldLabel>

        <FieldLabel htmlFor="logo_file">
          {t('vendorsFormPage.steps.invoice.logoLabel')}
          <TextInput
            id="logo_file"
            type="file"
            accept="image/*"
            disabled={isLoadingLogo}
            onChange={(event) => {
              void updateLogoFile(event.target.files?.[0] ?? null);
            }}
          />
          <FieldHint>
            {isLoadingLogo
              ? t('vendorsFormPage.logoLoading')
              : (formData.logoFileName ?? t('vendorsFormPage.steps.invoice.logoHint'))}
          </FieldHint>
          {formData.logoDataUrl ? (
            <DownloadActions>
              <FieldHint>{t('vendorsFormPage.steps.invoice.logoSavedHint')}</FieldHint>
            </DownloadActions>
          ) : null}
        </FieldLabel>
        {resolveFieldErrorMessage('invoiceDetails', 'logoFileName') ? (
          <ErrorText>{resolveFieldErrorMessage('invoiceDetails', 'logoFileName')}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
