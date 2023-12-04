import React from 'react';
import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';

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
`;

const Root = styled.div<{ size: Size; slotSize?: Size }>`
  ${({ size }) => css`
    min-width: ${size};
    width: ${size};
    max-height: ${size};
  `};
  padding: ${Spacings.md} ${Spacings.md} ${Spacings.lg};
  background: white;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);

  ${({ slotSize }) =>
    slotSize &&
    css`
      cursor: pointer;

      &:hover {
        z-index: 2;
        transform: scale(1.5);
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
  size: Size;
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
  ({ src, size, children, ...rest }: PhotoFrameProps) => (
    <Root size={size} slotSize={rest.variant === 'slot' ? rest.slotSize : undefined}>
      <ImageWrapper>
        <Image src={src} />
        {children}
      </ImageWrapper>

      {rest.variant === 'slot' && <Slot slotSize={rest.slotSize}>{rest.slot}</Slot>}
    </Root>
  ),
  { Cursive }
);
