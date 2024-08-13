import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { Typography } from '../../components/Typography';
import { CtaButton } from '../../components/Button';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { RedesignSpacings } from '../../styles/spacings';
import { TextColors } from '../../styles/theme';
import { ScreenSize } from '../../styles/screeen-size';
import { Radius } from '../../styles/cards';
import { FontSize } from '../../styles/font-size';

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
  color: ${TextColors.accent};
`;

const TicketPrice = styled(Typography)`
  color: ${TextColors.link};
`;

const Button = styled(CtaButton)`
  border-radius: ${Radius.xl};
  font-weight: 600;
  font-size: ${FontSize.lg};

  @media (max-width: ${ScreenSize.phone}) {
    font-weight: 400;
    font-size: ${FontSize.md};
  }
`;

export const TicketCard = () => {
  const t = useTypedTranslation();

  return (
    <TicketCardLayout>
      <TitleWrapper>
        <Typography size="xl">{t('tickets.entrance')}</Typography>
      </TitleWrapper>

      <FlexColumnLayout padding="none" gap="md">
        <TicketTitle size="lg">Yarnmark</TicketTitle>

        <Button>{t('tickets.buyTicket')}</Button>

        <Typography size="sm">27/04/2024r {t('tickets.at')} 10:00</Typography>

        <Typography size="sm">Hala 100-lecia KS Cracovia</Typography>
        <TicketPrice size="md">{t('tickets.price')} 30zl</TicketPrice>
      </FlexColumnLayout>
    </TicketCardLayout>
  );
};
