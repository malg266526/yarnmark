import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { HallColors } from '../styles/theme';
import hallMap from './hallmap.json';
import { usePhone } from '../pages/usePhone';

const Container = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  padding: ${Spacings.xs};
  background-color: ${HallColors.empty};
  align-self: center;
  width: min-content;
`;

type Direction = 'row' | 'column';

type Stand = {
  width: number;
  height?: number;

  color: keyof typeof HallColors;
  logo?: string;
  index?: number;
};

type Line = {
  width?: number;
  height: number;

  stands: Stand[];
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

const HallStand = styled.div<{ width?: number; height?: number; color?: keyof typeof HallColors; multiplier: number }>`
  display: flex;
  width: ${({ width, multiplier }) => (width ? `${width * multiplier}px` : 'initial')};
  height: ${({ height, multiplier }) => (height ? `${height * multiplier}px` : 'initial')};

  background-color: ${({ color }) => HallColors[color || 'empty']};
  align-items: center;
  justify-content: center;
`;

export const Hall = () => {
  const isPhone = usePhone();
  const multiplier = isPhone ? 14 : 20;

  return (
    <Container>
      {(hallMap.topRows as Line[]).map((row, index) => (
        <HallLine height={row.height} key={index} multiplier={multiplier}>
          {row.stands.map((stand, index) => (
            <HallStand key={index} width={stand.width} height={row.height} color={stand.color} multiplier={multiplier}>
              <h4>{stand.index}</h4>
            </HallStand>
          ))}
        </HallLine>
      ))}

      <HallLine multiplier={multiplier}>
        {(hallMap.middleColumns as Line[]).map((column, index) => (
          <HallLine
            width={column.width}
            key={index}
            direction="column"
            alignItems={index === 4 ? 'flex-end' : 'flex-start'}
            multiplier={multiplier}>
            {column.stands.map((stand, index) => (
              <HallStand
                key={index}
                width={stand.width || column.width}
                height={stand.height}
                color={stand.color}
                multiplier={multiplier}>
                <h4>{stand.index}</h4>
              </HallStand>
            ))}
          </HallLine>
        ))}
      </HallLine>

      {(hallMap.bottomRows as Line[]).map((row, index) => (
        <HallLine height={row.height} key={index} alignItems="flex-end" multiplier={multiplier}>
          {row.stands.map((stand, index) => (
            <HallStand
              key={index}
              width={stand.width}
              height={stand.height || row.height}
              color={stand.color}
              multiplier={multiplier}>
              <h4>{stand.index}</h4>
            </HallStand>
          ))}
        </HallLine>
      ))}
    </Container>
  );
};
