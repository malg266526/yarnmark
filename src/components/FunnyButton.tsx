import React from 'react';
import styled, { css } from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';

const positionTopOffset = 100;
const translationYOffset = 30;
const wrapperTranslation = `translate(-50%, ${positionTopOffset + translationYOffset}px)`;

const TextWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  top: calc(100% - ${positionTopOffset}px);
  left: 50%;
  transform-origin: left;
  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);
  background: ${Colors.grayLight};
  border-radius: 4px;
  box-shadow: 1px 1px 3px 0 black;
  min-width: 150px;
  min-height: 100px;
  padding: ${Spacings.md};

  opacity: 0;
  transform: scale(0.5) ${wrapperTranslation};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  padding: ${Spacings.sm};
  border-radius: 50%;
`;

export const IconWrapper2 = styled.div`
  flex-shrink: 0;
  padding: ${Spacings.sm};
  border-radius: 50%;
  box-shadow: none;
  transition: all 150ms ease-in-out;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: all 150ms ease-in-out;
    background: linear-gradient(45deg, ${Colors.red1} 0%, ${Colors.red2} 100%);
    z-index: -1;
  }
`;

const hoverStyles = css`
  ${IconWrapper2} {
    box-shadow: 1px 1px 3px 0 black;
  }

  ${IconWrapper2}:after {
    opacity: 1;
  }

  ${TextWrapper} {
    z-index: 1;
    transform: scale(1) ${wrapperTranslation};
    opacity: 1;

    @media (max-width: ${ScreenSize.phone}) {
      z-index: -1;
      transform: none;
      opacity: 0;
      pointer-events: none;
    }
  }
`;

const Root = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;

  ${({ active }) => active && hoverStyles};

  &:hover {
    ${hoverStyles};
  }
`;

const MobileSlot = styled.div`
  margin-bottom: ${Spacings.xs};
  display: block;
  text-align: center;
  width: 120px;
`;

export interface FunnyButtonProps {
  icon: React.ReactNode;
  text?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

// eslint-disable-next-line react/display-name
export const FunnyButton = React.forwardRef<HTMLDivElement, FunnyButtonProps>(
  ({ icon, onClick, active, text }, ref) => (
    <div>
      <Root onClick={onClick} active={active} ref={ref}>
        <IconWrapper2>
          <IconWrapper>{icon}</IconWrapper>
        </IconWrapper2>
      </Root>

      <MobileSlot>{text}</MobileSlot>
    </div>
  )
);
