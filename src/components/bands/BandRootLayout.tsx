import styled, { css } from 'styled-components';
import { Spacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';

export type Justify = 'center' | 'space-around' | 'space-between' | 'flex-start' | 'space-evenly' | 'flex-end';
export type Align = 'center' | 'flex-start' | 'flex-end';

export type BandSize = 'xl' | 'md' | 'sm' | 'xs' | 'lg';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '1000px',
  lg: '750px',
  md: '600px',
  sm: '450px',
  xs: '300px'
};

export const BandRootLayout = styled.div<{
  padding?: keyof typeof Spacings;
  size?: BandSize;
  justify?: Justify;
  align?: Align;
  direction?: 'column' | 'row';
  maxWidth?: `${number}%` | `${number}px`;
}>`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};

  position: relative;

  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};

  ${({ size }) =>
    size &&
    css`
      min-height: ${bandSizeToHeight[size]};

      @media (max-width: ${ScreenSize.phone}) {
        min-height: initial;
      }
    `};

  padding: ${Spacings.xl};

  @media (max-width: ${ScreenSize.tablet}) {
    padding: ${Spacings.md} ${Spacings.md};
  }

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
      margin: auto;

      @media (max-width: ${ScreenSize.phone}) {
        max-width: 100%;
      }
    `};
`;
