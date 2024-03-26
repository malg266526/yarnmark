import React from 'react';
import styled, { css } from 'styled-components';
import { HallLightColors, HallStandType } from '../assets/hallMapConfig';
import { usePhone } from '../pages/usePhone';
import { FontSize } from '../styles/font-size';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { KnittingIconOnHover } from './KnittingIconOnHover';
import { ScreenSize } from '../styles/screeen-size';

const wrapperTranslation = `translate(-50%, 0px)`;

const TextWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  top: 4px;
  left: 50%;
  transform-origin: left;
  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);
  background: ${Colors.grayLight};
  border-radius: 4px;
  box-shadow: 1px 1px 3px 0px black;
  padding: ${Spacings.sm};

  opacity: 0;
  transform: scale(0.5) ${wrapperTranslation};
`;

const StandText = styled.h5`
  font-size: ${FontSize.sm};
  text-align: center;
  margin: 0;
`;

const StandIndex = styled.h4`
  text-align: center;
  margin: 0;
  font-size: 10px;
  overflow-wrap: anywhere;

  @media (max-width: ${ScreenSize.phone}) {
    font-size: ${FontSize.xs};
  }
`;

const HallStandOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ddd;
  opacity: 0.2;
  z-index: 9999999;
`;

const hoverStyles = css`
  ${TextWrapper} {
    z-index: 1;
    transform: scale(1) ${wrapperTranslation};
    opacity: 1;
  }
`;

const HallStandLayout = styled.div<{
  width?: number;
  height?: number;
  color?: keyof typeof HallLightColors;
  multiplier: number;
}>`
  display: flex;
  flex-direction: ${({ width, height }) => (width && width > (height || 0) ? 'row' : 'column')};

  width: ${({ width, multiplier }) => (width ? `${width * multiplier}px` : 'initial')};
  height: ${({ height, multiplier }) => (height ? `${height * multiplier}px` : 'initial')};

  background-color: ${({ color }) => HallLightColors[color || 'empty']};
  align-items: center;
  justify-content: space-evenly;

  position: relative;

  &:hover {
    ${hoverStyles};
  }
`;

type HallStandProps = {
  stand: HallStandType;
  height?: number;
  width?: number;
  desktopMultiplier?: number;
};

export const HallStand = ({ stand, height, desktopMultiplier }: HallStandProps) => {
  const isPhone = usePhone();
  const multiplier = isPhone ? 13 : desktopMultiplier || 24;

  return (
    <HallStandLayout width={stand.width} height={stand.height || height} color={stand.color} multiplier={multiplier}>
      {stand.who && <HallStandOverlay />}

      <div>
        <StandIndex>{stand.who}</StandIndex>
        <StandText>{stand.text}</StandText>
      </div>

      {stand.who && (
        <TextWrapper>
          <KnittingIconOnHover />
          {stand.who}
        </TextWrapper>
      )}

      {/*  <HallLogo picture={stand.picture} alt={stand.who} width={stand.extraPicture ? 22 : 36} />
      {stand.extraPicture && <HallLogo picture={stand.extraPicture} alt={stand.who} width={22} />} */}
    </HallStandLayout>
  );
};
