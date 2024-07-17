import React from 'react';
import styled from 'styled-components';
import { hallMapConfig, HallStandType } from '../assets/hallMapConfig';
import { usePhone } from '../hooks/usePhone';
import { HallColors } from '../styles/theme';
import { HallStand } from './HallStand';

const Container = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  background-color: ${HallColors.empty};
  align-self: center;
  width: min-content;
`;

type Direction = 'row' | 'column';

type Line = {
  width?: number;
  height: number;

  stands: HallStandType[];
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

type HallType = {
  multiplier?: number;
};

export const Hall = (props: HallType) => {
  const isPhone = usePhone();
  const desktopMultiplier = props.multiplier || 20;
  const multiplier = isPhone ? 13 : desktopMultiplier;

  return (
    <Container>
      {(hallMapConfig.topRows as Line[]).map((row, index) => (
        <HallLine height={row.height} key={index} multiplier={multiplier}>
          {row.stands.map((stand, index) => (
            <HallStand key={index} stand={stand} height={row.height} desktopMultiplier={desktopMultiplier}></HallStand>
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
              <HallStand
                key={index}
                stand={stand}
                width={column.width}
                desktopMultiplier={desktopMultiplier}></HallStand>
            ))}
          </HallLine>
        ))}
      </HallLine>

      {(hallMapConfig.bottomRows as Line[]).map((row, index) => (
        <HallLine height={row.height} key={index} alignItems="flex-end" multiplier={multiplier}>
          {row.stands.map((stand, index) => (
            <HallStand key={index} stand={stand} height={row.height} desktopMultiplier={desktopMultiplier}></HallStand>
          ))}
        </HallLine>
      ))}
    </Container>
  );
};
