import styled, { css, RuleSet } from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';
import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import { ScreenSize } from '../styles/screeen-size';

export type BandProps = InnerWrapperProps &
  BandLayoutProps & {
    id?: string;
    size?: BandSize;
    padding?: 'none' | keyof typeof Spacings;
    title?: React.ReactNode;
    children?: React.ReactNode;
    align?: 'center' | 'flex-start' | 'initial';
    overflowX?: 'none' | 'hidden';
  } & (
    | { variant?: 'default' }
    | {
        variant: 'background-image';
        background: ReactNode;
      }
    | {
        variant: 'background';
        color: string;
      }
  );

interface InnerWrapperProps {
  narrowContent?: 'auto' | 'fixed';
}

const InnerWrapper = styled.div<InnerWrapperProps>`
  flex: 1 1 auto;
  display: flex;
  max-width: 100%;

  ${({ narrowContent }) =>
    narrowContent &&
    css`
      max-width: ${narrowContent === 'auto' ? '85%' : Theme.pageContentWidth};
      margin: auto;

      @media (max-width: ${ScreenSize.phone}) {
        max-width: 100%;
      }
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
  justify?: 'center' | 'flex-start' | 'flex-end';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  flex?: FlexType;
  width?: `${number}${'px' | '%'}`;
}

const Slot = styled.div<SlotProps>`
  position: relative;

  ${({ size }) => size && slotSizeToCss[size]};

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};

  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ alignItems = 'center' }) => alignItems};

  ${({ flex }) => flex && flexTypeToCss[flex]};

  @media (max-width: ${ScreenSize.tablet}) {
    margin: auto;
    width: 100%;
  }
`;

type BandSize = 'xl' | 'md' | 'sm' | 'xs' | 'lg';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '1000px',
  lg: '750px',
  md: '600px',
  sm: '450px',
  xs: '300px'
};

interface BandLayoutProps {
  justify?: 'center' | 'space-around' | 'space-between' | 'flex-start' | 'space-evenly' | 'flex-end';
  flexAuto?: boolean;
  flexWrap?: 'wrap';
  direction?: 'column';
  gap?: keyof typeof Spacings;
  reverseOnMobile?: boolean;
}
const BandLayout = styled.div<BandLayoutProps>`
  display: flex;
  width: 100%;
  height: 100%;

  ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `};

  ${({ flexWrap }) =>
    flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}

  @media (max-width: ${ScreenSize.tablet}) {
    flex-direction: ${({ reverseOnMobile }) => (reverseOnMobile ? 'column-reverse' : 'column')};
  }

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
      @media (max-width: ${ScreenSize.tablet}) {
        align-items: ${justify};
      }
    `};

  ${({ gap }) =>
    gap &&
    css`
      gap: ${Spacings[gap]};

      @media (max-width: ${ScreenSize.tablet}) {
        gap: ${Spacings.lg};
      }
    `};
`;

const BandRoot = styled.div<BandProps>`
  position: relative;
  ${({ padding }) =>
    padding &&
    padding !== 'none' &&
    css`
      padding: ${Spacings[padding]};

      @media (max-width: ${ScreenSize.tablet}) {
        padding: ${Spacings.md} ${Spacings.md};
      }

      @media (max-width: ${ScreenSize.phone}) {
        padding: ${Spacings.md} 0;
      }
    `};

  ${({ align }) => css`
    align-items: ${align || 'center'};
  `};

  ${({ size }) =>
    size &&
    css`
      min-height: ${bandSizeToHeight[size]};

      @media (max-width: ${ScreenSize.phone}) {
        min-height: initial;
      }
    `};
  width: 100%;
  display: flex;
  justify-content: center;

  ${(props) =>
    props.overflowX === 'hidden' &&
    css`
      overflow-x: hidden;
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

const Picture = styled.picture<{
  objectFit?: 'cover' | 'contain';
  filter?: string;
  objectPosition?: string;
  opacity?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${({ opacity }) =>
    Number.isFinite(opacity) &&
    css`
      opacity: ${opacity};
    `};

  ${({ filter }) =>
    filter &&
    css`
      filter: ${filter};
    `};

  > img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    ${({ objectFit }) =>
      objectFit &&
      css`
        object-fit: ${objectFit};
      `};

    ${({ objectPosition }) =>
      objectPosition &&
      css`
        object-position: ${objectPosition};
      `};
  }
`;

export const Band = Object.assign(
  // eslint-disable-next-line react/display-name
  forwardRef(({ children, title, narrowContent, ...props }: BandProps, ref: ForwardedRef<HTMLDivElement>) => (
    <BandRoot ref={ref} {...props}>
      {props.variant === 'background-image' && props.background}

      <InnerWrapper narrowContent={narrowContent}>
        <TitleWrapper>{title}</TitleWrapper>
        <BandLayout {...props}>{children}</BandLayout>
      </InnerWrapper>
    </BandRoot>
  )),
  {
    Slot,
    Picture
  }
);

Band.displayName = 'Band';
