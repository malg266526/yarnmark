import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { LogoActionButton, LogoPreviewImage, LogoPreviewRow } from './FormField.styled';

interface LogoPreviewProps {
  logoDataUrl: string;
  logoFileName: string | null;
  isDisabled: boolean;
  onChange: () => void;
  onRemove: () => void;
}

export const LogoPreview = ({ logoDataUrl, logoFileName, isDisabled, onChange, onRemove }: LogoPreviewProps) => {
  const t = useTypedTranslation();

  return (
    <LogoPreviewRow>
      <LogoPreviewImage src={logoDataUrl} alt={logoFileName ?? t('formField.logo.previewAlt')} />
      <LogoActionButton type="button" disabled={isDisabled} onClick={onChange}>
        {t('formField.logo.change')}
      </LogoActionButton>
      <LogoActionButton type="button" disabled={isDisabled} onClick={onRemove}>
        {t('formField.logo.remove')}
      </LogoActionButton>
    </LogoPreviewRow>
  );
};
