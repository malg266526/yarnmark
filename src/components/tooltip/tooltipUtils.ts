import type { TooltipAlign } from './tooltipTypes';

export const getTooltipAlignInViewport = (
  anchorCenterX: number,
  viewportWidth: number,
  tooltipMaxWidth: number
): TooltipAlign => {
  const halfWidth = tooltipMaxWidth / 2;

  if (anchorCenterX - halfWidth < 0) {
    return 'start';
  }

  return anchorCenterX + halfWidth > viewportWidth ? 'end' : 'center';
};
