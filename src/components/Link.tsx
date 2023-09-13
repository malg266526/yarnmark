import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: white;
  font-size: 18px;
  padding: 10px 8px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Roboto';
  font-weight: 300;
`;

export interface LinkProps {
  children?: ReactNode;
  anchorProps?: React.ComponentProps<'a'>;
}

export const Link = ({ children, anchorProps }: LinkProps) => <StyledLink {...anchorProps}>{children}</StyledLink>;
