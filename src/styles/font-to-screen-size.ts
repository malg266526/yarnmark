import { ScreenSize } from './screeen-size';

export const FontToScreenSize: Record<keyof typeof ScreenSize, string> = {
  pc: '16px',
  smallPc: '16px',
  tablet: '16px',
  phone: '14px'
};
