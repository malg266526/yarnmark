import { Band } from '../../../components/Band';
import { Colors } from '../../../styles/theme';
import { TextWrapper, Title } from '../../../components/Title';
import { WorkshopsSchedule } from './WorkshopsSchedule';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

type WorkshopsScheduleBandType = {
  id: string;
};

export const WorkshopsScheduleBand = ({ id }: WorkshopsScheduleBandType) => {
  const t = useTypedTranslation();

  return (
    <Band
      id={id}
      size="lg"
      variant="background"
      justify="space-between"
      color={Colors.snow}
      padding="xl"
      align="center"
      direction="column">
      <TextWrapper align="center" marginBottom="lg">
        <Title>{t('scheduleBand.title')}</Title>
      </TextWrapper>

      <WorkshopsSchedule />
    </Band>
  );
};
