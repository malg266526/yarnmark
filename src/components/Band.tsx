import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';
import React, { ForwardedRef, forwardRef } from 'react';

export type BandProps = InnerWrapperProps & {
  size: 'xl' | 'md' | 'sm';
  padding?: 'none' | keyof typeof Spacings;
  title?: React.ReactNode;
  children?: React.ReactNode;
} & (
    | { variant?: 'default' }
    | {
      variant: 'background-image';
      src: string;
    }
    | {
      variant: 'background';
      color: string;
    }
  );

interface InnerWrapperProps {
  narrowContent?: boolean;
  justify?: 'start' | 'center' | 'end';
}

const InnerWrapper = styled.div<InnerWrapperProps>`
  flex: 1 1 auto;
  ${({ narrowContent }) =>
    narrowContent &&
    css`
      max-width: ${Theme.pageContentWidth};
      margin: auto;
    `};

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `};
`;

const Slot = styled.div<{ size?: 'xl' | 'sm'; float?: 'left' | 'right' }>`
  position: relative;
  ${({ size }) =>
    size &&
    css`
      width: ${size === 'xl' ? '70%' : '30%'};
    `};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;

  ${({ float }) =>
    float &&
    (float === 'left'
      ? css`
          > * {
            margin-left: -800px;
          }
        `
      : css`
          > * {
            margin-right: -800px;
          }
        `)};
`;

type BandSize = 'xl' | 'md' | 'sm';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '1000px',
  md: '600px',
  sm: '300px'
};

const BandLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const BandRoot = styled.div<BandProps>`
  position: relative;
  ${({ padding }) =>
    padding &&
    padding !== 'none' &&
    css`
      padding: ${Spacings[padding]};
    `};

  ${({ size }) => css`
    min-height: ${bandSizeToHeight[size]};
  `};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.variant &&
    props.variant === 'background-image' &&
    css`
      background: url(${props.src});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    `}

  ${(props) =>
    props.variant === 'background' &&
    css`
      background: ${props.color};
    `}
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: ${Spacings.lg};
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: ${Theme.pageContentWidth};
  margin: auto;
  z-index: 2;
`;

export const Band = Object.assign(
  // eslint-disable-next-line react/display-name
  forwardRef(({ children, title, ...props }: BandProps, ref: ForwardedRef<HTMLDivElement>) => (
    <BandRoot ref={ref} {...props}>
      <InnerWrapper {...props}>
        <TitleWrapper>{title}</TitleWrapper>
        <BandLayout>{children}</BandLayout>
      </InnerWrapper>
    </BandRoot>
  )),
  {
    Slot
  }
);

Band.displayName = 'Band';
