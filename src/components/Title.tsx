import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';
import { FontSize } from '../styles/font-size';

export const TextWrapper = styled.div<{ align?: 'center' | 'left' | 'center'; marginTop?: keyof typeof Spacings }>`
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${Spacings[marginTop]};
    `};
`;

export const Title = styled.h1`
  font-size: ${FontSize.xxl};
  font-weight: 600;
  margin: 0;
`;

export const SubTitle = styled.h2`
  font-size: ${FontSize.lg};
  font-weight: 600;
`;
