import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';

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
  font-size: 40px;
  font-weight: 600;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;
