import styled, { css } from 'styled-components';

export const sizeToIconWidth: Record<SizeKey, string> = {
  xl: '60px',
  lg: '40px',
  md: '30px',
  sm: '20px'
};

type SizeKey = 'xl' | 'lg' | 'md' | 'sm';

export interface IconProps {
  size: SizeKey | `${number}${'px' | '%'}`;
  src: string;
  dropShadow?: boolean;
  zIndex?: number;
}

const isCustomValue = (value: IconProps['size']): value is `${number}${'px' | '%'}` =>
  value.includes('%') || value.includes('px');

export const Icon = styled.span<IconProps>`
  position: relative;
  z-index: ${({ zIndex }) => (typeof zIndex === 'number' ? zIndex : 1)};
  display: inline-block;
  ${({ size }) =>
    isCustomValue(size)
      ? css`
          width: ${size};
          height: ${size};
        `
      : css`
          width: ${sizeToIconWidth[size]};
          height: ${sizeToIconWidth[size]};
        `};

  background: url(${({ src }) => src}) no-repeat center;
  background-size: contain;

  ${({ dropShadow }) =>
    dropShadow &&
    css`
      filter: drop-shadow(1px 1px 7px black);
    `};
`;
