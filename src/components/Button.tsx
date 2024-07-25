import styled from 'styled-components';
import { TextColors } from '../styles/theme';

export const Button = styled.button`
  all: unset;
  padding-top: 2px;
  cursor: pointer;
`;

export const CtaButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${TextColors.link};
  padding: 4px 12px 3px 12px;
  border-radius: 16px;
  color: white;
`;
