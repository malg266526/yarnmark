import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { PageContent } from '../components/PageContent';
import { Spacings } from '../styles/spacings';

export const FlexLayout = styled.div`
  display: flex;
  gap: ${Spacings.md};
`;

export const WorkshopsPage = () => {
  return (
    <PageContent variant="narrow">
      <FlexLayout>
        <FlexColumnLayout>
          <Card>Pokaz pierwszej pomocy</Card>
          <Card>Żakard</Card>
          <Card>Szydełkowy koszyk</Card>
        </FlexColumnLayout>

        <FlexColumnLayout>
          <Card>Szydełko tunezyjskie</Card>
          <Card>Warsztat X</Card>
          <Card>Warsztat Y</Card>
        </FlexColumnLayout>
      </FlexLayout>
    </PageContent>
  );
};
