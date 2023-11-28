import styled from 'styled-components';
import { Theme } from '../styles/theme';

export const PageContent = styled.div<{ variant: 'wide' | 'narrow' }>`
  width: ${({ variant }) => (variant === 'narrow' ? Theme.pageContentWidth : '100%')};
  max-width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;

  align-self: center;
  align-items: center;
`;
