import React from 'react';
import { PageContent } from '../components/PageContent';
import { Colors } from '../styles/theme';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { Spacings } from '../styles/spacings';
import map from './hallmap.json';

const HallColors = {
  premium: '#EC5800', //  Persimmon
  normal: '#FFAA33', //Yellow Orange
  taken: Colors.pinball,
  empty: 'white'
};

type HallRow = {
  height: number;
  columns: HallColumn[];
  width?: number;
  color: keyof typeof HallColors;
};

type HallColumn = {
  width: number;
  color: keyof typeof HallColors;
  logo?: string;
  height?: number;
  rows?: HallRow[];
};

type HallMap = HallRow[];

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

export const Row = styled.div<{ height: number; width?: number; color?: keyof typeof HallColors }>`
  display: flex;
  flex: 0;
  height: ${({ height }) => `${height * SIZE_MULTIPLIER}px`};
  width: ${({ width }) => (width ? `${width * SIZE_MULTIPLIER}px` : 'initial')};
  background-color: ${({ color }) => HallColors[color || 'empty']};

  align-items: flex-end;
`;

export const Column = styled.div<{ width: number; height?: number; color?: keyof typeof HallColors }>`
  width: ${({ width }) => `${width * SIZE_MULTIPLIER}px`};
  height: ${({ height }) => (height ? `${height * SIZE_MULTIPLIER}px` : 'initial')};

  background-color: ${({ color }) => HallColors[color || 'empty']};
  border-right: 1px solid ${Colors.pinball};
`;

console.log('map', map);

export const HallPage = () => {
  return (
    <PageContent variant="narrow">
      <Card width="100%">
        <Container>
          {(map.topRows as HallMap).map((row, index) => (
            <Row height={row.height} key={index}>
              {row.columns.map((column, index) => (
                <Column key={index} width={column.width} height={row.height} color={column.color} />
              ))}
            </Row>
          ))}

          {(map.middleColumns as HallColumn[]).map((column, index) => (
            <Column width={column.width} key={index}>
              {(column.rows as HallRow[]).map((row, index) => (
                <Row key={index} width={row.width || column.width} height={row.height} color={row.color} />
              ))}
            </Column>
          ))}

          {(map.bottomRows as HallMap).map((row, index) => (
            <Row height={row.height} key={index}>
              {row.columns.map((column, index) => (
                <Column key={index} width={column.width} height={column.height || row.height} color={column.color} />
              ))}
            </Row>
          ))}
        </Container>
      </Card>
    </PageContent>
  );
};
