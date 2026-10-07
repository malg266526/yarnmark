import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { HallColors } from '../../styles/theme';
import { GRID_COLS, GRID_ROWS } from '../editor/utils/hallGeometry';
import type { HallStand } from './hallStands';

// FIXME: this should be removed once the editor saves stand sizes in a normalized way
const SIZE_MULTIPLIER_FOR_NORMALIZATION = 2;

export interface HallStandBox {
  height: number;
  left: number;
  top: number;
  width: number;
}

const getHallStandBox = (stand: HallStand, multiplier: number): HallStandBox => ({
  height: stand.height * multiplier * SIZE_MULTIPLIER_FOR_NORMALIZATION,
  left: stand.start.col * multiplier,
  top: stand.start.row * multiplier,
  width: stand.width * multiplier * SIZE_MULTIPLIER_FOR_NORMALIZATION
});

const HallMapContainer = styled.div<{ $height: number; $width: number }>`
  position: relative;
  background-color: ${HallColors.empty};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

interface HallMapProps {
  id?: string;
  multiplier: number;
  renderStand: (stand: HallStand, box: HallStandBox) => ReactNode;
  stands: HallStand[];
}

export const HallMap = ({ id, multiplier, renderStand, stands }: HallMapProps) => (
  <HallMapContainer id={id} $width={GRID_COLS * multiplier} $height={GRID_ROWS * multiplier}>
    {stands.map((stand) => renderStand(stand, getHallStandBox(stand, multiplier)))}
  </HallMapContainer>
);
