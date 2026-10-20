export const NEW_VENDOR_SOUND_STORAGE_KEY = 'admin-new-vendor-sound';

export const DEFAULT_NEW_VENDOR_SOUND_ENABLED = false;

export const NEW_VENDOR_SOUND_VARIANT_STORAGE_KEY = 'admin-new-vendor-sound-variant';

export const NEW_VENDOR_SOUND_VARIANTS = ['chime', 'melody', 'beeps'] as const;

export type NewVendorSoundVariant = (typeof NEW_VENDOR_SOUND_VARIANTS)[number];

export const DEFAULT_NEW_VENDOR_SOUND_VARIANT: NewVendorSoundVariant = 'chime';
