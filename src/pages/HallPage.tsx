import React from 'react';
import { PageContent } from '../components/PageContent';
import { Colors } from '../styles/theme';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { Spacings } from '../styles/spacings';
import hallMap from './hallmap.json';

const HallColors = {
  premium: '#EC5800', //  Persimmon
  normal: '#FFAA33', //Yellow Orange
  taken: Colors.pinball,
  empty: 'white'
};

const SIZE_MULTIPLIER = 20;

export const Container = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  padding: ${Spacings.xs};
  background-color: #eefdec;
  align-self: center;
  width: min-content;
`;

type Stand = {
  width: number;
  height?: number;

  color: keyof typeof HallColors;
  logo?: string;
  index?: number;
};

type Direction = 'row' | 'column';

type Line = {
  width?: number;
  height: number;

  stands: Stand[];
  direction: Direction;
};

export const HallLine = styled.div<{
  direction?: Direction;
  height?: number;
  width?: number;
  alignItems?: 'flex-end' | 'flex-start';
}>`
  display: flex;
  flex: 0;
  flex-direction: ${({ direction }) => direction || 'row'};

  height: ${({ height }) => (height ? `${height * SIZE_MULTIPLIER}px` : 'initial')};
  width: ${({ width }) => (width ? `${width * SIZE_MULTIPLIER}px` : 'initial')};

  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;

export const HallStand = styled.div<{ width?: number; height?: number; color?: keyof typeof HallColors }>`
  width: ${({ width }) => (width ? `${width * SIZE_MULTIPLIER}px` : 'initial')};
  height: ${({ height }) => (height ? `${height * SIZE_MULTIPLIER}px` : 'initial')};

  background-color: ${({ color }) => HallColors[color || 'empty']};
  border-right: 1px solid ${Colors.pinball};
`;

export const HallPage = () => {
  return (
    <PageContent variant="narrow">
      <Card width="100%">
        <Container>
          {(hallMap.topRows as Line[]).map((row, index) => (
            <HallLine height={row.height} key={index}>
              {row.stands.map((column, index) => (
                <HallStand key={index} width={column.width} height={row.height} color={column.color} />
              ))}
            </HallLine>
          ))}

          {(hallMap.middleColumns as Line[]).map((column, index) => (
            <HallLine width={column.width} key={index} direction="column">
              {column.stands.map((stand, index) => (
                <HallStand key={index} width={stand.width || column.width} height={stand.height} color={stand.color} />
              ))}
            </HallLine>
          ))}

          {(hallMap.bottomRows as Line[]).map((row, index) => (
            <HallLine height={row.height} key={index} alignItems="flex-end">
              {row.stands.map((column, index) => (
                <HallStand key={index} width={column.width} height={column.height || row.height} color={column.color} />
              ))}
            </HallLine>
          ))}
        </Container>
      </Card>
    </PageContent>
  );
};
