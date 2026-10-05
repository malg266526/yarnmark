import React from 'react';
import { FormSuccessModal } from '../../../../components/form/FormSuccessModal';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { WorkshopFormBindings, WorkshopFormStatusState } from './workshopFormViewContracts';
import { WorkshopFormSummary } from './WorkshopFormSummary';

interface WorkshopFormSuccessModalProps {
  isOpen: boolean;
  formBindings: Pick<WorkshopFormBindings, 'formData'>;
  formStatus: Pick<WorkshopFormStatusState, 'submittedAtLabel'>;
  onConfirm: () => void;
}

export const WorkshopFormSuccessModal = ({
  isOpen,
  formBindings,
  formStatus,
  onConfirm
}: WorkshopFormSuccessModalProps) => {
  const t = useTypedTranslation();

  return (
    <FormSuccessModal
      isOpen={isOpen}
      contentLabel={t('workshopsFormPage.summary.title')}
      confirmLabel={t('workshopsFormPage.summary.confirm')}
      onConfirm={onConfirm}
    >
      <WorkshopFormSummary formBindings={formBindings} formStatus={formStatus} />
    </FormSuccessModal>
  );
};
