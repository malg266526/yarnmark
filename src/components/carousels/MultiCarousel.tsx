import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { RedesignSpacings } from '../../styles/spacings';

const Container = styled.div`
  width: 100%;
  padding: 0 ${RedesignSpacings.md};
`;

const Slides = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.sm};
  overflow: scroll;
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
