import React, { useState } from 'react';
import { WorkshopsConfig } from './workshopsConfig';
import { MobileRibbonCard } from './cards/MobileRibbonCard';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../styles/spacings';

const Container = styled.div`
  width: 100%;
  height: 530px;
  overflow-y: scroll;
  padding: ${RedesignSpacings.sm};
`;

const Grid = styled.div<{ rowsNumber: number; openCardIndex: number | undefined }>`
  display: grid;
  grid-template-columns: 1fr;
  transition: all 200ms ease-in-out;
  width: 100%;

  gap: ${RedesignSpacings.md};
`;

export const WorkshopsMobileSchedule = () => {
  const rowsNumber = WorkshopsConfig.length;
  const [openCardIndex, setOpenCardIndex] = useState<number | undefined>(undefined);

  console.log('openCardIndex', openCardIndex);

  const onCardClick = (index: number) => {
    setOpenCardIndex(openCardIndex === index ? undefined : index);
  };

  return (
    <Container id="grid-container">
      <Grid rowsNumber={rowsNumber} openCardIndex={openCardIndex}>
        {WorkshopsConfig.map((workshop, index) => (
          <MobileRibbonCard
            key={`mirrorsRoom_${index}`}
            workshop={workshop}
            onClick={() => onCardClick(index)}
            isExpanded={openCardIndex === index}
          />
        ))}
      </Grid>
    </Container>
  );
};
