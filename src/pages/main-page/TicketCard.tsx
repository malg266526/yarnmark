import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { Typography } from '../../components/Typography';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled, { css } from 'styled-components';
import { Card } from '../../components/Card';
import { RedesignSpacings } from '../../styles/spacings';
import { TextColors } from '../../styles/theme';
import { ScreenSize } from '../../styles/screeen-size';
import { Radius } from '../../styles/cards';
import { FontSize } from '../../styles/font-size';
import { CtaButton } from '../../components/Button';

const TicketCardLayout = styled(Card)`
  width: 376px;
  height: 500px;
  padding: ${RedesignSpacings.md} ${RedesignSpacings.xs};
  gap: ${RedesignSpacings.md};
  justify-content: center;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  padding: ${RedesignSpacings.sm} 0;
`;

const TicketTitle = styled(Typography)`
  color: ${TextColors.secondary};
`;

const TicketPrice = styled(Typography)`
  color: ${TextColors.link};
`;

const ShakeAnimationFrames = css`
  @keyframes shake {
    1% {
      transform: rotate(-7deg);
    }

    2% {
      transform: rotate(7deg);
    }

    3% {
      transform: rotate(-7deg);
    }

    4% {
      transform: rotate(7deg);
    }

    5% {
      transform: rotate(-7deg);
    }

    6% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(0);
    }
  }
`;

const BuyTicketLink = styled(CtaButton)<{ shouldShake?: boolean; disabled?: boolean }>`
  border-radius: ${Radius.xl};
  font-weight: 600;
  font-size: ${FontSize.lg};

  @media (max-width: ${ScreenSize.phone}) {
    font-weight: 400;
    font-size: ${FontSize.md};
  }

  ${ShakeAnimationFrames};

  animation-name: shake;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-play-state: ${({ shouldShake }) => (shouldShake ? 'running' : 'paused')};
`;

export const TicketCard = () => {
  const t = useTypedTranslation();

  const onBuyTicketClicked = () => {
    localStorage.setItem('isBuyLinkVisited', 'true');
    window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank');
  };

  const shouldShake = localStorage.getItem('isBuyLinkVisited') !== 'true';

  return (
    <TicketCardLayout>
      <TitleWrapper>
        <Typography size="xl">{t('tickets.entrance')}</Typography>
      </TitleWrapper>

      <FlexColumnLayout padding="none" gap="md">
        <TicketTitle size="lg">Yarnmark</TicketTitle>

        <BuyTicketLink onClick={onBuyTicketClicked} aria-label="buy_ticket" shouldShake={shouldShake}>
          {/*{t('tickets.buyTicket')}*/}
          {t('tickets.availableSoon')}
        </BuyTicketLink>

        <Typography size="sm">
          26/04/2025r {t('tickets.at')} 10:00 {t('tickets.hours')}
        </Typography>

        <Typography size="sm">Hala 100-lecia KS Cracovia</Typography>
        <TicketPrice size="md">{t('tickets.price')} 30zl</TicketPrice>
      </FlexColumnLayout>
    </TicketCardLayout>
  );
};
