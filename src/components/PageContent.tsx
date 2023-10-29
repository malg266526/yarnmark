import styled from 'styled-components';
import { Theme } from '../styles/theme';

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;

  width: ${Theme.pageContentWidth};
  align-self: center;
  align-items: center;
`;

export const Page = styled.div`
  width: '100%';
  display: flex;
  flex-direction: column;
  align-items: center;
`;
