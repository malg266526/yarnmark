import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { VendorForm } from './components/VendorForm';
import { AdminPageLayout } from '../../admin/AdminPageLayout';
import { LanguageSwitcher } from '../../LanguageSwitcher';

export const VendorFormPage = () => {
  const t = useTypedTranslation();

  return (
    <AdminPageLayout
      kicker={t('vendorsFormPage.kicker')}
      title={t('vendorsFormPage.title')}
      actions={<LanguageSwitcher isOpen />}
    >
      <VendorForm />
    </AdminPageLayout>
  );
};
