import React from 'react';
import { PageContent } from '../components/PageContent';
import { Colors } from '../styles/theme';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { Spacings } from '../styles/spacings';
import hallMap from './hallmap.json';
import { RowLayout } from '../components/RowLayout';

const HallColors = {
  premium: '#4CBB17', // Kelly Green
  normal1: '#EC5800', // Persimmon
  normal2: '#FFAA33', // Yellow Orange
  small1: '#d8e1e8',
  small2: '#b2cbde',
  taken: Colors.pinball,
  empty: '#e8f4ea' //
};

const SIZE_MULTIPLIER = 20;

export const Container = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  padding: ${Spacings.xs};
  background-color: ${HallColors.empty};
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
  display: flex;
  width: ${({ width }) => (width ? `${width * SIZE_MULTIPLIER}px` : 'initial')};
  height: ${({ height }) => (height ? `${height * SIZE_MULTIPLIER}px` : 'initial')};

  background-color: ${({ color }) => HallColors[color || 'empty']};
  align-items: center;
  justify-content: center;
`;

export const HallPage = () => {
  return (
    <PageContent variant="narrow">
      <Card width="100%" flexDirection="row">
        <Container>
          {(hallMap.topRows as Line[]).map((row, index) => (
            <HallLine height={row.height} key={index}>
              {row.stands.map((stand, index) => (
                <HallStand key={index} width={stand.width} height={row.height} color={stand.color}>
                  <h4>{stand.index}</h4>
                </HallStand>
              ))}
            </HallLine>
          ))}

          <HallLine>
            {(hallMap.middleColumns as Line[]).map((column, index) => (
              <HallLine
                width={column.width}
                key={index}
                direction="column"
                alignItems={index === 4 ? 'flex-end' : 'flex-start'}>
                {column.stands.map((stand, index) => (
                  <HallStand key={index} width={stand.width || column.width} height={stand.height} color={stand.color}>
                    <h4>{stand.index}</h4>
                  </HallStand>
                ))}
              </HallLine>
            ))}
          </HallLine>

          {(hallMap.bottomRows as Line[]).map((row, index) => (
            <HallLine height={row.height} key={index} alignItems="flex-end">
              {row.stands.map((stand, index) => (
                <HallStand key={index} width={stand.width} height={stand.height || row.height} color={stand.color}>
                  <h4>{stand.index}</h4>
                </HallStand>
              ))}
            </HallLine>
          ))}
        </Container>

        <Legend />
      </Card>
    </PageContent>
  );
};

const LegendRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorSample = styled.div<{ color?: keyof typeof HallColors }>`
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => HallColors[color || 'empty']};
`;

const Legend = () => {
  return (
    <LegendRoot>
      <RowLayout gap="xs">
        <ColorSample color="premium" />
        <p>Miejsce Premium 5x3m</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="normal1" />
        <p>Miejsce Normal 4x2,5m</p>
      </RowLayout>

      <RowLayout gap="xs">
        <ColorSample color="normal2" />
        <p>Miejsce Normal 4x2,5m</p>
      </RowLayout>
    </LegendRoot>
  );
};
