import React from 'react';
import { FormSuccessModal } from '../../../../components/form/FormSuccessModal';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { VendorFormBindings, VendorFormStatusState } from './vendorFormViewContracts';
import { VendorFormSummary } from './VendorFormSummary';

interface VendorFormSuccessModalProps {
  isOpen: boolean;
  formBindings: Pick<VendorFormBindings, 'formData'>;
  formStatus: Pick<VendorFormStatusState, 'submittedAtLabel'>;
  onConfirm: () => void;
}

export const VendorFormSuccessModal = ({
  isOpen,
  formBindings,
  formStatus,
  onConfirm
}: VendorFormSuccessModalProps) => {
  const t = useTypedTranslation();

  return (
    <FormSuccessModal
      isOpen={isOpen}
      contentLabel={t('vendorsFormPage.summary.title')}
      confirmLabel={t('vendorsFormPage.summary.confirm')}
      onConfirm={onConfirm}
    >
      <VendorFormSummary formBindings={formBindings} formStatus={formStatus} />
    </FormSuccessModal>
  );
};
