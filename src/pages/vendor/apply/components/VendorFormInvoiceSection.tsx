import React, { useEffect, useRef } from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
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

const INVOICE_DETAILS_ERROR_ID = 'vendor-invoice-details-error';
const LOGO_ERROR_ID = 'vendor-logo-error';

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
  const logoInputRef = useRef<HTMLInputElement>(null);
  const invoiceDetailsError = resolveFieldErrorMessage('invoiceDetails');
  const logoError = resolveFieldErrorMessage('logoFileName');

  useEffect(() => {
    if (!formData.logoFileName && logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  }, [formData.logoFileName]);

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('vendorsFormPage.steps.invoice.title')}</Typography>
        <FieldLabel htmlFor="invoice_details">
          {t('vendorsFormPage.steps.invoice.detailsLabel')}
          <TextArea
            id="invoice_details"
            data-vendor-form-field="invoiceDetails"
            aria-invalid={Boolean(invoiceDetailsError)}
            aria-describedby={invoiceDetailsError ? INVOICE_DETAILS_ERROR_ID : undefined}
            placeholder={t('vendorsFormPage.steps.invoice.detailsPlaceholder')}
            {...register('invoiceDetails')}
          />
        </FieldLabel>
        {invoiceDetailsError ? <ErrorText id={INVOICE_DETAILS_ERROR_ID}>{invoiceDetailsError}</ErrorText> : null}

        <FieldLabel htmlFor="logo_file">
          {t('vendorsFormPage.steps.invoice.logoLabel')}
          <TextInput
            ref={logoInputRef}
            id="logo_file"
            type="file"
            data-vendor-form-field="logoFileName"
            aria-invalid={Boolean(logoError)}
            aria-describedby={logoError ? LOGO_ERROR_ID : undefined}
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
        {logoError ? <ErrorText id={LOGO_ERROR_ID}>{logoError}</ErrorText> : null}
      </Fieldset>
    </FormSection>
  );
};
