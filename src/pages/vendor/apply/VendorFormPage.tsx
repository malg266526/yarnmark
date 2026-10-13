import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { VendorFormView } from './components/VendorFormView';
import { useVendorForm } from './hooks/useVendorForm';
import { AdminPageLayout } from '../../admin/AdminPageLayout';
import { LanguageSwitcher } from '../../LanguageSwitcher';

export const VendorFormPage = () => {
  const t = useTypedTranslation();
  const vendorFormViewProps = useVendorForm();

  return (
    <AdminPageLayout
      kicker={t('vendorsFormPage.kicker')}
      title={t('vendorsFormPage.title')}
      actions={<LanguageSwitcher isOpen />}
    >
      <VendorFormView {...vendorFormViewProps} />
    </AdminPageLayout>
  );
};
