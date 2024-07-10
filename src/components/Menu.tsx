import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { Link } from './Link';
import React, { ReactNode } from 'react';
import { HashLinkProps } from 'react-router-hash-link';
import { Dropdown } from './Dropdown';

type DropdownMenuItem = {
  children?: ReactNode;
  subLinks?: {
    to: HashLinkProps['to'];
    name: string;
    target?: HashLinkProps['target'];
  }[];
};

const MenuDropdownItem = ({ children, subLinks }: DropdownMenuItem) => (
  <Dropdown options={subLinks}>{children}</Dropdown>
);

const MenuLinkItem = ({ children, target, to }: HashLinkProps) => (
  <Link target={target} color="black" to={to}>
    {children}
  </Link>
);

const Background = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(90deg, rgba(44, 82, 155, 0) 30px, rgb(255, 255, 255) 50%);
`;

export const Menu = Object.assign(
  styled.div`
    position: absolute;
    width: 100%;
    max-width: 100%;
    top: 100px;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1 1 auto;

    @media (max-width: ${ScreenSize.tablet}) {
      padding-right: 0;
    }

    ${Link} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
  {
    Background,
    LinkItem: MenuLinkItem,
    DropdownItem: MenuDropdownItem
  }
);
