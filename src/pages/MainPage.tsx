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


const ContentSpacer = styled.div`
  min-height: 150px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, transparent 0%, rgba(255,255,255,1) 85%); 
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

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
`;

type BandSize = 'xl' | 'md';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '1000px',
  md: '500px'
}

const BandLayout = styled.div`
  display: flex;
  width: 100%;
`;

const BandRoot = styled.div<BandProps>`
  position: relative;
  min-height: ${({ size }) => bandSizeToHeight[size]};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
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

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const BandSlot = styled.div<{ size: 'xl' | 'sm' }>`
  width: ${({ size }) => size === 'xl' ? '70%' : '30%'};

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0px;
`;

export const MainPage = () => {
  const t = useTypedTranslation();

  return (
    <PageContent variant="wide">
      <ContentSpacer />

      <Band size="md">
        <BandSlot size="xl" >
          <CustomLayout>
            <PhotoBox src={wawelImageSrc} width="450px" />
            <PhotoBox src={rynekImageSrc} width="450px" />
            <PhotoBox src={bazylikaImageSrc} width="450px" />
          </CustomLayout>
        </BandSlot>

        <BandSlot size="sm" >
          Test
        </BandSlot>
      </Band>

      <Band size="xl" variant="background-image" src={stadionImageSrc} title={<Title>Gdzie?</Title>} >
        <Overlay />
        <BandSlot size="xl" />

        <BandSlot size="sm" >
          <FramedBox width="500px" height="200px">
            Odbędzie sie na Hali 100-lecia KS Cracovia
          </FramedBox>
        </BandSlot>
      </Band>
    </PageContent>
  );
};
