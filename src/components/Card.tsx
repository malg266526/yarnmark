import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const Card = styled.div<{ width?: string }>`
  width: ${({ width }) => width};

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Spacings.md};

  background-color: white;

  border-radius: 15px;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;
