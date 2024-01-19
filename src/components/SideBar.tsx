import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { HashLink, HashLinkProps } from 'react-router-hash-link';

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

const EXTERNAL_TARGET = '_blank';
const SCROLL_URL = '#';

export interface LinkEntryProps extends HashLinkProps {
  onClick?: React.MouseEventHandler;
}

const LinkEntry = ({ to, onClick, target, ...rest }: LinkEntryProps) => {
  const navigate = useNavigate();

  return (
    <Link
      to={to}
      onClick={(event: React.MouseEvent) => {
        if (target !== EXTERNAL_TARGET && to && !to.toString().includes(SCROLL_URL)) {
          event.preventDefault();
          navigate(to);
        }

        onClick?.(event);
      }}
      {...rest}
    />
  );
};

const roundedCornersSize = 12;

interface SidePanelProps {
  roundedCorners: 'left' | 'right';
  active?: boolean;
  children?: ReactNode;
}

const SidePanel = styled.div<SidePanelProps>`
  left: 100%;
  z-index: 1;
  top: 60px;
  min-height: 80vh;
  max-height: 100vh;
  position: absolute;
  min-width: 70%;
  max-width: 80%;
  transition: all 250ms ease-in-out;
  transform: translate(0, 0);
  opacity: 0;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      transform: translate(-100%, 0);
    `};

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

const SidePanelWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10;
`;

export type SideBatProps = SidePanelProps & {
  children?: ReactNode;
};

const Root = (props: SidePanelProps) => (
  <SidePanelWrapper>
    <SidePanel {...props} />
  </SidePanelWrapper>
);

export const SideBar = Object.assign(Root, {
  LinkEntry
});
