import React from 'react';
import { PageContent } from '../components/PageContent';
import { Colors } from '../styles/theme';
import styled from 'styled-components';
import { Card } from '../components/Card';

const HallColors = {
  premium: '#EC5800', //  Persimmon
  normal: '#FFAA33', //Yellow Orange
  taken: Colors.pinball,
  empty: 'white'
};

type HallRow = {
  height: number;
  columns: HallColumn[];
};

type HallColumn = {
  width: number;
  color: keyof typeof HallColors;
  logo?: string;
};

type HallMap = HallRow[];

export const Container = styled.div`
  display: grid;
`;

export const Row = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => `${height * 10}px`};
`;

export const Column = styled.div<{ width: number }>`
  width: ${({ width }) => `${width * 10}px`};
`;

const rows: HallMap = [
  {
    height: 4,
    columns: [
      {
        width: 2,
        color: 'empty'
      }
    ]
  }
];

export const Hall = () => {
  return (
    <PageContent variant="narrow">
      <Card width="100%">
        <Container>
          {rows.map((row, index) => (
            <Row height={row.height} key={index}>
              {row.columns.map((column, index) => (
                <Column key={index} width={column.width} />
              ))}
            </Row>
          ))}
        </Container>
      </Card>
    </PageContent>
  );
};
