import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';

export const MinimalistLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: ${Spacings.md};
  padding: ${Spacings.xl} 100px ${Spacings.lg} ${Spacings.lg};

  align-self: flex-end;
  align-items: flex-end;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${Spacings.md};
  }
`;
