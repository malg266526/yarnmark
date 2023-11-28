import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const RowLayout = styled.div<{ wide?: boolean }>`
  width: ${({ wide }) => (wide ? '100%' : 'initial')};

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: ${Spacings.md};
`;
