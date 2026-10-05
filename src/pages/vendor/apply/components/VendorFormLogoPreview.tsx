import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { LogoActionButton, LogoPreviewImage, LogoPreviewRow } from '../VendorFormPage.styled';

interface VendorFormLogoPreviewProps {
  logoDataUrl: string;
  logoFileName: string | null;
  isDisabled: boolean;
  onChange: () => void;
  onRemove: () => void;
}

export const VendorFormLogoPreview = ({
  logoDataUrl,
  logoFileName,
  isDisabled,
  onChange,
  onRemove
}: VendorFormLogoPreviewProps) => {
  const t = useTypedTranslation();

  return (
    <LogoPreviewRow>
      <LogoPreviewImage src={logoDataUrl} alt={logoFileName ?? t('vendorsFormPage.steps.invoice.logoPreviewAlt')} />
      <LogoActionButton type="button" disabled={isDisabled} onClick={onChange}>
        {t('vendorsFormPage.steps.invoice.logoChange')}
      </LogoActionButton>
      <LogoActionButton type="button" disabled={isDisabled} onClick={onRemove}>
        {t('vendorsFormPage.steps.invoice.logoRemove')}
      </LogoActionButton>
    </LogoPreviewRow>
  );
};
