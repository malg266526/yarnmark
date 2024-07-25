import React from 'react';
import { Band } from '../../components/bands/Band';
import { GrayScale } from '../../styles/theme';
import { Card } from '../../components/Card';
import { Typography } from '../../components/Typography';
import styled from 'styled-components';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { Spacings } from '../../styles/spacings';
import { CtaButton } from '../../components/Button';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

const TicketCard = styled(Card)`
  width: 100%;
  height: 500px;
  padding: 30px 10px;
`;

const TitleWrapper = styled.div`
  padding: ${Spacings.md} 0;
`;

export const TicketBand = () => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn color={GrayScale[100]} id="TicketBand" size="lg" padding="lg">
      <TicketCard>
        <TitleWrapper>
          <Band.Title>Bilet wstepu</Band.Title>
        </TitleWrapper>

        <FlexColumnLayout padding="none" gap="md">
          <Typography size="md">Yarnmark</Typography>
          <Typography size="md">27/04/2024r godz. 10:00</Typography>

          <Typography size="md">Hala 100-lecia KS Cracovia</Typography>
          <Typography size="md">Koszt</Typography>

          <CtaButton>{t('tickets.buyTicket')}</CtaButton>
        </FlexColumnLayout>
      </TicketCard>
    </Band.CenteredColumn>
  );
};
