import { useNewVendorSoundSetting } from './useNewVendorSoundSetting';
import { useNewVendorSoundVariantSetting } from './useNewVendorSoundVariantSetting';
import { playNewVendorSound } from '../newVendorSoundPlayer';
import type { NewVendorSoundVariant } from '../adminSettingsConstants';

export const useAdminSettings = () => {
  const [isNewVendorSoundEnabled, setNewVendorSoundEnabled] = useNewVendorSoundSetting();
  const [newVendorSoundVariant, setNewVendorSoundVariant] = useNewVendorSoundVariantSetting();

  const playSoundVariant = (variant: NewVendorSoundVariant) => void playNewVendorSound(variant);

  return {
    isNewVendorSoundEnabled,
    newVendorSoundVariant,
    playSoundVariant,
    setNewVendorSoundEnabled,
    setNewVendorSoundVariant
  };
};
