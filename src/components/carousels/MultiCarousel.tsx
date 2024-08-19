import styled from 'styled-components';
import React, { ReactNode, useRef, useState } from 'react';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import skeinIconSrc from '../../assets/images/indicator_skein_green.svg';
import { Icon } from '../Icon';
import dotsStrokeIcon from '../../assets/figmaIcons/dots_stroke_icon.svg';
import { Button } from '../Button';

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
  transition: all 0.1s linear;

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

const SlideMoveOffset = 320;

export const MultiCarousel = ({ children }: MultiCarouselProps) => {
  const [offsetX, setOffsetX] = useState(0);
  const [shouldTrack, setShouldTrack] = useState(false);

  const slidesRef = useRef<HTMLDivElement>(null);

  const turnOnMouseTracking = () => setShouldTrack(true);
  const turnOffMouseTracking = () => setShouldTrack(false);

  const moveByOffset = (offset: number) => {
    const currentOffsetX = offsetX + offset;

    if (slidesRef.current) {
      slidesRef.current.style.left = `${currentOffsetX}px`;
    }

    setOffsetX(currentOffsetX);
  };

  const move = (event: any) => {
    if (shouldTrack) {
      event.stopPropagation();

      console.log('move event.movementX', event.movementX);
      moveByOffset(event.movementX);
    }
  };

  const goBack = () => {
    moveByOffset(-SlideMoveOffset);
  };

  const goNext = () => {
    moveByOffset(SlideMoveOffset);
  };

  return (
    <Root id="carousel_container">
      <SlidesWithNavigation>
        <Button onClick={goBack}>
          <Icon size="lg" src={skeinIconSrc} />
        </Button>

        <SlidesWrapper>
          <Slides
            ref={slidesRef}
            id="carousel_slides"
            onMouseMove={move}
            onMouseUp={(event) => {
              event.preventDefault();
              turnOffMouseTracking();
            }}
            onMouseDown={(event) => {
              event.preventDefault();
              turnOnMouseTracking();
            }}>
            {children}
          </Slides>
        </SlidesWrapper>

        <Button onClick={goNext}>
          <NextIcon size="lg" src={skeinIconSrc} />
        </Button>
      </SlidesWithNavigation>

      <Dots />
    </Root>
  );
};
