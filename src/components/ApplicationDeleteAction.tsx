import React, { useState } from 'react';
import { CtaButton } from './Button';
import { ConfirmModal } from './ConfirmModal';

interface ApplicationDeleteActionProps {
  buttonLabel: string;
  cancelLabel: string;
  confirmLabel: string;
  confirmationMessage: string;
  confirmationTitle: string;
  deleting: boolean;
  deletingLabel: string;
  onDelete: () => Promise<void>;
}

export const ApplicationDeleteAction = ({
  buttonLabel,
  cancelLabel,
  confirmLabel,
  confirmationMessage,
  confirmationTitle,
  deleting,
  deletingLabel,
  onDelete
}: ApplicationDeleteActionProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  return (
    <>
      <CtaButton type="button" disabled={deleting} onClick={() => setIsConfirmationOpen(true)}>
        {deleting ? deletingLabel : buttonLabel}
      </CtaButton>
      <ConfirmModal
        isOpen={isConfirmationOpen}
        title={confirmationTitle}
        message={confirmationMessage}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onCancel={() => setIsConfirmationOpen(false)}
        onConfirm={() => {
          setIsConfirmationOpen(false);
          void onDelete();
        }}
      />
    </>
  );
};
