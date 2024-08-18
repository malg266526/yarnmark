import { Typography } from '../../../components/Typography';
import React from 'react';
import styled from 'styled-components';
import { BackgroundColors, TextColors } from '../../../styles/theme';
import Modal from 'react-modal';
import { RedesignSpacings } from '../../../styles/spacings';
import { DropShadow } from '../../../styles/cards';
import { WorkshopsEntry } from './workshopsConfig';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Picture } from '../../../components/Picture';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { CtaButton } from '../../../components/Button';

const WorkshopModalLayout = styled(Modal)`
  display: flex;

  width: 700px;
  margin: auto;
  padding: ${RedesignSpacings.md};
  background-color: white;
  border-radius: 18px;
  box-shadow: ${DropShadow.md};
  border: none;
  outline: none;
`;

const Beam = styled(FlexColumnLayout)`
  width: 100%;
  border-bottom: 0.5px solid ${BackgroundColors.greenStrong};
  background: ${BackgroundColors.greenStrong};
  color: white;
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  text-align: center;
  gap: ${RedesignSpacings.xs};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PriceInfo = styled.div`
  color: ${TextColors.accent};
`;

interface WorkshopModalProps {
  isOpen: boolean;
  toggle: () => void;
  workshop?: WorkshopsEntry;
}

export const WorkshopModal = ({ isOpen, toggle, workshop }: WorkshopModalProps) => {
  const t = useTypedTranslation();

  if (!workshop) {
    return;
  }

  return (
    <WorkshopModalLayout
      isOpen={isOpen}
      contentLabel="WorkshopModal"
      shouldCloseOnOverlayClick={true}
      onRequestClose={toggle}
      style={{
        overlay: {
          zIndex: 9999
        }
      }}>
      <ModalContent>
        <FlexColumnLayout padding="none" gap="lg" width="100%">
          <Beam>
            <Typography size="lg">{workshop.time}</Typography>
            <Typography size="lg">{t(`workshops.room.${workshop.room}`)}</Typography>
          </Beam>

          <Picture
            picture={{
              fallbackUrl: workshop.picture.fallback,
              sources: workshop.picture.sources
            }}
            alt={t(workshop.topicKey)}
            width={150}
            height={150}
          />

          <Typography size="md">fdfdfdf</Typography>

          <PriceInfo>
            <Typography size="md">
              {t('workshops.price')}: {workshop.price}zł
            </Typography>
          </PriceInfo>

          <CtaButton onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}>
            {t('workshops.buyTicket')}
          </CtaButton>
        </FlexColumnLayout>
      </ModalContent>
    </WorkshopModalLayout>
  );
};
