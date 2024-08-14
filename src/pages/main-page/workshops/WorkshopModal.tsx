import { Typography } from '../../../components/Typography';
import React from 'react';
import styled from 'styled-components';
import { BackgroundColors } from '../../../styles/theme';
import Modal from 'react-modal';
import { RedesignSpacings } from '../../../styles/spacings';
import { DropShadow } from '../../../styles/cards';
import { ScheduleEntry } from './scheduleConfig';

const WorkshopModalLayout = styled(Modal)`
  display: flex;

  width: 500px;
  height: 500px;
  margin: auto;
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.sm};
  background-color: white;
  border-radius: 18px;
  box-shadow: ${DropShadow.md};
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
  workshop?: ScheduleEntry;
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
