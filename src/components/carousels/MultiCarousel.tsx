import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';

const Container = styled.div`
  width: 100%;
  padding: 0 ${RedesignSpacings.md};

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const Slides = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.sm};
  overflow: scroll;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.xs};
  }
`;

interface MultiCarouselProps {
  children: ReactNode;
}

export const MultiCarousel = ({ children }: MultiCarouselProps) => {
  return (
    <Container id="carousel_container">
      <Slides id="carousel_slides">{children}</Slides>
    </Container>
  );
};
