import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Switch } from '../../../components/form/Switch';
import { AdminPageLayout } from '../AdminPageLayout';
import { AdminSettingsPanel } from './AdminSettingsPage.styled';
import { SoundVariantField } from './components/SoundVariantField';
import { useAdminSettings } from './hooks/useAdminSettings';

export const AdminSettingsPage = () => {
  const t = useTypedTranslation();
  const {
    isNewVendorSoundEnabled,
    newVendorSoundVariant,
    playSoundVariant,
    setNewVendorSoundEnabled,
    setNewVendorSoundVariant
  } = useAdminSettings();

  return (
    <AdminPageLayout kicker={t('adminSettingsPage.kicker')} title={t('adminSettingsPage.title')}>
      <AdminSettingsPanel>
        <Switch checked={isNewVendorSoundEnabled} onChange={setNewVendorSoundEnabled}>
          {t('adminSettingsPage.newVendorSound')}
        </Switch>
        <SoundVariantField
          selectedVariant={newVendorSoundVariant}
          onPlay={playSoundVariant}
          onSelect={setNewVendorSoundVariant}
        />
      </AdminSettingsPanel>
    </AdminPageLayout>
  );
};
