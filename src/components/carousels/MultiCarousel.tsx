import styled from 'styled-components';
import React, { ReactNode, useRef, useState } from 'react';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';

const Container = styled.div`
  width: 100%;
  padding: 0 ${RedesignSpacings.md};
  position: relative;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const Slides = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.sm};
  overflow: hidden;
  position: absolute;
  width: 100%;
  left: 0;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.xs};
  }
`;

interface MultiCarouselProps {
  children: ReactNode;
}

export const MultiCarousel = ({ children }: MultiCarouselProps) => {
  const [offsetX, setOffsetX] = useState(0);

  const slidesRef = useRef<HTMLDivElement>(null);

  const onMouseRelease = (event: any) => {
    console.log('onMouseRelease event.movementX', event.movementX);
    console.log('onMouseRelease event.nativeEventmovementX', event.nativeEvent.movementX);

    if (slidesRef.current) {
      const currentOffsetX = offsetX;

      slidesRef.current.style.left = `${currentOffsetX}px`;
      setOffsetX(currentOffsetX);
    }
  };

  return (
    <Container id="carousel_container">
      <Slides
        ref={slidesRef}
        id="carousel_slides"
        onMouseUp={onMouseRelease}
        onMouseDown={(event) => event.preventDefault()}>
        {children}
      </Slides>
    </Container>
  );
};
