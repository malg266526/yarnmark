import React from 'react';
import { Trans } from 'react-i18next';
import { Text } from '../pages/MainPage.styled';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { FlexColumnLayout } from './FlexColumnLayout';
import styled from 'styled-components';
import { Link } from './Link';

const TextH2 = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0;
`;

const LinkWrapper = styled.div`
  margin-left: -8px;
`;

export const CruiseTicket = () => {
  const t = useTypedTranslation();

  return (
    <FlexColumnLayout gap="sm" padding="none" align="flex-start">
      <TextH2>{t('cashmereTicketsBand.tickets')}</TextH2>
      <LinkWrapper>
        <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('cashmereTicketsBand.buyTickets')}</Link>
      </LinkWrapper>

      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        <TextH2>{t('cashmereTicketsBand.map.price')}:</TextH2>
        <Text marginTop="none">129 zł </Text>
        <Text marginTop="none">
          <Trans i18nKey="cashmereTicketsBand.map.priceIncludesYarnmarkTicket" />
        </Text>
      </FlexColumnLayout>
    </FlexColumnLayout>
  );
};
