import { WorkshopsSchedule } from './WorkshopsSchedule';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';

type WorkshopsScheduleBandType = {
  id: string;
};

export const WorkshopsScheduleBand = ({ id }: WorkshopsScheduleBandType) => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn id={id} size="lg" justify="space-between" color={BackgroundColors.secondary} padding="xl">
      <Band.Title>{t('scheduleBand.title')}</Band.Title>

      <WorkshopsSchedule />
    </Band.CenteredColumn>
  );
};
