import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';

export const MinimalistLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: ${Spacings.md};
  padding: ${Spacings.md};

  align-self: flex-start;
  align-items: flex-start;

  margin-left: ${Spacings.lg};

  @media (max-width: ${ScreenSize.phone}) {
    margin-left: auto;
  }
`;
