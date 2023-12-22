import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';

export const Title = styled.div<{ align?: 'center' | 'left' | 'center'; marginTop?: keyof typeof Spacings }>`
  font-size: 40px;
  font-weight: 600;

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
