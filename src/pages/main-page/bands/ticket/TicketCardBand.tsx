import React from 'react';
import { Band } from '../../../../components/bands/Band';
import { TicketCard } from './TicketCard';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../../styles/spacings';
import { Typography } from '../../../../components/Typography';
import { ScreenSize } from '../../../../styles/screeen-size';
import { useTablet } from '../../../../hooks/usePhone';
import { TicketsToggles } from '../../../../toggles';
import { Trans } from 'react-i18next';
import { TextColors } from '../../../../styles/theme';

const YARNMARK_INSTAGRAM_URL = 'https://www.instagram.com/yarnmark.krk/';

const InstagramLink = styled.a`
  color: ${TextColors.accent};
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${RedesignSpacings.xxl};
  justify-content: center;

  @media (max-width: ${ScreenSize.tablet}) {
    flex-direction: column;
    gap: ${RedesignSpacings.md};
  }
`;

const TicketCardWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${ScreenSize.tablet}) {
    justify-content: center;
  }
`;

const TicketOrderDescription = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  max-width: 40%;
  gap: ${RedesignSpacings.sm};

  @media (max-width: ${ScreenSize.tablet}) {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const TicketOrderTypography = styled(Typography)`
  line-height: ${RedesignSpacings.lg};
`;

export const TicketCardBand = () => {
  const t = useTypedTranslation();
  const isTablet = useTablet();

  return (
    <Band.NarrowColumn id="ticketBand" color="white" gap="sm" padding={isTablet ? 'lg' : 'xxl'}>
      <Band.Title>{t('tickets.yarnmarkTickets')}</Band.Title>

      <Content>
        <TicketCardWrapper>
          <TicketCard />
        </TicketCardWrapper>

        <TicketOrderDescription>
          {TicketsToggles.enabled ? (
            <>
              <TicketOrderTypography size="md">{t('tickets.whereToBuy')}</TicketOrderTypography>

              <TicketOrderTypography size="md">{t('tickets.keepYourEmail')}</TicketOrderTypography>
              <TicketOrderTypography size="md">{t('tickets.proofOfPurchase')}</TicketOrderTypography>
              <TicketOrderTypography size="md">{t('tickets.onlineDeadline')}</TicketOrderTypography>
              <TicketOrderTypography size="md">{t('tickets.gadgetGuaranteed')}</TicketOrderTypography>

              <TicketOrderTypography size="md">{t('tickets.availability')}</TicketOrderTypography>
            </>
          ) : (
            <TicketOrderTypography size="md">
              <Trans
                i18nKey="tickets.currentlyUnavailable"
                components={[
                  <InstagramLink
                    key="instagram_url"
                    href={YARNMARK_INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="instagram"
                  />
                ]}
              />
            </TicketOrderTypography>
          )}
        </TicketOrderDescription>
      </Content>
    </Band.NarrowColumn>
  );
};
