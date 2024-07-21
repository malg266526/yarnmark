import styled, { css } from 'styled-components';
import { FontSize } from '../styles/font-size';
import { Spacings } from '../styles/spacings';

type FontVariant = 'regular' | 'bold' | 'light';

const fontVariantToWeight: Record<FontVariant, number> = {
  bold: 500,
  light: 200,
  regular: 400
};

export const Typography = styled.div<{
  size: keyof typeof FontSize;
  weight?: FontVariant;
  paddingBottom?: keyof typeof Spacings;
}>`
  ${({ size, weight }) => css`
    font-size: ${FontSize[size]};
    font-weight: ${fontVariantToWeight[weight || 'regular']};
  `};

  ${({ paddingBottom }) =>
    paddingBottom &&
    css`
      padding-bottom: ${Spacings[paddingBottom]};
    `};
`;
