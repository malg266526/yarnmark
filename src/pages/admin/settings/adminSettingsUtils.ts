import {
  DEFAULT_NEW_VENDOR_SOUND_VARIANT,
  NEW_VENDOR_SOUND_VARIANTS,
  type NewVendorSoundVariant
} from './adminSettingsConstants.ts';

export const parseStoredNewVendorSoundSetting = (rawValue: string): boolean => JSON.parse(rawValue) === true;

const isNewVendorSoundVariant = (value: unknown): value is NewVendorSoundVariant =>
  NEW_VENDOR_SOUND_VARIANTS.some((variant) => variant === value);

export const parseStoredNewVendorSoundVariant = (rawValue: string): NewVendorSoundVariant => {
  const value: unknown = JSON.parse(rawValue);

  return isNewVendorSoundVariant(value) ? value : DEFAULT_NEW_VENDOR_SOUND_VARIANT;
};
