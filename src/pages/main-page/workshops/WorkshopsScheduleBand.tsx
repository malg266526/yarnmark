import { WorkshopsSchedule } from './WorkshopsSchedule';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { WorkshopsSchedule2 } from '../../../components/carousels/WorkshopsSchedule2';

type WorkshopsScheduleBandType = {
  id: string;
};

export const WorkshopsScheduleBand = ({ id }: WorkshopsScheduleBandType) => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn
      id={id}
      size="lg"
      justify="space-between"
      color={BackgroundColors.secondary}
      padding="xl"
      gap="lg">
      <Band.Title>{t('scheduleBand.title')}</Band.Title>

      <WorkshopsSchedule2 />

      <WorkshopsSchedule />
    </Band.CenteredColumn>
  );
};
