import styled, { css } from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';

export type Justify = 'center' | 'space-around' | 'space-between' | 'flex-start' | 'space-evenly' | 'flex-end';
export type Align = 'center' | 'flex-start' | 'flex-end';

export type BandSize = 'xl' | 'md' | 'sm' | 'xs' | 'lg';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '850px',
  lg: '750px',
  md: '600px',
  sm: '500px',
  xs: '300px'
};

export const BandRootLayout = styled.div<{
  padding?: keyof typeof RedesignSpacings;
  size?: BandSize;
  justify?: Justify;
  align?: Align;
  direction?: 'column' | 'row';
  maxWidth?: `${number}%` | `${number}px`;
  gap?: keyof typeof RedesignSpacings;
  overflow?: 'scroll' | 'auto';
}>`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};

  position: relative;

  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};

  overflow: ${({ overflow }) => overflow || 'unset'};

  gap: ${({ gap }) => (gap ? RedesignSpacings[gap] : 'unset')};

  ${({ size }) =>
    size &&
    css`
      min-height: ${bandSizeToHeight[size]};

      @media (max-width: ${ScreenSize.phone}) {
        min-height: initial;
      }
    `};

  padding: ${({ padding }) => RedesignSpacings[padding || 'xl']};

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
      margin: auto;
    `};
`;
