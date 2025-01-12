import React from 'react';
import { WorkshopsConfig } from './workshopsConfig';
import { MobileRibbonCard } from './MobileRibbonCard';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../styles/spacings';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 700px;

  overflow-y: scroll;

  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.sm};
`;

export const WorkshopsMobileSchedule = () => {
  return (
    <Container>
      {WorkshopsConfig.map((workshop, index) => (
        <MobileRibbonCard key={`mirrorsRoom_${index}`} workshop={workshop} />
      ))}
    </Container>
  );
};
