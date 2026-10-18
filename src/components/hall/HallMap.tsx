import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { HallColors } from '../../styles/theme';
import { GRID_COLS, GRID_ROWS } from '../editor/utils/hallGeometry';
import type { HallStand } from './hallStands';
import { getHallStandBox, type HallStandBox } from './hallStandBox';

export type { HallStandBox };

const HallMapContainer = styled.div<{ $height: number; $width: number }>`
  position: relative;
  background-color: ${HallColors.empty};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

interface HallMapProps {
  children?: ReactNode;
  id?: string;
  multiplier: number;
  renderStand: (stand: HallStand, box: HallStandBox) => ReactNode;
  stands: HallStand[];
}

export const HallMap = ({ children, id, multiplier, renderStand, stands }: HallMapProps) => (
  <HallMapContainer id={id} $width={GRID_COLS * multiplier} $height={GRID_ROWS * multiplier}>
    {stands.map((stand) => renderStand(stand, getHallStandBox(stand, multiplier)))}
    {children}
  </HallMapContainer>
);
