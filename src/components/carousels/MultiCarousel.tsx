import styled from 'styled-components';
import React, { forwardRef, ReactNode, RefObject, useRef, useState } from 'react';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import skeinIconSrc from '../../assets/images/indicator_skein_green.svg';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Dots } from '../Dots';

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

const DotsWrapper = styled.span`
  width: 70px;
  height: 30px;
`;

interface MultiCarouselProps {
  // Todo: make id obligatory
  items: ReactNode[];
}

const SlideMoveOffset = 320;

export const MultiCarousel = ({ items }: MultiCarouselProps) => {
  const inputRef = useRef<HTMLDivElement[]>([]);

  const moveByOffset = (ref: HTMLDivElement, offset: number) => {
    if (ref) {
      const currentOffsetX = ref.style.left.split('px')?.[0];

      const newOffsetX = Number(currentOffsetX) + offset;

      console.log('newOffsetX', newOffsetX);

      ref.style.left = `${newOffsetX}px`;
    }
  };

  const goBack = () => {
    inputRef.current.forEach((item) => moveByOffset(item, -SlideMoveOffset));
  };

  const goNext = () => {
    inputRef.current.forEach((item) => moveByOffset(item, SlideMoveOffset));
  };

  return (
    <Root id="carousel_container">
      <SlidesWithNavigation>
        <Button onClick={goBack} aria-label="go back">
          <Icon size="lg" src={skeinIconSrc} />
        </Button>

        <SlidesWrapper>
          <Slides id="carousel_slides">
            {/*Todo: try to read props of item and use id as a key*/}
            {items.map((item, index) => (
              <MultiCarouselSlide
                key={`slide_item_${index}`}
                ref={(node) => {
                  if (node) {
                    inputRef.current[index] = node;
                  }
                }}>
                {item}
              </MultiCarouselSlide>
            ))}
          </Slides>
        </SlidesWrapper>

        <Button onClick={goNext} aria-label="go next">
          <NextIcon size="lg" src={skeinIconSrc} />
        </Button>
      </SlidesWithNavigation>

      <DotsWrapper>
        <Dots onPrev={goBack} onNext={goNext} />
      </DotsWrapper>
    </Root>
  );
};

interface MultiCarouselSlideProps {
  children: ReactNode;
  moveBy?: number;
}

const SlideRoot = styled.div`
  background-color: lightcoral;
  position: relative;
`;

const MultiCarouselSlide = forwardRef<HTMLDivElement, MultiCarouselSlideProps>(({ children }, ref) => {
  return <SlideRoot ref={ref}>{children}</SlideRoot>;
});
MultiCarouselSlide.displayName = 'MultiCarouselSlide';
