import React from 'react';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { PageContent } from '../components/PageContent';
import styled, { css } from 'styled-components';

import wawelImageSrc from '../assets/wawel.jpg';
import stadionImageSrc from '../assets/stadion.jpg';
import { Spacings } from '../styles/spacings';
import { Icon } from '../components/Icon';
import ticketImageUrl from '../assets/ticket.svg';
import infoImageUrl from '../assets/info.svg';
import shopImageUrl from '../assets/shop.svg';
import pinImageUrl from '../assets/pin.svg';
import pinBlackImageUrl from '../assets/pinBlack.svg';
import knitting2ImageUrl from '../assets/knitting2.svg';
import touristImageUrl from '../assets/tourist.svg';
import yarn2ImageUrl from '../assets/yarn2.jpg';

import { FunnyButton } from '../components/FunnyButton';
import { InfoSection } from '../components/InfoSection';
import { Band } from '../components/Band';
import { NiceBox } from '../components/NiceBox';
import { PhotoFrame } from '../components/PhotoBox';
import { Link } from '../components/Link';
import { usePhone } from './usePhone';

const Text = styled.div`
  margin-top: ${Spacings.md};
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
`;

const ButtonsLayout = styled.div`
  display: flex;
  gap: ${Spacings.xl};
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img<{ clipped?: boolean }>`
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

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

const BackgroundImage = styled.img<{ src: string }>`
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

const TouristBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: url(${touristImageUrl}) no-repeat center;
  background-size: 400px;
  background-position: 20%;
`;

const PhotosLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Spacings.md};
`;

const Menu = styled.div`
  position: absolute;
  width: 100%;
  top: 100px;
  left: 0;
  padding-right: 200px;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AnimatedIconWrapper = styled.div`
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

const WhiteStuff = styled.div<{ width: `${number}${'px' | '%'}`; height: `${number}${'px' | '%'}` }>`
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, calc(-50% - 20px));
  top: 100%;
  box-shadow: 1px 1px 5px 1px #333;
  z-index: 0;

  ${({ height, width }) => css`
    width: ${width};
    height: ${height};
  `};
`;

export const MainPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <PageContent variant="wide" padding="none">
      {!isPhone && (
        <Menu>
          <Link color="black" href="/">
            Yarnmark
          </Link>

          <Link color="black" href="/vendors">
            {t('menu.vendors')}
          </Link>
          <Link color="black" href="/info-for-vendors">
            {t('menu.infoForVendors')}
          </Link>
          <Link color="black" href="/workshops">
            {t('menu.workshops')}
          </Link>
          <Link color="black" href="/vip-tickets">
            {t('menu.vipTickets')}
          </Link>
          <Link color="black" href="/contact">
            {t('menu.contact')}
          </Link>
          <Link color="black" href="/about-us">
            {t('menu.aboutUs')}
          </Link>
        </Menu>
      )}

      <Band size="xl" narrowContent justify="end">
        <Image src={yarn2ImageUrl} />
        <Band.Slot float="left" size="sm">
          <NiceBox overflowSize="10px" width="500px" padding="lg">
            <Title>Witamy na stronie pierwszego krakowskiego zlotu drutowych spoceńców!</Title>
            <Text>
              Przez ostatnie 6 miesiecy ciężko wszyscy pracowaliśmy zeby zaprezentować wam pierwszy takie wydarzenie w
              krakowie zorganizowne przez garstkę fanów dziergania. Bywaliśmy juz w na różnych zlotach i wiemy jaka jest
              frekwencje - liczymy ze i Ty przyjedziesz!
            </Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md" variant="background" color="#d7c9c0" padding="xl" narrowContent>
        <BackgroundImage src={knitting2ImageUrl} />

        <SectionWrapper>
          <InfoSection>
            <InfoSection.Title>Pierwsze takie wydarzenie w Krakowie!</InfoSection.Title>
            <InfoSection.Text>
              Wiele jest takich wydarzeń: Knicenie we Wrocławiu, Zbieranie Bawełny w Poznaniu i Robienie na drtutach w
              Łodziz. Teraz do tej listy dołącza Krakowski Yarnmark. Poniżej Garść linków do pomocy
            </InfoSection.Text>
          </InfoSection>

          <ButtonsLayout>
            <FunnyButton
              icon={<Icon size="xl" src={ticketImageUrl} />}
              text="Ten link przekieruje Cie do zakupu biletow na stronie www.kupujemybilety.pl"
            />
            <FunnyButton
              icon={<Icon size="xl" src={shopImageUrl} />}
              text="Zobacz jakie stoiska beda dostepne na Yarnmarku!"
            />
            <FunnyButton icon={<Icon size="xl" src={infoImageUrl} />} text="Zobacz jak dojechac do Yarnmarku" />
            <FunnyButton icon={<Icon size="xl" src={pinBlackImageUrl} />} text="Zobacz jak dojechac do Yarnmarku" />
          </ButtonsLayout>
        </SectionWrapper>
      </Band>

      <Band size="xl" variant="background-image" src={stadionImageSrc}>
        <Band.Slot size="xl">
          <AnimatedIconWrapper>
            <Icon size="200px" src={pinImageUrl} dropShadow />
          </AnimatedIconWrapper>

          <WhiteStuff width="100px" height="10px" />
          {/* <MaskImage /> */}
          {/* <MapIconWrapper>
            <Icon size="xl" src={pinImageUrl} />
          </MapIconWrapper> */}
        </Band.Slot>

        <Band.Slot size="sm" float="right">
          <NiceBox width="500px" height="200px" padding="lg">
            <Title>Gdzie?</Title>
            Odbędzie sie na Hali 100-lecia KS Cracovia
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md" variant="background" color="#f7f0f0" padding="xl">
        <Band.Slot size="sm">
          <PhotosLayout>
            <PhotoFrame variant="slot" size="400px" src={wawelImageSrc} slotSize="200px" slot={'test'}>
              <PhotoFrame.Cursive>Test</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame size="400px" src={wawelImageSrc} />
            <PhotoFrame size="400px" src={wawelImageSrc} />
            <PhotoFrame size="400px" src={wawelImageSrc} />
          </PhotosLayout>
        </Band.Slot>

        <Band.Slot size="xl" float="right">
          <NiceBox width="500px" padding="lg">
            <Title>Wspolpracujemy z WloczkamiPL oraz Kieblasy na dutach</Title>
            Jeżeli przy kupowaniu w wybranych sklepach podacie haslo otrzymacie rabat
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md">
        <TouristBackground />

        <Band.Slot size="sm">
          <PhotosLayout>
            <PhotoFrame variant="no-slot" size="200px" src={wawelImageSrc} />
          </PhotosLayout>
        </Band.Slot>

        <Band.Slot size="xl">
          <NiceBox width="500px" height="200px" padding="lg">
            <Title>Zwiedzanie Krakowa</Title>
            Wizyta w Krakowie to rowniez okazja do
          </NiceBox>
        </Band.Slot>
      </Band>
    </PageContent>
  );
};
