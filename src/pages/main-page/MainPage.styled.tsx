import styled, { css, keyframes } from 'styled-components';
import { Icon } from '../../components/Icon';
import { Spacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import { Carouselge } from '../../components/Carouselge';
import { PageContent } from '../../components/PageContent';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { FontSize } from '../../styles/font-size';
import { DropShadow, Radius } from '../../styles/cards';
import { Picture } from '../../components/Picture';
import { Button } from '../../components/Button';

export const StyledPageContent = styled(PageContent)`
  ${Carouselge} {
    width: 550px;

    @media (max-width: ${ScreenSize.tablet}) {
      width: 100%;
    }
  }

  ${LanguageSwitcher} {
    /*     position: absolute;
    z-index: 1;
    top: 0;
    right: ${Spacings.md};

    @media (max-width: ${ScreenSize.phone}) {
      top: initial;
      bottom: 0;
    } */
  }
`;

export const Text = styled.p<{
  marginBottom?: keyof typeof Spacings;
  marginTop?: keyof typeof Spacings;
  align?: 'center' | 'justify';
  bold?: boolean;
}>`
  white-space: break-spaces;
  margin-top: ${({ marginTop }) => Spacings[marginTop || 'md']};
  margin-bottom: 0;
  font-size: ${FontSize.md};

  ${({ bold }) =>
    bold &&
    css`
      font-weight: 600;
    `};

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${Spacings[marginBottom]};
    `};
`;

export const TextH2 = styled.h2`
  font-size: ${FontSize.md};
  font-weight: 400;
  margin-top: ${Spacings.md};
  margin-bottom: 0;
`;

export const CenteredTitle = styled.h2`
  font-size: ${FontSize.xxl};
  font-weight: 600;
  align-self: center;
  z-index: 2;
`;

export const SecondaryButton = styled.button`
  cursor: pointer;
  font-size: ${FontSize.lg};
  font-weight: 600;
  text-decoration: underline;
  margin-top: ${Spacings.sm};
  background-color: transparent;
  border: none;
`;

export const ButtonsLayout = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: ${Spacings.xl};
  flex: 1 1 auto;
  // align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${ScreenSize.phone}) {
    gap: ${Spacings.md};
  }
`;

type FontVariant = 'regular' | 'bold' | 'light';
const fontVariantToWeight: Record<FontVariant, number> = {
  bold: 600,
  light: 200,
  regular: 500
};

export const Typography = styled.div<{
  size: keyof typeof FontSize;
  weight: FontVariant;
  paddingBottom?: keyof typeof Spacings;
}>`
  ${({ size, weight }) => css`
    font-size: ${FontSize[size]};
    font-weight: ${fontVariantToWeight[weight]};
  `};

  ${({ paddingBottom }) =>
    paddingBottom &&
    css`
      padding-bottom: ${Spacings[paddingBottom]};
    `};
`;

export const MobileInfoSectionWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export const MobileBasicInfoSection = styled.div<{ backgroundUrl: string; zIndex?: number }>`
  position: relative;
  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `};

  padding: ${Spacings.lg};
  background: #d7c9c0;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(${({ backgroundUrl }) => backgroundUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20%;
    opacity: 0.3;
  }
`;

export const MobileLocationButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(10%, -50%);
`;

export const MobilePicture = styled.picture`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: top;
  z-index: 0;

  > img {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

export const MainBackground = styled.picture<{ clipped?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: top;

  > img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: top;
  }

  ${({ clipped }) =>
    clipped &&
    css`
      clip-path: polygon(0 0, 70% 0, 40% 100%, 0 100%);
    `};

  > img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

export const BackgroundImage = styled.img<{ src: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  opacity: 0.2;
  padding: ${Spacings.xl};
`;

export const PhotosLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  gap: ${Spacings.md};

  @media (max-width: ${ScreenSize.tablet}) {
    width: initial;
  }
