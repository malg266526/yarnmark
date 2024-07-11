import { Icon as IconifyIcon } from '@iconify/react';
import React, { ReactNode, useRef, useState } from 'react';
import { HashLinkProps } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { Radius } from '../styles/cards';
import { FontSize } from '../styles/font-size';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { Button } from './Button';
import { Link, linkStyle } from './Link';

const DropdownLayout = styled.div`
  position: relative;
`;

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

const DropdownItemsBackground = styled.div<{ visible: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1));
  box-shadow: 2px 2px 13px 0 rgba(121, 59, 59, 0.25);
  padding: ${Spacings.md};
  border-bottom-left-radius: ${Radius.md};
  border-bottom-right-radius: ${Radius.md};

  transition: all 150ms ease-in-out;
  transform: scale(0.7) translate(0, -80px);
  opacity: 0;
  pointer-events: none;

  ${({ visible }) =>
    visible &&
    css`
      transform: scale(1) translate(0, 0);
      opacity: 1;
      pointer-events: auto;
      z-index: 2;
    `};
`;

const SubLink = styled(Link)`
  font-size: ${FontSize.md};
`;

type DropdownType = {
  children?: ReactNode;
  options?: {
    to: HashLinkProps['to'];
    name: string;
    target?: HashLinkProps['target'];
  }[];
};

export const Dropdown = ({ children, ...props }: DropdownType) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onClickOutside = () => setIsDropdownOpen(false);

  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, onClickOutside);

  const onToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <DropdownLayout ref={wrapperRef}>
      <DropdownTitle onClick={onToggle}>
        {children}
        <IconifyIcon
          icon="mingcute:down-line"
          style={{
            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'all 150ms ease-in-out'
          }}
        />
      </DropdownTitle>

      <DropdownItemsBackground visible={isDropdownOpen}>
        {props.options?.map((subLink, index) => (
          <SubLink key={index} to={subLink.to} color="black" target={subLink.target}>
            {subLink.name}
          </SubLink>
        ))}
      </DropdownItemsBackground>
    </DropdownLayout>
  );
};

Dropdown.displayName = 'Dropdown';
