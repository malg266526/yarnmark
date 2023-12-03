import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import yarnSvgUrl from '../assets/knitting.svg';

const StyledLink = styled.a<{ color?: string }>`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
  font-size: 22px;
  padding: 10px 8px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 300;
  position: relative;

  &:hover:after,
  &:hover:before {
    transform: translate(0, 0);
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(0, 10px);
    height: 20px;
    width: 20px;
    background: url(${yarnSvgUrl}) no-repeat center;
    background-size: contain;
    opacity: 0;
    transition: all 150ms ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(0, 10px);
    height: 2px;
    width: 100%;
    background: #000;
    ${({ color }) =>
      color &&
      css`
        background: ${color};
      `};
    opacity: 0;
    transition: all 150ms ease-in-out;
  }
`;

export interface LinkProps {
  children?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  anchorProps?: React.ComponentProps<'a'>;
  color?: string;
}

const EXTERNAL_TARGET = '_blank';

export const Link = ({ children, href, target, rel, className, color, anchorProps }: LinkProps) => {
  const navigate = useNavigate();

  return (
    <StyledLink
      color={color}
      href={href}
      onClick={(event: React.MouseEvent) => {
        if (target !== EXTERNAL_TARGET && href) {
          event.preventDefault();
          navigate(href);
        }
      }}
      target={target}
      rel={rel}
      className={className}
      {...anchorProps}>
      {children}
    </StyledLink>
  );
};
