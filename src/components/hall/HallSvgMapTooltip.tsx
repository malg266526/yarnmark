import React from 'react';
import { HallSvgMapTooltipArrow, HallSvgMapTooltipBubble } from './HallSvgMapTooltip.styled';
import type { HallSvgMapTooltipPosition } from './hallSvgMapUtils';

interface HallSvgMapTooltipProps {
  text: string;
  position: HallSvgMapTooltipPosition;
}

export const HallSvgMapTooltip = ({ text, position }: HallSvgMapTooltipProps) => (
  <HallSvgMapTooltipBubble
    $align={position.align}
    $placement={position.placement}
    style={{ left: `${position.leftPercent}%`, top: `${position.topPercent}%` }}
  >
    {text}
    <HallSvgMapTooltipArrow $align={position.align} $placement={position.placement} />
  </HallSvgMapTooltipBubble>
);
