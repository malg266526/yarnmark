import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const StyledH3 = styled.h3`
  font-weight: 600;
  margin: 0;
`;

export const Text = styled.p<{ margin?: keyof typeof Spacings }>`
  font-weight: 300;
  margin: ${({ margin }) => Spacings[margin || 'xs']};
`;

export const ImageBox = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
