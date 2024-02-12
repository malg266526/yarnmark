import styled from 'styled-components';
import { BurgerMenu } from './components/BurgerMenu';
import { ScreenSize } from './styles/screeen-size';
import { Spacings } from './styles/spacings';
import { Colors } from './styles/theme';
import { FontSize } from './styles/font-size';

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
    position: sticky;
    top: 0;
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

  @media (max-width: ${ScreenSize.tablet}) {
    padding: ${Spacings.sm};
  }
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

export const TransparentText = styled.h2`
  font-size: ${FontSize.xs};
  color: transparent;
`;
