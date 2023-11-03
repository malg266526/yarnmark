import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { Page } from '../components/PageContent';
import { SideBar } from '../components/SideBar';
import { BurgerMenu } from '../components/BurgerMenu';

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
  padding-right: ${Spacings.lg};
  padding-left: ${Spacings.lg};
  padding-top: ${Spacings.xs};
  padding-bottom: ${Spacings.md};
  width: 100%;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${Spacings.sm} ${Spacings.md};
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const StyledPage = styled(Page)`
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

  ${BurgerMenu} {
    position: relative;
    z-index: 1;
  }
`;

export const RowLayout = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: ${ScreenSize.tablet}) {
    flex-direction: column;
    gap: ${Spacings.md};
  }
`;

export const Logo = styled.img`
  align-self: center;
  max-width: 100%;
  max-height: 100%;
`;

export const LinkButton = styled.a`
  align-self: center;
`;

export const Details = styled.div`
  font-family: 'Roboto';
  font-weight: 300;
`;

export const StyledH3 = styled.h3`
  font-weight: 300;
`;

export const StyledH4 = styled.h4`
  font-weight: 300;
`;

export const Banner = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

export const PhotoFrame = styled.div<{ size?: 'small' | 'large' }>`
  width: ${({ size }) => (size === 'large' ? '260px' : '200px')};
  height: ${({ size }) => (size === 'large' ? '260px' : '200px')};
  border: 6px solid ${Colors.white};
  border-bottom: 36px solid ${Colors.white};
  background-color: ${Colors.white};
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;
