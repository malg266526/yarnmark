import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { HallColors } from '../styles/theme';
import { hallMapConfig, HallStand } from '../assets/hallMapConfig';
import { usePhone } from '../pages/usePhone';
import { HallLogo } from './HallLogo';

const Container = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  padding: ${Spacings.xs};
  background-color: ${HallColors.empty};
  align-self: center;
  width: min-content;
`;

const StandText = styled.h5`
  font-size: 10px;
  text-align: center;
`;

const StandIndex = styled.h4`
  text-align: center;
`;

type Direction = 'row' | 'column';

type Line = {
  width?: number;
  height: number;

  stands: HallStand[];
  direction: Direction;
};

const HallLine = styled.div<{
  direction?: Direction;
  height?: number;
  width?: number;
  alignItems?: 'flex-end' | 'flex-start';
  multiplier: number;
}>`
  display: flex;
  flex: 0;
  flex-direction: ${({ direction }) => direction || 'row'};

  height: ${({ height, multiplier }) => (height ? `${height * multiplier}px` : 'initial')};
  width: ${({ width, multiplier }) => (width ? `${width * multiplier}px` : 'initial')};

  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;

const HallStandLayout = styled.div<{
  width?: number;
  height?: number;
  color?: keyof typeof HallColors;
  multiplier: number;
}>`
  display: flex;
  width: ${({ width, multiplier }) => (width ? `${width * multiplier}px` : 'initial')};
  height: ${({ height, multiplier }) => (height ? `${height * multiplier}px` : 'initial')};

  background-color: ${({ color }) => HallColors[color || 'empty']};
  align-items: center;
  justify-content: space-evenly;

  position: relative;
`;

const HallStandOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ddd;
  opacity: 0.3;
  z-index: 9999999;
`;

export const Hall = () => {
  const isPhone = usePhone();
  const multiplier = isPhone ? 13 : 20;

  return (
    <Container>
      {(hallMapConfig.topRows as Line[]).map((row, index) => (
        <HallLine height={row.height} key={index} multiplier={multiplier}>
          {row.stands.map((stand, index) => (
            <HallStandLayout
              key={index}
              width={stand.width}
              height={stand.height || row.height}
              color={stand.color}
              multiplier={multiplier}>
              {stand.taken && <HallStandOverlay />}

              <div>
                <StandIndex>{stand.index}</StandIndex>
                <StandText>{stand.text}</StandText>
              </div>

              <HallLogo src={stand.logoSrc} />
            </HallStandLayout>
          ))}
        </HallLine>
      ))}

      <HallLine multiplier={multiplier}>
        {(hallMapConfig.middleColumns as Line[]).map((column, index) => (
          <HallLine
            width={column.width}
            key={index}
            direction="column"
            alignItems={index === 5 ? 'flex-end' : 'flex-start'}
            multiplier={multiplier}>
            {column.stands.map((stand, index) => (
              <HallStandLayout
                key={index}
                width={stand.width || column.width}
                height={stand.height}
                color={stand.color}
                multiplier={multiplier}>
                {stand.taken && <HallStandOverlay />}

                <StandIndex>{stand.index}</StandIndex>
                <StandText>{stand.text}</StandText>

                <HallLogo src={stand.logoSrc} />
              </HallStandLayout>
            ))}
          </HallLine>
        ))}
      </HallLine>

      {(hallMapConfig.bottomRows as Line[]).map((row, index) => (
        <HallLine height={row.height} key={index} alignItems="flex-end" multiplier={multiplier}>
          {row.stands.map((stand, index) => (
            <HallStandLayout
              key={index}
              width={stand.width}
              height={stand.height || row.height}
              color={stand.color}
              multiplier={multiplier}>
              {stand.taken && <HallStandOverlay />}

              <StandIndex>{stand.index}</StandIndex>
              <StandText>{stand.text}</StandText>

              <HallLogo src={stand.logoSrc} />
            </HallStandLayout>
          ))}
        </HallLine>
      ))}
    </Container>
  );
};
