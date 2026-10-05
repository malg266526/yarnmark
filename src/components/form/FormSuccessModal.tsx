import React, { type ReactNode } from 'react';
import { CtaButton } from '../Button';
import {
  SUCCESS_MODAL_OVERLAY_CLASS_NAME,
  SuccessModalActions,
  SuccessModalLayout,
  SuccessModalOverlayStyles
} from './FormSuccessModal.styled';

interface FormSuccessModalProps {
  isOpen: boolean;
  contentLabel: string;
  confirmLabel: string;
  onConfirm: () => void;
  children: ReactNode;
}

export const FormSuccessModal = ({
  isOpen,
  contentLabel,
  confirmLabel,
  onConfirm,
  children
}: FormSuccessModalProps) => (
  <>
    <SuccessModalOverlayStyles />
    <SuccessModalLayout
      isOpen={isOpen}
      contentLabel={contentLabel}
      overlayClassName={SUCCESS_MODAL_OVERLAY_CLASS_NAME}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onConfirm}
      ariaHideApp={false}
    >
      {children}

      <SuccessModalActions>
        <CtaButton type="button" onClick={onConfirm}>
          {confirmLabel}
        </CtaButton>
      </SuccessModalActions>
    </SuccessModalLayout>
  </>
);
