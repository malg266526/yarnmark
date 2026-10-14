import React from 'react';
import { useVendorForm } from '../hooks/useVendorForm';
import { useVendorFormAvailability } from '../hooks/useVendorFormAvailability';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  FormAvailabilityFields,
  FormAvailabilityNotice,
  FormAvailabilityOverlay,
  FormAvailabilityRoot
} from '../VendorFormPage.styled';
import { VendorFormView } from './VendorFormView';

export const VendorForm = () => {
  const t = useTypedTranslation();
  const vendorFormViewProps = useVendorForm();
  const isAvailable = useVendorFormAvailability();

  return (
    <FormAvailabilityRoot>
      <FormAvailabilityFields disabled={!isAvailable} {...(!isAvailable ? { inert: '' } : {})}>
        <VendorFormView {...vendorFormViewProps} />
      </FormAvailabilityFields>
      {!isAvailable ? (
        <FormAvailabilityOverlay>
          <FormAvailabilityNotice role="status">{t('vendorsFormPage.openingNotice')}</FormAvailabilityNotice>
        </FormAvailabilityOverlay>
      ) : null}
    </FormAvailabilityRoot>
  );
};
