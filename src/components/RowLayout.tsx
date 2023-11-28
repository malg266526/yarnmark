import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const RowLayout = styled.div<{ wide?: boolean; gap?: keyof typeof Spacings }>`
  width: ${({ wide }) => (wide ? '100%' : 'initial')};

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: ${({ gap }) => Spacings[gap || 'md']};
`;
