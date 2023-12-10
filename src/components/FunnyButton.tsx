import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import knittingImageUrl from '../assets/knitting.svg';
import { Icon } from './Icon';

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
  box-shadow: 1px 1px 3px 0px black;
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

const Root = styled.div`
  position: relative;

  &:hover {
    ${IconWrapper2} {
      box-shadow: 1px 1px 3px 0px black;
    }

    ${IconWrapper2}:after {
      opacity: 1;
    }
  }

  &:hover ${TextWrapper} {
    transform: scale(1) ${wrapperTranslation};
    opacity: 1;
  }
`;

const KnittingIconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
`;

export interface FunnyButtonProps {
  icon: React.ReactNode;
  text?: React.ReactNode;
  onClick?: () => void;
}

export const FunnyButton = ({ icon, text, onClick }: FunnyButtonProps) => (
  <Root onClick={onClick}>
    <IconWrapper2>
      <IconWrapper>{icon}</IconWrapper>
    </IconWrapper2>

    {text && (
      <TextWrapper>
        <KnittingIconWrapper>
          <Icon size="xl" src={knittingImageUrl} />
        </KnittingIconWrapper>
        {text}
      </TextWrapper>
    )}
  </Root>
);