`;

export const AnimatedIconWrapper = styled.div`
  padding-bottom: 20px;
  border-radius: 10px;
  box-shadow: none;
  border: 6px solid transparent;
  transition: all 200ms ease-in-out;

  &:hover {
    box-shadow:
      1px 1px 5px 1px #333,
      inset 1px 1px 5px 1px #333;
    border-color: white;
  }

  @keyframes jump {
    0% {
      transform: translate(0, 0);
    }

    5% {
      transform: translate(0, -100px);
    }

    10% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes jump2 {
    0% {
      transform: translate(0, 0);
    }

    40% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(0, -50px);
    }
  }

  > ${Icon} {
    /* cubic-bezier(.72,2.04,.68,.87) */
    animation: 1s ease-in-out infinite alternate running jump2;
    cursor: pointer;
  }

  > ${Icon}:hover {
    animation-play-state: paused;
  }
`;

export const ActiveImage = styled.img`
  max-height: 300px;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
    max-width: 100%;
  }
`;

export const ActivePicture = styled(Picture)`
  max-height: 300px;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
    max-width: 100%;
  }
`;

export const ImageContentLayout = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: row-reverse;
  gap: ${Spacings.md};

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-width: 100%;
    align-items: center;
    gap: ${Spacings.md};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
  min-width: 250px;

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: ${Spacings.md};

    > * {
      flex: 1 1 auto;
    }
  }
`;

export const TextWrapper = styled.div`
  @media (max-width: ${ScreenSize.phone}) {
    flex-wrap: wrap;
  }
`;

export const LayoutWithActiveButton = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding: ${Spacings.xs};
  max-width: 100%;
  gap: ${Spacings.lg};
  flex-wrap: wrap;

  > ${ButtonsWrapper} {
    /* flex: 1 0 auto; */
  }

  @media (max-width: ${ScreenSize.tablet}) {
    margin-top: ${Spacings.md};
    flex-direction: column;
    max-width: 100vw;
  }
`;

export const AbsoluteWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  right: 80px;
  opacity: 0.5;
  filter: grayscale(0.5);
`;

export const WorkshopsWrapper = styled.div`
  width: 100%;
  padding: 0 ${Spacings.xxl};
`;

export const Paragraph = styled.div`
  max-width: 460px;

  padding: ${Spacings.md};
`;

export const BackgroundIcon = styled.img`
  position: absolute;
  top: 400px;
  left: 120px;
  opacity: 0.75;

  @media (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

export const LinkWrapper = styled.div`
  margin-left: -8px;
`;

export const Drawer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: ${Spacings.xl};
  left: 0;
  background-color: white;
  z-index: 2;
  box-shadow: ${DropShadow.md};
  border-radius: ${Radius.md};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  padding: ${Spacings.md};
  transition: all 0.7s ease-in-out;

  transform: ${({ isOpen }) => (isOpen ? `translateX(0)` : `translateX(-100%)`)};
`;

export const ImageWrapperColumn = styled(TextWrapper)`
  max-width: 50%;
  padding-top: ${Spacings.md};

  @media (max-width: ${ScreenSize.phone}) {
    max-width: 100%;
  }
`;

export const VendorsMapDrawer = styled(Drawer)<{ isOpen: boolean }>`
  left: unset;
  top: 0;
  right: -${Spacings.xl};
  transition: all 0.4s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? `translateX(0)` : `translateX(100%)`)};

  @media (max-width: ${ScreenSize.tablet}) {
    right: -${Spacings.md};
  }

  @media (max-width: ${ScreenSize.phone}) {
    right: -${Spacings.sm};
  }
`;

const pulse = keyframes`
  0% {
		transform: scale(0.92);
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.92);
	}
`;

const pulseAnimation = css`
  animation: ${pulse} 1s infinite;
`;

export const PulseButton = styled(Button)<{ shouldPulse?: boolean }>`
  ${({ shouldPulse }) => shouldPulse && pulseAnimation};
  transform: scale(1);
`;
