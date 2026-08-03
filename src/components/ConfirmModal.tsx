import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { RedesignSpacings } from '../styles/spacings';
import { DropShadow } from '../styles/cards';
import { BackgroundColors, TextColors } from '../styles/theme';
import { CtaButton } from './Button';
import { GhostButton } from './GhostButton';
import { Typography } from './Typography';
import { useTypedTranslation } from '../translations/useTypedTranslation';

type ConfirmVariant = 'danger' | 'primary';

const ConfirmModalLayout = styled(Modal)`
  display: flex;
  flex-direction: column;
  width: 440px;
  max-width: 90vw;
  margin: auto;
  padding: ${RedesignSpacings.md};
  gap: ${RedesignSpacings.sm};
  background-color: white;
  border-radius: 18px;
  box-shadow: ${DropShadow.md};
  border: none;
  outline: none;
  overflow: auto;
`;

const ConfirmMessage = styled(Typography)`
  color: ${TextColors.primary};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${RedesignSpacings.xs};
`;

const ConfirmButton = styled(CtaButton)<{ variant: ConfirmVariant }>`
  background-color: ${({ variant }) => (variant === 'danger' ? TextColors.accent : BackgroundColors.green.strong)};

  &:focus-visible {
    outline: 2px solid ${TextColors.primary};
    outline-offset: 2px;
  }
`;

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  message,
  title,
  confirmLabel,
  cancelLabel,
  variant = 'danger',
  onConfirm,
  onCancel
}: ConfirmModalProps) => {
  const t = useTypedTranslation();

  return (
    <ConfirmModalLayout
      isOpen={isOpen}
      contentLabel={title ?? message}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onCancel}
      ariaHideApp={false}
      style={{
        overlay: {
          display: 'flex',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      {title && (
        <Typography size="lg" weight="bold">
          {title}
        </Typography>
      )}

      <ConfirmMessage size="md">{message}</ConfirmMessage>

      <Actions>
        <GhostButton onClick={onCancel}>{cancelLabel ?? t('confirmModal.cancel')}</GhostButton>

        <ConfirmButton variant={variant} onClick={onConfirm}>
          {confirmLabel ?? t('confirmModal.confirm')}
        </ConfirmButton>
      </Actions>
    </ConfirmModalLayout>
  );
};
