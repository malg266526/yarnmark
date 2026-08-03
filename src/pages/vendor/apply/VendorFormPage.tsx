import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { VendorFormView } from './components/VendorFormView';
import { useVendorForm } from './hooks/useVendorForm';
import { AdminPageLayout } from '../../admin/AdminPageLayout';

export const VendorFormPage = () => {
  const t = useTypedTranslation();
  const vendorFormViewProps = useVendorForm();

  return (
    <AdminPageLayout kicker={t('vendorsFormPage.kicker')} title={t('vendorsFormPage.title')}>
      <VendorFormView {...vendorFormViewProps} />
    </AdminPageLayout>
  );
};
