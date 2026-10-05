import styled, { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal';
import { DropShadow, Radius } from '../../styles/cards';
import { RedesignSpacings } from '../../styles/spacings';
import { Colors } from '../../styles/theme';

export const SuccessModalLayout = styled(Modal)`
  display: flex;
  flex-direction: column;
  width: 720px;
  max-width: 90vw;
  max-height: 90vh;
  margin: auto;
  padding: ${RedesignSpacings.md};
  gap: ${RedesignSpacings.md};
  background: ${Colors.white};
  border: none;
  border-radius: ${Radius.xl};
  box-shadow: ${DropShadow.md};
  outline: none;
  overflow: auto;
`;

export const SUCCESS_MODAL_OVERLAY_CLASS_NAME = 'form-success-modal-overlay';

export const SuccessModalOverlayStyles = createGlobalStyle`
  .${SUCCESS_MODAL_OVERLAY_CLASS_NAME} {
    position: fixed;
    inset: 0;
    display: flex;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const SuccessModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
