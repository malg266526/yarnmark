import { Picture } from '../../../../components/Picture';
import { Typography } from '../../../../components/Typography';
import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import styled from 'styled-components';
import { BackgroundColors, TextColors } from '../../../../styles/theme';
import { WorkshopsEntry } from '../workshopsConfig';
import { Ribbon } from './Ribbon';
import { CtaButton } from '../../../../components/Button';

import { CardLayout } from './CardLayout';
import { WorkshopPrice } from './WorkshopPrice';
import { FontSize } from '../../../../styles/font-size';
import { TextToListFormatter } from '../../../../components/TextToListFormatter';
import { FlexColumnLayout } from '../../../../components/FlexColumnLayout';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const MobileCardLayout = styled(CardLayout)<{ isExpanded?: boolean }>`
  height: unset;
  overflow: hidden;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ isExpanded }) => `auto auto ${isExpanded ? '1fr' : '0fr'} auto`};
  transition: all 200ms ease-in-out;
  gap: 0;

  picture {
    display: flex;
    justify-content: center;
    align-self: center;
  }
`;

const InfoSection = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  text-align: center;
  overflow: hidden;
`;

const SmallCtaButton = styled(CtaButton)`
  font-size: ${FontSize.sm};
`;

const WorkshopSectionTitle = styled(Typography)`
  color: ${TextColors.secondary};
`;

interface RibbonCardProps {
  workshop: WorkshopsEntry;
  onClick: () => void;
  isExpanded: boolean;
}

export const MobileRibbonCard = ({ workshop, onClick, isExpanded }: RibbonCardProps) => {
  const t = useTypedTranslation();

  return (
    <MobileCardLayout onClick={onClick} isExpanded={isExpanded}>
      <Ribbon color={BackgroundColors.mobileRibbon}>
        <Typography size="sm">{workshop.time}</Typography>
        <Typography size="sm">{t(`workshops.room.${workshop.room}`)}</Typography>
      </Ribbon>

      <Picture
        picture={{
          fallbackUrl: workshop.picture.fallback,
          sources: workshop.picture.sources,
        }}
        alt={t(workshop.topicKey)}
        width={106}
        height={106}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />

      <InfoSection id="info-section">
        <FlexColumnLayout padding="none" width="100%" gap="sm">
          <WorkshopSectionTitle size="md">Czego się nauczysz?</WorkshopSectionTitle>
          <Typography size="sm">
            <TextToListFormatter text={workshop.description ? t(workshop.description) : 'Todo'} />
          </Typography>

          {workshop.materials && (
            <>
              <WorkshopSectionTitle size="md">Co przynieść?</WorkshopSectionTitle>
              <Typography size="sm">
                <TextToListFormatter text={t(workshop.materials)} />
              </Typography>
            </>
          )}

          {workshop.aboutMe && (
            <>
              <WorkshopSectionTitle size="md">O prowadzącej:</WorkshopSectionTitle>
              <Typography size="sm">
                <TextToListFormatter text={t(workshop.aboutMe)} />
              </Typography>
            </>
          )}
        </FlexColumnLayout>

        <WorkshopPrice workshop={workshop} />
      </InfoSection>

      <ButtonContainer>
        <SmallCtaButton
          //disabled={workshop.isSoldOut}
          // Todo: add toggle in workshops config
          disabled
          onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}
          aria-label="open workshops tickets"
        >
          {t('workshops.buyTicket')}
        </SmallCtaButton>
      </ButtonContainer>
    </MobileCardLayout>
  );
};
