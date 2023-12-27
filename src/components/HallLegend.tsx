import React from 'react';
import styled from 'styled-components';
import { RowLayout } from './RowLayout';
import { HallColors } from '../styles/theme';

const LegendRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorSample = styled.div<{ color?: keyof typeof HallColors }>`
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => HallColors[color || 'empty']};
`;

export const HallLegend = () => {
  return (
    <LegendRoot>
      <RowLayout gap="xs">
        <ColorSample color="premium" />
        <p>Miejsce Premium 5x3m</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="normal1" />
        <p>Miejsce Normal 4x2,5m</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="normal2" />
        <p>Miejsce Normal 4x2,5m</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="taken" />
        <p>Miejsce zarezerwowane</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="small1" />
        <p>
          Miejsce Small, <br />
          mniejsze 4x2m
        </p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="small2" />
        <p>
          Miejsce Small, <br />
          mniejsze 4x2m
        </p>
      </RowLayout>
    </LegendRoot>
  );
};
