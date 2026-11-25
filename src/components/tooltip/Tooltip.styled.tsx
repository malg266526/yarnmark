import styled, { css } from 'styled-components';
import { DropShadow } from '@/styles/cards';
import { FontSize } from '@/styles/font-size';
import { BorderColors, Colors, FontFamilies, TextColors } from '@/styles/theme';
import type { TooltipAlign, TooltipPlacement } from './tooltipTypes';

export const TOOLTIP_ARROW_SIZE = 10;
export const TOOLTIP_ARROW_INSET = 18;
export const TOOLTIP_GAP = 6;
export const TOOLTIP_MAX_WIDTH = 220;
export const TOOLTIP_RADIUS = 8;
export const TOOLTIP_BORDER_WIDTH = 1;
export const TOOLTIP_PADDING_BLOCK = 6;
export const TOOLTIP_PADDING_INLINE = 12;
export const TOOLTIP_QUESTRIAL_FONT_CORRECTION = 0.6;

const arrowOffset = TOOLTIP_ARROW_SIZE / 2;
const verticalShift = TOOLTIP_GAP + arrowOffset;
const paddingTop = TOOLTIP_PADDING_BLOCK + TOOLTIP_QUESTRIAL_FONT_CORRECTION;
const paddingBottom = TOOLTIP_PADDING_BLOCK - TOOLTIP_QUESTRIAL_FONT_CORRECTION;
const arrowInsetFromPaddingBox = TOOLTIP_ARROW_INSET - TOOLTIP_BORDER_WIDTH;

const translateXByAlign: Record<TooltipAlign, string> = {
  start: `-${TOOLTIP_ARROW_INSET}px`,
  center: '-50%',
  end: `calc(-100% + ${TOOLTIP_ARROW_INSET}px)`
};

const translateYByPlacement: Record<TooltipPlacement, string> = {
  above: `calc(-100% - ${verticalShift}px)`,
  below: `${verticalShift}px`
};

const arrowLeftByAlign: Record<TooltipAlign, string> = {
  start: `${arrowInsetFromPaddingBox}px`,
  center: '50%',
  end: `calc(100% - ${arrowInsetFromPaddingBox}px)`
};

const arrowAboveStyles = css`
  top: 100%;
  border-top: none;
  border-left: none;
`;

const arrowBelowStyles = css`
  bottom: 100%;
  border-bottom: none;
  border-right: none;
`;

export const TooltipBubble = styled.div<{
  $align: TooltipAlign;
  $placement: TooltipPlacement;
}>`
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  width: max-content;
  max-width: ${TOOLTIP_MAX_WIDTH}px;
  padding: ${paddingTop}px ${TOOLTIP_PADDING_INLINE}px ${paddingBottom}px;
  border: ${TOOLTIP_BORDER_WIDTH}px solid ${BorderColors.subtleGreen};
  border-radius: ${TOOLTIP_RADIUS}px;
  background: ${Colors.white};
  box-shadow: ${DropShadow.sm};
  color: ${TextColors.primary};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  line-height: 1.2;
  text-align: center;
  pointer-events: none;
  transform: translate(
    ${({ $align }) => translateXByAlign[$align]},
    ${({ $placement }) => translateYByPlacement[$placement]}
  );
`;

export const TooltipArrow = styled.span<{
  $align: TooltipAlign;
  $placement: TooltipPlacement;
}>`
  position: absolute;
  left: ${({ $align }) => arrowLeftByAlign[$align]};
  box-sizing: border-box;
  width: ${TOOLTIP_ARROW_SIZE}px;
  height: ${TOOLTIP_ARROW_SIZE}px;
  border: ${TOOLTIP_BORDER_WIDTH}px solid ${BorderColors.subtleGreen};
  background: ${Colors.white};
  transform: translate(-50%, ${({ $placement }) => ($placement === 'above' ? '-50%' : '50%')}) rotate(45deg);
  ${({ $placement }) => ($placement === 'above' ? arrowAboveStyles : arrowBelowStyles)}
`;
