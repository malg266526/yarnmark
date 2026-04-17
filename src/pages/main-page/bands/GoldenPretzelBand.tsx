import React from 'react';
import { Band } from '../../../components/bands/Band';
import { Typography } from '../../../components/Typography';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Icon as IconifyIcon } from '@iconify/react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

type GoldenPretzelBandType = {
  id: string;
};

export const GoldenPretzelBand = ({ id }: GoldenPretzelBandType) => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn id={id} padding="md" gap="md" color="#FFF8E1" style={{ paddingBottom: '40px' }}>
      <IconifyIcon icon="noto:pretzel" width="80" height="80" />
      <Band.Title>{t('goldenPretzelBand.title')}</Band.Title>
      <FlexColumnLayout padding="none" gap="sm" align="center">
        <Typography size="md" style={{ textAlign: 'center', maxWidth: '600px' }}>
          {t('goldenPretzelBand.paragraph1')}
        </Typography>
        <Typography size="md" style={{ textAlign: 'center', maxWidth: '600px' }}>
          {t('goldenPretzelBand.paragraph2')}
        </Typography>
        <Typography size="md" style={{ textAlign: 'center', maxWidth: '600px' }}>
          {t('goldenPretzelBand.paragraph3')}
        </Typography>
      </FlexColumnLayout>
    </Band.CenteredColumn>
  );
};
