import React from 'react';
import styled from 'styled-components';
import { Text } from '../pages/MainPage.styled';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { FlexColumnLayout } from './FlexColumnLayout';
import { Title } from './Title';
import { FontSize } from '../styles/font-size';

export const TextH2 = styled.h2`
  font-size: ${FontSize.lg};
  font-weight: 600;
  margin-bottom: 0;
`;

export const CruiseMap = () => {
  const t = useTypedTranslation();

  return (
    <FlexColumnLayout gap="sm" padding="none" align="flex-start">
      <Title>{t('cashmereTicketsBand.map.startAndStop')}</Title>

      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        <Text marginTop="none">AQUA FUN </Text>
        <Text marginTop="none">Bulwar Czerwieński 172/7</Text>
        <Text marginTop="none">31-069 Kraków</Text>
      </FlexColumnLayout>

      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        <TextH2>{t('cashmereTicketsBand.map.time')}</TextH2>
        <Text marginTop="none">17:00 – 19:00</Text>
      </FlexColumnLayout>

      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        <TextH2>{t('cashmereTicketsBand.map.route')}</TextH2>
        <a href="https://rejsy.krakow.pl/bielany-i-kazimierz/" target="_blank" rel="noreferrer">
          Bielany - Kazimierz
        </a>
      </FlexColumnLayout>
    </FlexColumnLayout>
  );
};
