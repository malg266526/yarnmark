import React from 'react';
import { Band } from '../../components/bands/Band';
import { BackgroundColors, TextColors } from '../../styles/theme';
import { Card } from '../../components/Card';
import { Typography } from '../../components/Typography';
import styled from 'styled-components';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { RedesignSpacings, Spacings } from '../../styles/spacings';
import { CtaButton } from '../../components/Button';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

const TicketCard = styled(Card)`
  width: 100%;
  height: 500px;
  padding: ${RedesignSpacings.md} ${RedesignSpacings.xs};
  gap: ${RedesignSpacings.md};
  justify-content: center;
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

export const TicketBand = () => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn color={BackgroundColors.ticketBand} id="TicketBand" size="lg" padding="lg">
      <TicketCard>
        <TitleWrapper>
          <Band.Title>Bilet wstepu</Band.Title>
        </TitleWrapper>

        <FlexColumnLayout padding="none" gap="md">
          <TicketTitle size="lg">Yarnmark</TicketTitle>
          <Typography size="sm">27/04/2024r {t('tickets.at')} 10:00</Typography>

          <Typography size="sm">Hala 100-lecia KS Cracovia</Typography>
          <TicketPrice size="md">{t('tickets.price')} 30zl</TicketPrice>

          <CtaButton>{t('tickets.buyTicket')}</CtaButton>
        </FlexColumnLayout>
      </TicketCard>
    </Band.CenteredColumn>
  );
};
