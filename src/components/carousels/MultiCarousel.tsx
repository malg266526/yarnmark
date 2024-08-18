import styled from 'styled-components';
import React, { ReactNode, useRef, useState } from 'react';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';

const Container = styled.div`
  width: 100%;
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.md};
  position: relative;
  min-height: 550px;
  background-color: white;

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
  top: ${RedesignSpacings.sm};
  left: ${RedesignSpacings.sm};

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
    console.log('onMouseRelease event.target', event);

    if (slidesRef.current) {
      const currentOffsetX = offsetX;

      slidesRef.current.style.left = `${currentOffsetX}px`;
      setOffsetX(currentOffsetX);
    }
  };

  const move = (event: any) => {
    console.log('move event.movementX', event.movementX);
    console.log('move event.nativeEventmovementX', event.nativeEvent.movementX);
    console.log('move event.target', event);
  };

  return (
    <Container id="carousel_container">
      <Slides
        ref={slidesRef}
        id="carousel_slides"
        onMouseUp={onMouseRelease}
        onMouseMove={move}
        onMouseDown={(event) => event.preventDefault()}>
        {children}
      </Slides>
    </Container>
  );
};
