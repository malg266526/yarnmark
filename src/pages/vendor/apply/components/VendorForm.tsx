import React from 'react';
import { useVendorForm } from '../hooks/useVendorForm';
import { VendorFormView } from './VendorFormView';

export const VendorForm = () => {
  const vendorFormViewProps = useVendorForm();

  return <VendorFormView {...vendorFormViewProps} />;
};
