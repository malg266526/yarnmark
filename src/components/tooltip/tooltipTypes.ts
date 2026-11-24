export type TooltipPlacement = 'above' | 'below';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipPosition {
  leftPercent: number;
  topPercent: number;
  placement: TooltipPlacement;
  align: TooltipAlign;
}
