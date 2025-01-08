import { Picture } from '../Picture';
import { Typography } from '../Typography';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { BackgroundColors, TextColors } from '../../styles/theme';
import { WorkshopsEntry } from '../../pages/main-page/workshops/workshopsConfig';
import { Ribbon } from './Ribbon';
import { DropShadow, Radius } from '../../styles/cards';
import { CtaButton } from '../Button';
import { useToggle } from '../../hooks/useToggle';
import verticalRibbonIcon from '../../assets/figmaIcons/vertical_ribbon.svg';

const CardLayout = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  flex-direction: ${({ isExpanded }) => (isExpanded ? 'column' : 'row')};

  width: 100%;
  height: ${({ isExpanded }) => (isExpanded ? '201px' : '201px')};

  padding: ${RedesignSpacings.sm};

  gap: 16px;

  border-radius: ${Radius.lg};
  align-items: center;
  position: relative;
  box-shadow: ${DropShadow.sm};

  cursor: pointer;
`;

const InfoSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  gap: ${RedesignSpacings.sm};
  text-align: center;
`;

const VerticalRibbonIcon = styled.div<{ src: string }>`
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;

  height: 100%;

  transform: rotate(180deg);

  color: #fff;
  writing-mode: vertical-rl;
  text-orientation: mixed;

  text-align: center;
`;

const VerticalRibbonTextWrapper = styled.div`
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceInfo = styled.div`
  color: ${TextColors.accent};
`;

interface RibbonCardProps {
  workshop: WorkshopsEntry;
}

export const MobileRibbonCard = ({ workshop }: RibbonCardProps) => {
  const t = useTypedTranslation();
  const [isExpanded, toggle] = useToggle();

  return (
    <CardLayout onClick={toggle} isExpanded={isExpanded}>
      {isExpanded ? (
        <Ribbon color={BackgroundColors.mobileRibbon}>
          <Typography size="sm">{workshop.time}</Typography>
        </Ribbon>
      ) : (
        <VerticalRibbonIcon src={verticalRibbonIcon}>
          <VerticalRibbonTextWrapper>
            <Typography size="sm">{workshop.time}</Typography>
          </VerticalRibbonTextWrapper>
        </VerticalRibbonIcon>
      )}

      <Picture
        picture={{
          fallbackUrl: workshop.picture.fallback,
          sources: workshop.picture.sources
        }}
        alt={t(workshop.topicKey)}
        width={114}
        height={114}
      />

      <InfoSection>
        <Typography size="sm">{t(workshop.topicKey)}</Typography>

        {workshop.isSoldOut ? (
          <PriceInfo>
            <Typography size="sm">{t('workshops.soldOut')}</Typography>
          </PriceInfo>
        ) : (
          <>
            <PriceInfo>
              <Typography size="sm">
                {t('workshops.price')}: {workshop.price}zł
              </Typography>
            </PriceInfo>
          </>
        )}

        <CtaButton
          onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}
          aria-label="open workshops tickets">
          {t('workshops.buyTicket')}
        </CtaButton>
      </InfoSection>
    </CardLayout>
  );
};
