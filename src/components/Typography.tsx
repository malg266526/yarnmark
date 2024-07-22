import styled, { css } from 'styled-components';
import { FontSize } from '../styles/font-size';

type FontWeight = 'regular' | 'bold' | 'light';

const fontVariantToWeight: Record<FontWeight, number> = {
  bold: 500,
  light: 200,
  regular: 400
};

export const Typography = styled.div<{
  size: keyof typeof FontSize;
  weight?: FontWeight;
}>`
  ${({ size, weight }) => css`
    font-size: ${FontSize[size]};
    font-weight: ${fontVariantToWeight[weight || 'regular']};
  `};
`;
