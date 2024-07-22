import { Band } from '../../../components/Band';
import { Colors } from '../../../styles/theme';
import { WorkshopsSchedule } from './WorkshopsSchedule';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { CenteredParagraph } from '../../../components/CenteredParagraph';
import { BandTitle } from '../../../components/bands/BandTitle';

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
      <CenteredParagraph>
        <BandTitle>{t('scheduleBand.title')}</BandTitle>
      </CenteredParagraph>

      <WorkshopsSchedule />
    </Band>
  );
};
