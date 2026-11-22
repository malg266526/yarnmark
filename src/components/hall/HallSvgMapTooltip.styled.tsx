import styled, { css } from 'styled-components';
import { DropShadow } from '../../styles/cards';
import { FontSize } from '../../styles/font-size';
import { BorderColors, Colors, FontFamilies, TextColors } from '../../styles/theme';
import type { HallSvgMapTooltipAlign, HallSvgMapTooltipPlacement } from './hallSvgMapUtils';

export const HALL_SVG_MAP_TOOLTIP_ARROW_SIZE = 10;
export const HALL_SVG_MAP_TOOLTIP_ARROW_INSET = 18;
export const HALL_SVG_MAP_TOOLTIP_GAP = 6;
export const HALL_SVG_MAP_TOOLTIP_MAX_WIDTH = 220;
export const HALL_SVG_MAP_TOOLTIP_RADIUS = 8;
export const HALL_SVG_MAP_TOOLTIP_BORDER_WIDTH = 1;
export const HALL_SVG_MAP_TOOLTIP_PADDING_BLOCK = 6;
export const HALL_SVG_MAP_TOOLTIP_PADDING_INLINE = 12;
export const HALL_SVG_MAP_TOOLTIP_QUESTRIAL_FONT_CORRECTION = 0.6;

const arrowOffset = HALL_SVG_MAP_TOOLTIP_ARROW_SIZE / 2;
const verticalShift = HALL_SVG_MAP_TOOLTIP_GAP + arrowOffset;
const paddingTop = HALL_SVG_MAP_TOOLTIP_PADDING_BLOCK + HALL_SVG_MAP_TOOLTIP_QUESTRIAL_FONT_CORRECTION;
const paddingBottom = HALL_SVG_MAP_TOOLTIP_PADDING_BLOCK - HALL_SVG_MAP_TOOLTIP_QUESTRIAL_FONT_CORRECTION;
const arrowInsetFromPaddingBox = HALL_SVG_MAP_TOOLTIP_ARROW_INSET - HALL_SVG_MAP_TOOLTIP_BORDER_WIDTH;

const translateXByAlign: Record<HallSvgMapTooltipAlign, string> = {
  start: `-${HALL_SVG_MAP_TOOLTIP_ARROW_INSET}px`,
  center: '-50%',
  end: `calc(-100% + ${HALL_SVG_MAP_TOOLTIP_ARROW_INSET}px)`
};

const translateYByPlacement: Record<HallSvgMapTooltipPlacement, string> = {
  above: `calc(-100% - ${verticalShift}px)`,
  below: `${verticalShift}px`
};

const arrowLeftByAlign: Record<HallSvgMapTooltipAlign, string> = {
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

export const HallSvgMapTooltipBubble = styled.div<{
  $align: HallSvgMapTooltipAlign;
  $placement: HallSvgMapTooltipPlacement;
}>`
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  width: max-content;
  max-width: ${HALL_SVG_MAP_TOOLTIP_MAX_WIDTH}px;
  padding: ${paddingTop}px ${HALL_SVG_MAP_TOOLTIP_PADDING_INLINE}px ${paddingBottom}px;
  border: ${HALL_SVG_MAP_TOOLTIP_BORDER_WIDTH}px solid ${BorderColors.subtleGreen};
  border-radius: ${HALL_SVG_MAP_TOOLTIP_RADIUS}px;
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

export const HallSvgMapTooltipArrow = styled.span<{
  $align: HallSvgMapTooltipAlign;
  $placement: HallSvgMapTooltipPlacement;
}>`
  position: absolute;
  left: ${({ $align }) => arrowLeftByAlign[$align]};
  box-sizing: border-box;
  width: ${HALL_SVG_MAP_TOOLTIP_ARROW_SIZE}px;
  height: ${HALL_SVG_MAP_TOOLTIP_ARROW_SIZE}px;
  border: ${HALL_SVG_MAP_TOOLTIP_BORDER_WIDTH}px solid ${BorderColors.subtleGreen};
  background: ${Colors.white};
  transform: translate(-50%, ${({ $placement }) => ($placement === 'above' ? '-50%' : '50%')}) rotate(45deg);
  ${({ $placement }) => ($placement === 'above' ? arrowAboveStyles : arrowBelowStyles)}
`;
