import { ScreenSize } from './screeen-size';

export const FontToScreenSize: Record<keyof typeof ScreenSize, string> = {
  pc: '18px',
  smallPc: '16px',
  tablet: '16px',
  phone: '16px'
};
