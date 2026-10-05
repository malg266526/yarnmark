import React from 'react';
import { CtaButton } from '../../../../components/Button';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  SUCCESS_MODAL_OVERLAY_CLASS_NAME,
  SuccessModalActions,
  SuccessModalLayout,
  SuccessModalOverlayStyles
} from '../VendorFormPage.styled';
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
    <>
      <SuccessModalOverlayStyles />
      <SuccessModalLayout
        isOpen={isOpen}
        contentLabel={t('vendorsFormPage.summary.title')}
        overlayClassName={SUCCESS_MODAL_OVERLAY_CLASS_NAME}
        shouldCloseOnOverlayClick={true}
        onRequestClose={onConfirm}
        ariaHideApp={false}
      >
        <VendorFormSummary formBindings={formBindings} formStatus={formStatus} />

        <SuccessModalActions>
          <CtaButton type="button" onClick={onConfirm}>
            {t('vendorsFormPage.summary.confirm')}
          </CtaButton>
        </SuccessModalActions>
      </SuccessModalLayout>
    </>
  );
};
