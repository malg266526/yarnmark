import styled from 'styled-components';
import React, { ReactNode, useRef, useState } from 'react';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import skeinIconSrc from '../../assets/images/indicator_skein_green.svg';
import { Icon } from '../Icon';
import dotsStrokeIcon from '../../assets/figmaIcons/dots_stroke_icon.svg';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.sm};
  background-color: white;
  overflow: hidden;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const SlidesWithNavigation = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
  justify-content: space-between;
`;

const SlidesWrapper = styled.div`
  position: relative;
  min-height: 500px;
  overflow: hidden;
  width: 100%;
`;

const Slides = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.xs};
  overflow: hidden;
  position: absolute;
  top: 0;
  left: ${RedesignSpacings.xs};

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.xs};
  }
`;

const NextIcon = styled(Icon)`
  transform: rotateY(180deg);
`;

const Dots = styled.span`
  background: url(${dotsStrokeIcon}) no-repeat center;
  background-size: contain;
  width: 70px;
  height: 30px;
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
    <Root id="carousel_container">
      <SlidesWithNavigation>
        <Icon size="lg" src={skeinIconSrc} />

        <SlidesWrapper>
          <Slides
            ref={slidesRef}
            id="carousel_slides"
            onMouseUp={onMouseRelease}
            onMouseMove={move}
            onMouseDown={(event) => event.preventDefault()}>
            {children}
          </Slides>
        </SlidesWrapper>

        <NextIcon size="lg" src={skeinIconSrc} />
      </SlidesWithNavigation>

      <Dots />
    </Root>
  );
};
