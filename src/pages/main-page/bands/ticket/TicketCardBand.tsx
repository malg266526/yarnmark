import React from 'react';
import { Band } from '../../../../components/bands/Band';
import { TicketCard } from './TicketCard';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../../styles/spacings';
import { Typography } from '../../../../components/Typography';

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${RedesignSpacings.xxl};
  justify-content: center;
`;

const TicketCardWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TicketOrderDescription = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  max-width: 40%;
  gap: ${RedesignSpacings.sm};
`;

const TicketOrderTypography = styled(Typography)`
  line-height: ${RedesignSpacings.lg};
`;

export const TicketCardBand = () => {
  const t = useTypedTranslation();

  return (
    <Band.NarrowColumn id="ticketBand" color="white" gap="sm">
      <Band.Title>{t('tickets.yarnmarkTickets')}</Band.Title>

      <Content>
        <TicketCardWrapper>
          <TicketCard />
        </TicketCardWrapper>

        <TicketOrderDescription>
          <TicketOrderTypography size="md">{t('tickets.whereToBuy')}</TicketOrderTypography>
          <TicketOrderTypography size="md">{t('tickets.ticketsStart')}</TicketOrderTypography>

          <TicketOrderTypography size="md">{t('tickets.keepYourEmail')}</TicketOrderTypography>
          <TicketOrderTypography size="md">{t('tickets.proofOfPurchase')}</TicketOrderTypography>
          <TicketOrderTypography size="md">{t('tickets.onlineDeadline')}</TicketOrderTypography>
          <TicketOrderTypography size="md">{t('tickets.availability')}</TicketOrderTypography>
        </TicketOrderDescription>
      </Content>
    </Band.NarrowColumn>
  );
};
