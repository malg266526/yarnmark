import React, { ReactNode, useState } from 'react';
import { HashLinkProps } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import { Link, linkStyle } from './Link';
import { Button } from './Button';
import { Colors } from '../styles/theme';
import { Spacings } from '../styles/spacings';
import { Radius } from '../styles/cards';
import { FontSize } from '../styles/font-size';
import { Icon as IconifyIcon } from '@iconify/react';

const DropdownTitle = styled(Button)`
  color: ${Colors.text};
  min-width: 100px;
  ${linkStyle}

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
        background: ${Colors.text};
      `};
    opacity: 0;
    transition: all 150ms ease-in-out;
  }

  &:hover:after,
  &:hover:before {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownItemsBackground = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.65), #ffffff);
  padding: ${Spacings.md};
  // gap: ${Spacings.sm};
  border-bottom-left-radius: ${Radius.md};
  border-bottom-right-radius: ${Radius.md};
`;

const SubLink = styled(Link)`
  font-size: ${FontSize.md};
`;

type DropdownMenuItem = {
  children?: ReactNode;
  subLinks?: {
    to: HashLinkProps['to'];
    name: string;
  }[];
};

type MenuItemType = HashLinkProps | DropdownMenuItem;

export const MenuItem = ({ children, ...props }: MenuItemType) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if ('subLinks' in props) {
    return (
      <Dropdown>
        <DropdownTitle onClick={onToggle}>
          {children}
          <IconifyIcon
            icon="mingcute:down-line"
            style={{
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'all 1ms ease-in-out'
            }}
          />
        </DropdownTitle>
        {isDropdownOpen && (
          <DropdownItemsBackground>
            {props.subLinks?.map((subLink, index) => (
              <SubLink key={index} to={subLink.to} color="black">
                {subLink.name}
              </SubLink>
            ))}
          </DropdownItemsBackground>
        )}
      </Dropdown>
    );
  }

  if ('to' in props) {
    return (
      <Link target={props.target} color="black" to={props.to}>
        {children}
      </Link>
    );
  }
};
