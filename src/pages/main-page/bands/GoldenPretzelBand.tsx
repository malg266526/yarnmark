import React from 'react';
import { Band } from '../../../components/bands/Band';
import { Typography } from '../../../components/Typography';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Icon as IconifyIcon } from '@iconify/react';

type GoldenPretzelBandType = {
  id: string;
};

export const GoldenPretzelBand = ({ id }: GoldenPretzelBandType) => {
  return (
    <Band.CenteredColumn id={id} size="md" padding="xl" gap="md" color="#FFF8E1">
      <IconifyIcon icon="noto:pretzel" width="80" height="80" />
      <Band.Title>Konkurs na złotego obwarzanka!</Band.Title>
      <FlexColumnLayout padding="none" gap="sm" align="center">
        <Typography size="md" style={{ textAlign: 'center', maxWidth: '600px' }}>
          Zagłosuj na swojego ulubionego wystawcę, najmocniej doceniony wystawca Yarnmarku 2026 otrzyma złotego
          obwarzanka. Głosowanie będzie trwało do godz. 15, a wyłonienie zwycięzcy o godz. 16:00. Głosowanie odbędzie
          się poprzez wrzucenie losu na urny przy recepcji.
        </Typography>
      </FlexColumnLayout>
    </Band.CenteredColumn>
  );
};
