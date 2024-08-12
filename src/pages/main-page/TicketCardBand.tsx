import React from 'react';
import { Band } from '../../components/bands/Band';
import { TicketCard } from './TicketCard';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.xxl};
`;

export const TicketCardBand = () => {
  const t = useTypedTranslation();

  return (
    <Band.NarrowColumn id="ticketBand" color="white" gap="sm">
      <Band.Title>{t('tickets.yarnmarkTickets')}</Band.Title>

      <Content>
        <TicketCard />
      </Content>
    </Band.NarrowColumn>
  );
};
