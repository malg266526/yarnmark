import { Band } from '../../../components/Band';
import { Colors } from '../../../styles/theme';
import { WorkshopsSchedule } from './WorkshopsSchedule';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Typography } from '../../../components/Typography';
import { CenteredParagraph } from '../../../components/CenteredParagraph';

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
        <Typography size="xxl" weight="bold">
          {t('scheduleBand.title')}
        </Typography>
      </CenteredParagraph>

      <WorkshopsSchedule />
    </Band>
  );
};
