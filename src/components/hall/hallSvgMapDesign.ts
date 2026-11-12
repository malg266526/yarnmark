import type { HallStand } from './hallStands.ts';

export const HALL_SVG_MAP_STAND_COLORS: Record<HallStand['color'], string> = {
  premium: '#b2d8b7',
  normal1: '#cfe1cf',
  normal2: '#deeadb',
  standC: '#ebf2ea',
  small1: '#bedec2',
  small2: '#d6e6d1',
  taken: '#f2f4f2',
  taken2: '#f2f4f2',
  tech: '#f2f4f2'
};

export const HALL_SVG_MAP_DESIGN = {
  scale: 13,
  padding: 25,
  background: '#ffffff',
  borderRadius: 4,
  standRadius: 5,
  strokeColor: '#8ba38d',
  strokeWidth: 0.5,
  fontFamily: 'Arial',
  indexColor: '#333',
  labelColor: '#444',
  maxFontSize: 13,
  minFontSize: 4.5,
  fontSizeStep: 0.3,
  lineHeightEm: 1.1,
  averageCharWidthEm: 0.55,
  baselineOffsetEm: 0.8
} as const;
