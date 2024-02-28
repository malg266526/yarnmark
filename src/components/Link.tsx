import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink, HashLinkProps } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import yarnSvgUrl from '../assets/images/skein3.svg';
import { Radius } from '../styles/cards';
import { FontSize } from '../styles/font-size';

export const linkStyle = css`
  padding: 10px 8px;
  border-radius: ${Radius.md};
  font-size: ${FontSize.lg};
  font-weight: 300;
  text-decoration: none;
  position: relative;
  cursor: pointer;
`;

const StyledLink = styled(HashLink)<{ color?: string }>`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};

  ${linkStyle}

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

const EXTERNAL_TARGET = '_blank';
const SCROLL_URL = '#';

export const Link = styled(({ children, to, target, rel, color, ...rest }: HashLinkProps & { className?: string }) => {
  const navigate = useNavigate();

  return (
    <StyledLink
      {...rest}
      color={color}
      smooth
      to={to}
      onClick={(event: React.MouseEvent) => {
        if (target !== EXTERNAL_TARGET && to && !to.toString().includes(SCROLL_URL)) {
          event.preventDefault();
          navigate(to);
        }
      }}
      target={target}
      rel={rel}>
      {children}
    </StyledLink>
  );
})``;
