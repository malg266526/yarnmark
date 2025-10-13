import React from 'react';
import styled from 'styled-components';
import { RowLayout } from './RowLayout';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { RedesignSpacings } from '../styles/spacings';
import { StandColorsMap } from './editor/StandProps';

const LegendRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${RedesignSpacings.sm};
`;

const ColorSample = styled.div<{ color: keyof typeof StandColorsMap }>`
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => StandColorsMap[color] || 'white'};
`;

export const HallLegend = () => {
  const t = useTypedTranslation();

  return (
    <LegendRoot>
      <RowLayout gap="xs">
        <ColorSample color="premium" />
        <p>{t('hallMap.premiumStand')}</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="normal1" />
        <p>{t('hallMap.standardStand')}</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="normal2" />
        <p>{t('hallMap.standardStand')}</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="normal3" />
        <p>{t('hallMap.standard2Stand')}</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="small1" />
        <p>{t('hallMap.miniStand')}</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="small2" />
        <p>{t('hallMap.miniStand')}</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="taken" />
        <p>{t('hallMap.taken')}</p>
      </RowLayout>
    </LegendRoot>
  );
};
