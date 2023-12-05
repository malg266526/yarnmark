import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const MinimalistLayout = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${Spacings.md};
  padding: ${Spacings.md};

  align-self: flex-start;
  align-items: flex-start;

  margin-left: ${Spacings.lg};
`;
