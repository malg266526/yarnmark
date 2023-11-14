import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const FlexColumnLayout = styled.div<{
  isFullHeight?: boolean;
  justifyContent?: string;
  gap?: keyof typeof Spacings;
}>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  gap: ${({ gap }) => Spacings[gap || 'md']};
  padding: ${Spacings.sm};

  height: ${({ isFullHeight }) => (isFullHeight ? '100%' : 'initial')};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'initial')};
  align-items: center;
`;
