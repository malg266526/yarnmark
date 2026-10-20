import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { DEFAULT_NEW_VENDOR_SOUND_VARIANT, NEW_VENDOR_SOUND_VARIANT_STORAGE_KEY } from '../adminSettingsConstants';
import { parseStoredNewVendorSoundVariant } from '../adminSettingsUtils';

export const useNewVendorSoundVariantSetting = () =>
  useLocalStorage(
    NEW_VENDOR_SOUND_VARIANT_STORAGE_KEY,
    DEFAULT_NEW_VENDOR_SOUND_VARIANT,
    parseStoredNewVendorSoundVariant
  );
