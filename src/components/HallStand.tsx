import React from 'react';
import styled from 'styled-components';
import { HallStandType } from '../assets/hallMapConfig';
import { usePhone } from '../hooks/usePhone';
import { FontSize } from '../styles/font-size';
import { RedesignSpacings } from '../styles/spacings';
import { Colors, HallColors } from '../styles/theme';
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
  box-shadow: 1px 1px 3px 0 black;
  padding: ${RedesignSpacings.xs};

  opacity: 0;
  transform: scale(0.5) ${wrapperTranslation};
`;

const StandText = styled.h5`
  font-size: ${FontSize.xs};
  text-align: center;
  margin: 0;
`;

const StandIndex = styled.h4`
  text-align: center;
  margin: 0;
  font-size: 14px;
  overflow-wrap: anywhere;

  @media (max-width: ${ScreenSize.phone}) {
    font-size: ${FontSize.xxs};
  }
`;

const HallStandLayout = styled.div<{
  width?: number;
  height?: number;
  color?: keyof typeof HallColors;
  multiplier: number;
  isTaken?: boolean;
}>`
  display: flex;
  flex-direction: ${({ width, height }) => (width && width > (height || 0) ? 'row' : 'column')};

  width: ${({ width, multiplier }) => (width ? `${width * multiplier}px` : 'initial')};
  height: ${({ height, multiplier }) => (height ? `${height * multiplier}px` : 'initial')};

  background-color: ${({ color }) => HallColors[color || 'empty']};
  align-items: center;
  justify-content: space-evenly;

  position: relative;
  filter: ${({ isTaken }) => isTaken && `saturate(0.2) brightness(1.3)`};
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
    <HallStandLayout
      width={stand.width}
      height={stand.height || height}
      color={stand.color}
      multiplier={multiplier}
      isTaken={Boolean(stand.who)}>
      <div>
        <StandIndex>{stand.index}</StandIndex>
        <StandIndex>{stand.who}</StandIndex>
        <StandText>{stand.text}</StandText>
      </div>

      {stand.who && (
        <TextWrapper>
          <KnittingIconOnHover />
          {stand.who}
        </TextWrapper>
      )}
    </HallStandLayout>
  );
};
