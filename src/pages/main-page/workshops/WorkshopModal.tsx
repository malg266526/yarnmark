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
import { Button, CtaButton } from '../../../components/Button';
import { RowLayout } from '../../../components/RowLayout';
import { GhostButton } from '../../../components/GhostButton';
import backIcon from '../../../assets/figmaIcons/back_arrow_icon.svg';
import closeStrokeIcon from '../../../assets/figmaIcons/close_stroke_icon.svg';
import { Icon } from '../../../components/Icon';
import { Trans } from 'react-i18next';

const WorkshopModalLayout = styled(Modal)`
  display: flex;
  width: 800px;
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
  border-bottom: 0.5px solid ${BackgroundColors.green.strong};
  background: ${BackgroundColors.green.strong};
  color: white;
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  text-align: center;
  gap: ${RedesignSpacings.xs};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${RedesignSpacings.xxs};
`;

const PriceInfo = styled.div`
  color: ${TextColors.secondary};
`;

const WorkshopDescription = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const WorkshopSectionTitle = styled(Typography)`
  color: ${TextColors.secondary};
`;

interface WorkshopModalProps {
  isOpen: boolean;
  // toggle: () => void;
  workshop?: WorkshopsEntry;
  close: () => void;
}

export const WorkshopModal = ({ isOpen, workshop, close }: WorkshopModalProps) => {
  const t = useTypedTranslation();

  if (!workshop) {
    return;
  }

  return (
    <WorkshopModalLayout
      isOpen={isOpen}
      contentLabel="WorkshopModal"
      shouldCloseOnOverlayClick={true}
      onRequestClose={close}
      style={{
        overlay: {
          display: 'flex',
          zIndex: 2
        }
      }}>
      <ModalContent>
        <RowLayout wide justify="space-between">
          <GhostButton onClick={close}>
            <Icon size="md" zIndex={0} src={backIcon} />
            <Typography size="md">{t('goBack')}</Typography>
          </GhostButton>

          <Button onClick={close}>
            <Icon size="lg" zIndex={0} src={closeStrokeIcon} />
          </Button>
        </RowLayout>

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

          <WorkshopDescription>
            <FlexColumnLayout padding="none" gap="sm">
              <WorkshopSectionTitle size="md">Czego się nauczysz?</WorkshopSectionTitle>
              <Typography size="md">{workshop.description ? t(workshop.description) : '-'}</Typography>
            </FlexColumnLayout>

            <FlexColumnLayout padding="none" gap="sm">
              <WorkshopSectionTitle size="md">Co przynieść?</WorkshopSectionTitle>
              <Typography size="md">
                <Trans i18nKey={workshop.materials ? t(workshop.materials) : '-'} />
              </Typography>
            </FlexColumnLayout>
          </WorkshopDescription>

          <PriceInfo>
            <Typography size="md">
              {t('workshops.price')}: {workshop.price}zł
            </Typography>
          </PriceInfo>

          <CtaButton
            onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}
            aria-label="open tickets page">
            {t('workshops.buyTicket')}
          </CtaButton>
        </FlexColumnLayout>
      </ModalContent>
    </WorkshopModalLayout>
  );
};
