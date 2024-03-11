import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink, HashLinkProps } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import { FontSize } from '../styles/font-size';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';

const Submenu = styled.div`
  padding-left: ${Spacings.lg};
`;

const LinkTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacings.sm};
`;

const Link = styled(HashLink)`
  flex-direction: column;
  text-decoration: none;
  padding: 8px 8px;
  color: ${Colors.white};
  font-size: ${FontSize.xl};
  border-radius: 4px;
  display: flex;
  gap: ${Spacings.sm};
  background: rgba(0, 0, 0, 0);
  transition: all 150ms ease-in-out;
  position: relative;

  &:hover {
    cursor: pointer;
    color: ${Colors.goldLight};
  }
`;

const Sublink = styled(Link)`
  flex-direction: row;
  align-items: center;
  font-size: ${FontSize.lg};
`;

const EXTERNAL_TARGET = '_blank';
const SCROLL_URL = '#';

export interface LinkEntryProps extends HashLinkProps {
  onClick?: React.MouseEventHandler;
  subLinks?: {
    to: HashLinkProps['to'];
    name: string;
    target?: HashLinkProps['target'];
    icon: ReactNode;
  }[];
}

const LinkEntry = ({ to, onClick, target, children, subLinks, ...rest }: LinkEntryProps) => {
  const navigate = useNavigate();
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      {...rest}>
      <LinkTitle>{children}</LinkTitle>

      <Submenu>
        {subLinks?.map((subLink, index) => (
          <Sublink key={index} to={subLink.to} target={subLink.target}>
            {subLink.icon}
            {subLink.name}
          </Sublink>
        ))}
      </Submenu>
    </Link>
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
