import { Typography } from '../../../components/Typography';
import React from 'react';
import styled from 'styled-components';
import { BackgroundColors } from '../../../styles/theme';
import Modal from 'react-modal';
import { RedesignSpacings } from '../../../styles/spacings';

const WorkshopModalLayout = styled(Modal)`
  display: flex;
  background-color: aqua;
  width: 500px;
  height: 500px;
  margin: auto;
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.sm};
`;

const Beam = styled.div`
  border-bottom: 0.5px solid ${BackgroundColors.greenStrong};
  background: ${BackgroundColors.greenStrong};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface WorkshopModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const WorkshopModal = ({ isOpen, toggle }: WorkshopModalProps) => {
  return (
    <WorkshopModalLayout
      isOpen={isOpen}
      contentLabel="WorkshopModal"
      shouldCloseOnOverlayClick={true}
      onRequestClose={toggle}>
      <ModalContent>
        <Beam>ffdfsdf</Beam>
        <Typography size="md">fdfdfdf</Typography>
      </ModalContent>
    </WorkshopModalLayout>
  );
};
