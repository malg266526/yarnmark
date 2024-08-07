import { WorkshopsSchedule } from './WorkshopsSchedule';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../styles/spacings';

type WorkshopsScheduleBandType = {
  id: string;
};

const TitleWrapper = styled.div`
  margin-bottom: ${RedesignSpacings.md};
`;

export const WorkshopsScheduleBand = ({ id }: WorkshopsScheduleBandType) => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn
      id={id}
      size="lg"
      justify="space-between"
      color={BackgroundColors.secondary}
      padding="xl"
      gap="none">
      <TitleWrapper>
        <Band.Title>{t('scheduleBand.title')}</Band.Title>
      </TitleWrapper>

      <WorkshopsSchedule />
    </Band.CenteredColumn>
  );
};
