import styled from 'styled-components';
import { FontSize } from '../../styles/font-size';
import { RedesignSpacings } from '../../styles/spacings';
import { BackgroundColors, Colors, FontFamilies, GrayScale, TextColors } from '../../styles/theme';

export const SWITCH_TRACK_WIDTH_PX = 44;
export const SWITCH_TRACK_HEIGHT_PX = 24;
export const SWITCH_THUMB_INSET_PX = 3;
const SWITCH_THUMB_SIZE_PX = SWITCH_TRACK_HEIGHT_PX - 2 * SWITCH_THUMB_INSET_PX;
const SWITCH_THUMB_TRAVEL_PX = SWITCH_TRACK_WIDTH_PX - SWITCH_THUMB_SIZE_PX - 2 * SWITCH_THUMB_INSET_PX;

export const SwitchLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
  color: ${TextColors.primary};
  cursor: pointer;

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const SwitchInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
`;

export const SwitchTrack = styled.span`
  position: relative;
  box-sizing: border-box;
  flex: 0 0 auto;
  width: ${SWITCH_TRACK_WIDTH_PX}px;
  height: ${SWITCH_TRACK_HEIGHT_PX}px;
  border-radius: ${SWITCH_TRACK_HEIGHT_PX / 2}px;
  background: ${GrayScale[300]};
  transition: background 150ms ease;

  &::after {
    content: '';
    position: absolute;
    top: ${SWITCH_THUMB_INSET_PX}px;
    left: ${SWITCH_THUMB_INSET_PX}px;
    width: ${SWITCH_THUMB_SIZE_PX}px;
    height: ${SWITCH_THUMB_SIZE_PX}px;
    border-radius: 50%;
    background: ${Colors.white};
    transition: transform 150ms ease;
  }

  ${SwitchInput}:checked + & {
    background: ${BackgroundColors.green.strong};
  }

  ${SwitchInput}:checked + &::after {
    transform: translateX(${SWITCH_THUMB_TRAVEL_PX}px);
  }

  ${SwitchInput}:focus-visible + & {
    outline: 2px solid ${BackgroundColors.green.strong};
    outline-offset: 2px;
  }
`;
