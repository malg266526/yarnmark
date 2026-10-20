import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { NEW_VENDOR_SOUND_VARIANTS, type NewVendorSoundVariant } from '../adminSettingsConstants';
import {
  SoundPreviewButton,
  SoundVariantFieldset,
  SoundVariantLabel,
  SoundVariantLegend,
  SoundVariantList,
  SoundVariantOption,
  SoundVariantRadio
} from '../AdminSettingsPage.styled';

const SOUND_VARIANT_INPUT_NAME = 'new-vendor-sound-variant';

interface SoundVariantFieldProps {
  selectedVariant: NewVendorSoundVariant;
  onPlay: (variant: NewVendorSoundVariant) => void;
  onSelect: (variant: NewVendorSoundVariant) => void;
}

export const SoundVariantField = ({ selectedVariant, onPlay, onSelect }: SoundVariantFieldProps) => {
  const t = useTypedTranslation();

  return (
    <SoundVariantFieldset>
      <SoundVariantLegend>{t('adminSettingsPage.soundVariant.label')}</SoundVariantLegend>
      <SoundVariantList>
        {NEW_VENDOR_SOUND_VARIANTS.map((variant) => {
          const name = t(`adminSettingsPage.soundVariant.variants.${variant}` as const);

          return (
            <SoundVariantOption key={variant}>
              <SoundVariantLabel>
                <SoundVariantRadio
                  type="radio"
                  name={SOUND_VARIANT_INPUT_NAME}
                  checked={selectedVariant === variant}
                  onChange={() => onSelect(variant)}
                />
                {name}
              </SoundVariantLabel>
              <SoundPreviewButton
                type="button"
                aria-label={t('adminSettingsPage.soundVariant.playLabel', { name })}
                onClick={() => onPlay(variant)}
              >
                {t('adminSettingsPage.soundVariant.play')}
              </SoundPreviewButton>
            </SoundVariantOption>
          );
        })}
      </SoundVariantList>
    </SoundVariantFieldset>
  );
};
