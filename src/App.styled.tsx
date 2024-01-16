import styled from 'styled-components';
import { BurgerMenu } from './components/BurgerMenu';
import { SideBar } from './components/SideBar';
import { ScreenSize } from './styles/screeen-size';
import { Spacings } from './styles/spacings';
import { Colors } from './styles/theme';

export const Curtain = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
  opacity: 0;
  transition:
    opacity 250ms ease-in-out,
    z-index 250ms ease-in-out;

  &.active {
    z-index: 1;
    opacity: 1;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: ${Spacings.sm};
  width: 100%;
  background: ${Colors.green3};
  z-index: 100;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${Spacings.sm} ${Spacings.md};
    flex-direction: row;
    justify-content: flex-end;
    background: ${Colors.beige2};
  }
`;

export const Image = styled.img`
  object-fit: cover;
  z-index: -1;
  height: 100vh;
  position: absolute;
  top: 0;
`;

export const Overlay = styled.div`
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  z-index: -1;

  overflow: hidden;
  //FIXME: Try different version of background image and color/overlay of background image and cleanup when final decision is made
  // background: rgba(0, 0, 0, 0.2);
`;

export const Root = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;

  ${SideBar} {
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

    &.visible {
      opacity: 1;
      transform: translate(-100%, 0);
    }
  }

  > :nth-child(2) {
    flex: 1 1 auto;
  }

  ${BurgerMenu} {
    position: relative;
    z-index: 1;
  }
`;

export const Footer = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  display: flex;
  padding: ${Spacings.lg};

  align-items: center;
  overflow: hidden;

  background: ${Colors.snow};
  word-break: break-all;
`;

export const RightBackgroundImage = styled.img<{ src: string }>`
  position: absolute;
  right: 0;
  top: 0;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  opacity: 0.2;
  padding: ${Spacings.xl};
  pointer-events: none;
`;

export const TransparentText = styled.div`
  font-size: 8px;
  color: transparent;
`;
