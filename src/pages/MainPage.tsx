import React from 'react';
import { Button } from '../components/Button';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { LinkButton, RowLayout, StyledH1, StyledH2, Box, Text } from './MainPage.styled';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { PageContent } from '../components/PageContent';
import styled, { css } from 'styled-components';
import { PhotoBox } from '../components/PhotoBox';

import wawelImageSrc from '../assets/wawel.jpg';
import rynekImageSrc from '../assets/rynek.jpg';
import bazylikaImageSrc from '../assets/bazylika.webp';
import stadionImageSrc from '../assets/stadion.jpg';
import { Colors, Theme } from '../styles/theme';
import { FramedBox } from '../components/FramedBox';
import { Spacings } from '../styles/spacings';


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, transparent 50%, rgba(255,255,255,1) 100%);
  z-index: 1;
  pointer-events: none;
`;

const CustomLayout = styled.div`
  position: relative;

  > * {
    position: absolute;  
  }

  > :first-child {
    transform: translate(-100px, 20%);
  }

  > :nth-child(2) {
    transform: translate(100%, -50%);
  }

  > :last-child {
    transform: translate(-30px, -100%);
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: ${Spacings.lg};
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: ${Theme.pageContentWidth};
  margin: auto;
  z-index: 2;
`;

const Text = styled.div`
  margin-top: ${Spacings.md};
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
`;

type BandSize = 'xl' | 'md';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '1000px',
  md: '600px'
}

const BandLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const BandRoot = styled.div<BandProps>`
  position: relative;
  ${({ size }) => css`
    min-height: ${bandSizeToHeight[size]};
    height: ${bandSizeToHeight[size]};
    max-height: ${bandSizeToHeight[size]};
  `};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  ${({ variant }) => variant === 'gold' && css`
    background: ${Colors.gold};
  `}

  ${(props) => props.variant === 'background-image' && css`
    background: url(${props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `}
`;

type BandProps = {
  size: 'xl' | 'md';
  title?: React.ReactNode;
  children?: React.ReactNode;
} & ({
  variant?: 'default' | 'gold'
} | {
  variant: 'background-image';
  src: string;
})

const Band = ({ children, title, ...props }: BandProps) => (
  <BandRoot {...props}>
    <TitleWrapper>{title}</TitleWrapper>
    <BandLayout>
      {children}
    </BandLayout>
  </BandRoot>
);

const ClippedImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
`;

const BandSlot = styled.div<{ size: 'xl' | 'sm'; float?: 'left' | 'right' }>`
  position: relative;
  width: ${({ size }) => size === 'xl' ? '70%' : '30%'};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;

  ${({ float }) => float && (float === 'left' ? css`
    > * {
      margin-left: -500px; 
    }
  ` : css`
    > * {
      margin-right: -500px; 
    }
  `)};
`;

export const MainPage = () => {
  const t = useTypedTranslation();

  return (
    <PageContent variant="wide">
      <Band size="md">
        <BandSlot size="xl" >
          <Overlay />
          <ClippedImage src={rynekImageSrc} />
        </BandSlot>

        <BandSlot size="sm" float='left' >
          <FramedBox width='500px' padding="lg" >
            <Title>
              Witamy na stronie pierwszego krakowskiego zlotu drutowych spoceńców!
            </Title>
            <Text>
              Przez ostatnie 6 miesiecy ciężko wszyscy pracowaliśmy zeby zaprezentować wam pierwszy takie wydarzenie w krakowie zorganizowne przez garstkę fanów dziergania. Bywaliśmy juz w na różnych zlotach i wiemy jaka jest frekwencje - liczymy ze i Ty przyjedziesz!
            </Text>
          </FramedBox>
        </BandSlot>
      </Band>

      <Band size="xl" variant="background-image" src={stadionImageSrc} title={<Title>Gdzie?</Title>} >
        <Overlay />
        <BandSlot size="xl" />

        <BandSlot size="sm" >
          <FramedBox width="500px" height="200px" padding="lg">
            Odbędzie sie na Hali 100-lecia KS Cracovia
          </FramedBox>
        </BandSlot>
      </Band>
    </PageContent>
  );
};
