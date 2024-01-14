import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { HashLink } from 'react-router-hash-link';

const Link = styled(HashLink)`
  text-decoration: none;
  padding: 8px 8px;
  color: ${Colors.white};
  font-size: 1.6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: ${Spacings.sm};
  background: rgba(0, 0, 0, 0);
  transition: all 150ms ease-in-out;
  position: relative;

  &:hover {
    cursor: pointer;
    color: ${Colors.goldLight};
    /* background: linear-gradient(90deg, rgba(44, 82, 155, 1) 0%, rgba(255, 255, 255, 0) 80%); */
  }
`;

const SCROLL_URL = '#';

export interface LinkEntryProps {
  children: ReactNode;
  to: string;
  onClick?: React.MouseEventHandler;
}

const LinkEntry = ({ to, onClick, ...rest }: LinkEntryProps) => {
  const navigate = useNavigate();

  return (
    <Link
      to={to}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();

        if (to && !to.toString().includes(SCROLL_URL)) {
          navigate(to);
        }

        onClick?.(event);
      }}
      {...rest}
    />
  );
};

const roundedCornersSize = 12;

const Root = styled.div<{ roundedCorners: 'left' | 'right' }>`
  background: ${Colors.ruinedSmores};
  padding: ${Spacings.sm};

  ${({ roundedCorners }) =>
    roundedCorners === 'left'
      ? css`
          border-top-left-radius: ${roundedCornersSize}px;
          border-bottom-left-radius: ${roundedCornersSize}px;
        `
      : css`
          border-top-right-radius: ${roundedCornersSize}px;
          border-bottom-right-radius: ${roundedCornersSize}px;
        `}
`;

export const SideBar = Object.assign(Root, {
  LinkEntry
});
