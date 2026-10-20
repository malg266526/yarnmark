import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { DEFAULT_NEW_VENDOR_SOUND_ENABLED, NEW_VENDOR_SOUND_STORAGE_KEY } from '../adminSettingsConstants';
import { parseStoredNewVendorSoundSetting } from '../adminSettingsUtils';

export const useNewVendorSoundSetting = () =>
  useLocalStorage(NEW_VENDOR_SOUND_STORAGE_KEY, DEFAULT_NEW_VENDOR_SOUND_ENABLED, parseStoredNewVendorSoundSetting);
