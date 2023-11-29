import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../styles/theme';

const StyledLink = styled.a<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 18px;
  padding: 10px 8px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
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

const EXTERNAL_TARGET = '_blank';

export const Link = ({ children, href, target, rel, className, anchorProps }: LinkProps) => {
  const navigate = useNavigate();

  return (
    <StyledLink
      href={href}
      onClick={(event: React.MouseEvent) => {
        if (target !== EXTERNAL_TARGET) {
          event.preventDefault();
          navigate(href);
        }
      }}
      target={target}
      rel={rel}
      className={className}
      color={Colors.gold}
      {...anchorProps}>
      {children}
    </StyledLink>
  );
};
