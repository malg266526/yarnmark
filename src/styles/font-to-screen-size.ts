import { ScreenSize } from './screeen-size';

export const FontToScreenSize: Record<keyof typeof ScreenSize, string> = {
  pc: '16px',
  smallPc: '18px',
  tablet: '18px',
  phone: '16px'
};
