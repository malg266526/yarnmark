import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const RowLayout = styled.div<{
  wide?: boolean;
  gap?: keyof typeof Spacings;
  justify?: 'center' | 'space-evenly';
}>`
  width: ${({ wide }) => (wide ? '100%' : 'initial')};

  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'space-evenly'};
  gap: ${({ gap }) => Spacings[gap || 'md']};
`;
