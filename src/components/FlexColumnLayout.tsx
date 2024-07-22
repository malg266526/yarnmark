import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const FlexColumnLayout = styled.div<{
  fullHeight?: boolean;
  justifyContent?: string;
  gap?: keyof typeof Spacings;
  padding?: keyof typeof Spacings;
  align?: string;
  width?: `${number}%` | `${number}px`;
}>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  width: ${({ width }) => width || 'initial'};

  gap: ${({ gap }) => Spacings[gap || 'md']};
  padding: ${({ padding }) => Spacings[padding || 'md']};

  height: ${({ fullHeight: isFullHeight }) => (isFullHeight ? '100%' : 'initial')};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'initial')};
  align-items: ${({ align }) => (align ? align : 'center')};
`;
