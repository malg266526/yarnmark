import styled, { css } from 'styled-components';
import { Icon } from '../components/Icon';
import { Spacings } from '../styles/spacings';
import { ScreenSize } from '../styles/screeen-size';

export const Text = styled.div<{ marginBottom?: keyof typeof Spacings; align?: 'center' }>`
  margin-top: ${Spacings.md};

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

export const CenteredTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  align-self: center;
`;

export const ButtonsLayout = styled.div`
  display: flex;
  gap: ${Spacings.xl};
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${ScreenSize.phone}) {
    gap: ${Spacings.md};
  }
}
`;

export const Image = styled.img<{ clipped?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: top;
  ${({ clipped }) =>
    clipped &&
    css`
      clip-path: polygon(0 0, 70% 0, 40% 100%, 0 100%);
    `};
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

export const Menu = styled.div`
  position: absolute;
  width: 100%;
  top: 100px;
  left: 0;
  padding-right: 200px;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${ScreenSize.tablet}) {
    padding-right: 0;
  }
`;

export const AnimatedIconWrapper = styled.div`
  padding-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px black;
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
  max-width: 50%;
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
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 80%;
    align-items: center;
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
