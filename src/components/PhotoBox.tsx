import React from 'react';
import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';
import { ScreenSize } from '../styles/screeen-size';
import { usePhone } from '../pages/usePhone';

export const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;

  object-fit: contain;
`;

type Size = `${number}${'px' | '%'}`;

const Slot = styled.div<{ slotSize: Size }>`
  position: absolute;
  top: 0;
  left: 100%;
  background: inherit;
  padding: ${Spacings.md};
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);
  transform: translate(-50%) scale(0);
  box-shadow: 3px 0px 3px 0px rgba(0, 0, 0, 0.5);
  transform-origin: left center;

  ${({ slotSize }) => css`
    min-width: ${slotSize};
  `};

  @media (max-width: ${ScreenSize.phone}) {
    top: 100%;
    left: 0;
  }
`;

const Root = styled.div<{ maxSize: Size; slotSize?: Size }>`
  ${({ maxSize }) => css`
    min-width: 200px;
    max-width: ${maxSize};
  `};
  padding: ${Spacings.md} ${Spacings.md} ${Spacings.lg};
  background: white;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);
  align-self: center;

  ${({ slotSize }) =>
    slotSize &&
    css`
      cursor: pointer;

      &:hover {
        z-index: 2;

        @media (min-width: ${ScreenSize.phone}) {
          transform: scale(1.5);
        }
      }
    `};

  &:hover ${Slot} {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0) scale(1);
  }
`;

const ImageWrapper = styled.div``;

const Cursive = styled.div`
  text-align: center;
  font-size: 16px;
  font-family: cursive;
`;

export type PhotoFrameProps = {
  maxSize: Size;
  src: string;
  children?: React.ReactNode;
} & (
  | { variant?: 'no-slot' }
  | {
      variant: 'slot';
      slot: React.ReactNode;
      slotSize: Size;
    }
);

export const PhotoFrame = Object.assign(
  ({ src, maxSize, children, ...rest }: PhotoFrameProps) => {
    const isPhone = usePhone();

    return (
      <Root maxSize={maxSize} slotSize={rest.variant === 'slot' ? rest.slotSize : undefined}>
        <ImageWrapper>
          <Image src={src} />
          {children}
          {rest.variant === 'slot' && isPhone && <>rest.slot</>}
        </ImageWrapper>

        {rest.variant === 'slot' && !isPhone && <Slot slotSize={rest.slotSize}>{rest.slot}</Slot>}
      </Root>
    );
  },
  { Cursive }
);
