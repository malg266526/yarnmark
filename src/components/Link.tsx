import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a<{ color: string }>`
  color: ${({ color }) => color};
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
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  anchorProps?: React.ComponentProps<'a'>;
}

export const Link = ({ children, href, target, rel, className, anchorProps }: LinkProps) => (
  <StyledLink href={href} target={target} rel={rel} className={className} color="white" {...anchorProps}>
    {children}
  </StyledLink>
);
