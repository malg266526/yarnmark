import styled, { css, RuleSet } from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';
import React, { ForwardedRef, forwardRef } from 'react';

export type BandProps = InnerWrapperProps &
  BandLayoutProps & {
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
}

const InnerWrapper = styled.div<InnerWrapperProps>`
  flex: 1 1 auto;
  ${({ narrowContent }) =>
    narrowContent &&
    css`
      max-width: ${Theme.pageContentWidth};
      margin: auto;
    `};
`;

type SlotSize = 'xl' | 'sm';
const slotSizeToCss: Record<SlotSize, RuleSet<object>> = {
  xl: css`
    width: 70%;
  `,
  sm: css`
    width: 30%;
  `
};

type FlexType = 'auto-shrink' | 'auto-grow' | 'auto';
const flexTypeToCss: Record<FlexType, RuleSet<object>> = {
  auto: css`
    flex: 1 1 auto;
  `,
  'auto-grow': css`
    flex: 1 0 auto;
  `,
  'auto-shrink': css`
    flex: 0.5 1 0px;
  `
};

interface SlotProps {
  size?: SlotSize;
  justify?: 'center';
  flex?: FlexType;
}
const Slot = styled.div<SlotProps>`
  position: relative;

  ${({ size }) => size && slotSizeToCss[size]};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ flex }) => flex && flexTypeToCss[flex]};
`;

type BandSize = 'xl' | 'md' | 'sm';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '1000px',
  md: '600px',
  sm: '300px'
};

interface BandLayoutProps {
  justify?: 'center' | 'space-around' | 'space-between' | 'flex-start';
  align?: 'center';
  flexAuto?: boolean;
  gap?: keyof typeof Spacings;
}
const BandLayout = styled.div<BandLayoutProps>`
  display: flex;
  width: 100%;
  height: 100%;

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `};

  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `};

  ${({ gap }) =>
    gap &&
    css`
      gap: ${Spacings[gap]};
    `};
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
  forwardRef(({ children, title, narrowContent, ...props }: BandProps, ref: ForwardedRef<HTMLDivElement>) => (
    <BandRoot ref={ref} {...props}>
      <InnerWrapper narrowContent={narrowContent}>
        <TitleWrapper>{title}</TitleWrapper>
        <BandLayout {...props}>{children}</BandLayout>
      </InnerWrapper>
    </BandRoot>
  )),
  {
    Slot
  }
);

Band.displayName = 'Band';
