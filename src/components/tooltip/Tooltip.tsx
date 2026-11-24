import React from 'react';
import { TooltipArrow, TooltipBubble } from './Tooltip.styled';
import type { TooltipPosition } from './tooltipTypes';

interface TooltipProps {
  text: string;
  position: TooltipPosition;
}

export const Tooltip = ({ text, position }: TooltipProps) => (
  <TooltipBubble
    $align={position.align}
    $placement={position.placement}
    style={{ left: `${position.leftPercent}%`, top: `${position.topPercent}%` }}
  >
    {text}
    <TooltipArrow $align={position.align} $placement={position.placement} />
  </TooltipBubble>
);
