import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const FlexColumnLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  gap: ${Spacings.md};
  padding: ${Spacings.sm};
`;
