import React from 'react';
import styled from 'styled-components';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { FlexColumnLayout } from './FlexColumnLayout';
import { FontSize } from '../styles/font-size';
import { Typography } from './Typography';
import { usePhone } from '../hooks/usePhone';
import { Trans } from 'react-i18next';

export const TextH2 = styled.h2`
  font-size: ${FontSize.lg};
  font-weight: 600;
  margin-bottom: 0;
`;

export const AfterPartySection = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();
  const sectionTitleSize = isPhone ? 'lg' : 'xl';

  const scheduleKeys = ['entry', 'welcome', 'contests', 'knitting', 'end'] as const;

  return (
    <FlexColumnLayout gap="sm" padding="none" align="flex-start">
      <Typography size={sectionTitleSize} weight="bold">
        {t('after.schedule')}
      </Typography>

      {/* Lista punktów programu */}
      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        {scheduleKeys.map((key) => (
          <Typography key={key} size="sm">
            <Trans i18nKey={`after.scheduleItems.${key}`} />
          </Typography>
        ))}
      </FlexColumnLayout>
    </FlexColumnLayout>
  );
};
