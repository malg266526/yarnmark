import styled from 'styled-components';
import { Theme } from '../styles/theme';

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 900px;
  align-self: center;
  align-items: center;
`;

export const Page = styled.div`
  width: ${Theme.pageContentWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
