import React from 'react';
import styled from 'styled-components';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { FlexColumnLayout } from './FlexColumnLayout';
import { FontSize } from '../styles/font-size';
import { Typography } from './Typography';
import { usePhone } from '../hooks/usePhone';

export const TextH2 = styled.h2`
  font-size: ${FontSize.lg};
  font-weight: 600;
  margin-bottom: 0;
`;

export const CruiseMap = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();
  const sectionTitleSize = isPhone ? 'lg' : 'xl';

  return (
    <FlexColumnLayout gap="sm" padding="none" align="flex-start">
      <Typography size={sectionTitleSize} weight="bold">
        {t('cashmereTicketsBand.map.startAndStop')}
      </Typography>

      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        <Typography size="sm">AQUA FUN </Typography>
        <Typography size="sm">Bulwar Czerwieński </Typography>
        <Typography size="sm">31-069 Kraków</Typography>
      </FlexColumnLayout>

      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        <Typography size="lg" weight="bold">
          {t('cashmereTicketsBand.map.time')}
        </Typography>
        <Typography size="sm">17:15 – 19:15</Typography>
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
