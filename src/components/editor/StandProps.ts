export const StandColorsMap = {
  premium: '#4CBB17',
  normal1: '#FFAA33',
  normal2: '#EC5800',
  normal3: '#cc457b',
  small1: '#7897b0',
  small2: '#a0bfd6',
  taken: '#d3d3d3',
  taken2: '#dfdfdf',
  tech: '#e5f6df'
} as const;

export type StandColor = keyof typeof StandColorsMap;

export type StandType = 'premium' | 'mini' | 'standard' | 'other';

export type Coordinate = { row: number; col: number };

export interface StandProps {
  id: string;
  index: string;
  vendor?: string;
  description?: string;
  type: StandType;
  width?: number;
  height?: number;
  color?: StandColor;
  isHorizontal?: boolean;
  start?: Coordinate;
  end?: Coordinate;
}
