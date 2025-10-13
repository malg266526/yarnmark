import styled from 'styled-components';
import { BurgerMenu } from './components/BurgerMenu';
import { ScreenSize } from './styles/screeen-size';
import { RedesignSpacings } from './styles/spacings';
import { BackgroundColors, TextColors } from './styles/theme';
import { FontSize } from './styles/font-size';


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
  flex-direction: column;

  align-items: center;
  overflow: hidden;

  background: ${BackgroundColors.footer};
  word-break: break-all;

  @media (max-width: ${ScreenSize.phone}) {
    min-height: 200px;
  }
`;

export const LeftBackgroundImage = styled.img<{ src: string }>`
  position: absolute;
  left: 0;
  top: 0;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  opacity: 0.2;
  padding: ${RedesignSpacings.xxl};
  pointer-events: none;
`;

export const TransparentText = styled.h2`
  font-size: ${FontSize.xxs};
  color: transparent;
`;

export const VanillaLink = styled.a`
  color: ${TextColors.primary};
  text-decoration: none;
`;
