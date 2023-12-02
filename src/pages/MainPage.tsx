import React from 'react';
import { PageContent } from '../components/PageContent';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import pinBlackImageUrl from '../assets/iconify/pinBlack.svg';
import pizzaImageUrl from '../assets/iconify/pizza.svg';
import shopImageUrl from '../assets/iconify/shop.svg';
import ticketImageUrl from '../assets/iconify/ticket.svg';
import bigPretzelImageUrl from '../assets/iconify/bigpretzel.svg';

import knitting2ImageUrl from '../assets/knitting2.svg';
import pinImageUrl from '../assets/pin.svg';
import stadionImageSrc from '../assets/stadion.jpg';

import wawelImageSrc from '../assets/wawel.jpg';
import yarn2ImageUrl from '../assets/yarn2.jpg';
import { Icon } from '../components/Icon';

import { Band } from '../components/Band';
import { FunnyButton } from '../components/FunnyButton';
import { InfoSection } from '../components/InfoSection';
import { Link } from '../components/Link';
import { NiceBox } from '../components/NiceBox';
import { PhotoFrame } from '../components/PhotoBox';
import { usePhone } from './usePhone';

import { Colors } from '../styles/theme';
import {
  AnimatedIconWrapper,
  BackgroundImage,
  ButtonsLayout,
  Image,
  Menu,
  PhotosLayout,
  SectionWrapper,
  Text,
  Title,
  TouristBackground,
  WhiteStuff
} from './MainPage.styled';

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
            <Title>Krakoski Yarnmark Wełny</Title>
            <Text>Serdecznie zapraszamy na I edycję targów wełny w stolicy małopolski!</Text>
            <Text>Yarnmark odbędzie się 27/04/2024r. o godz. 10:30, w Hali 100-lecia KS Cracovia</Text>
            <Text>
              Mamy nadzieję, że będzie to dla Was dzień nie tylko zakupowego szaleństwa i udanych łowów, ale również
              wspólnego dziergania na trybunach i dobrej zabawy.
            </Text>
            <Text>Do zobaczenia!</Text>
            <Text>Włóczykijki x DziergamyNaPolu</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md" variant="background" color={Colors.pastelGray} padding="xl" narrowContent>
        <BackgroundImage src={knitting2ImageUrl} />

        <SectionWrapper>
          <InfoSection>
            <InfoSection.Title>Pierwsze takie wydarzenie w Krakowie!</InfoSection.Title>
            <InfoSection.Text>
              Toruń, Warszawa, Gdańsk, Wrocław... wreszcie nadszedł czas na spotkanie Krakowie! Liczymy, że zaszczycicie
              nasz targowy debiut Waszą obecnoscią.
            </InfoSection.Text>
            <InfoSection.Text>
              Poniżej znajdziecie kilka linków, które pomogą Wam zaplanować swój czas w naszym pięknym mieście.
            </InfoSection.Text>
          </InfoSection>

          <ButtonsLayout>
            <FunnyButton icon={<Icon size="xl" src={ticketImageUrl} />} text="Tutaj kupisz bilet" />
            <FunnyButton icon={<Icon size="xl" src={shopImageUrl} />} text="Sprawdź z jakimi wystawcami się spotkasz" />
            <FunnyButton
              icon={<Icon size="xl" src={pinBlackImageUrl} />}
              text="Zobacz gdzie jesteśmy i jak tam dojechać"
            />
            <FunnyButton icon={<Icon size="xl" src={pizzaImageUrl} />} text="Zobacz co zjesz w okolicy" />
          </ButtonsLayout>
        </SectionWrapper>
      </Band>

      <Band size="xl" variant="background-image" src={stadionImageSrc}>
        <Band.Slot size="sm" float="left">
          <NiceBox width="500px" height="440px" padding="lg">
            <Title>Jak do nas dojechać?</Title>
            <Text>Hala znajduje się przy przystanku "Cracovia Stadion". Z dworca głównego najprościej dojechać:</Text>
            <Text>
              - z przystanku <b>Dworzec Główny Tunel</b> (w przejściu pomiędzy dworcem PKP a Galerią Krakowską należy
              zejść schodami ruchomymi w dół) autobusem <b>192</b>
            </Text>
            <Text>
              - z przystanku <b>Teatr Słowackiego</b> (przed Galerią Krakowską, od strony ulicy Lubicz) autobusem{' '}
              <b>152</b>
            </Text>
          </NiceBox>
        </Band.Slot>

        <Band.Slot size="xl">
          <a href="https://www.google.pl/maps/place/Hala+100-lecia+KS+Cracovia+wraz+z+Centrum+Sportu+Niepe%C5%82nosprawnych/@50.0570694,19.9078517,17z/data=!3m1!4b1!4m6!3m5!1s0x47165bdbabf291a1:0x3a0607d5947b7ef2!8m2!3d50.0570694!4d19.9104266!16s%2Fg%2F11f5t43046?entry=ttu">
            <AnimatedIconWrapper>
              <Icon size="200px" src={pinImageUrl} dropShadow />
            </AnimatedIconWrapper>
          </a>

          <WhiteStuff width="100px" height="10px" />
          {/* <MaskImage /> */}
          {/* <MapIconWrapper>
            <Icon size="xl" src={pinImageUrl} />
          </MapIconWrapper> */}
        </Band.Slot>

        <Band.Slot size="sm" float="right">
          <NiceBox width="500px" height="200px" padding="lg">
            <Title>Gdzie?</Title>
            <Text>Hala 100-lecia KS Cracovia wraz z Centrum Sportu Niepełnosprawnych</Text>
            <Text>Aleja Marszałka Ferdynanda Focha 40</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md" variant="background" color={Colors.white} padding="xl" narrowContent>
        <SectionWrapper>
          <InfoSection>
            <InfoSection.Title>Wystawcy</InfoSection.Title>
          </InfoSection>
        </SectionWrapper>
      </Band>

      <Band size="md" variant="background" color={Colors.isabelline} padding="xl">
        <Band.Slot size="sm">
          <PhotosLayout>
            <PhotoFrame
              variant="slot"
              size="400px"
              src={wawelImageSrc}
              slotSize="200px"
              slot={'TODO: foto i tekst od Ani'}>
              <PhotoFrame.Cursive>Pierwsza pomoc</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame size="400px" src={wawelImageSrc}>
              <PhotoFrame.Cursive>TODO: Warsztaty 1</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame size="400px" src={wawelImageSrc}>
              <PhotoFrame.Cursive>TODO: Warsztaty 2</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame size="400px" src={wawelImageSrc}>
              <PhotoFrame.Cursive>TODO: Warsztaty 3</PhotoFrame.Cursive>
            </PhotoFrame>
          </PhotosLayout>
        </Band.Slot>

        <Band.Slot size="xl" float="right">
          <NiceBox width="500px" padding="lg">
            <Title>Warsztaty</Title>
            <Text>Yarnmark bawi, Yarnmark uczy</Text>
            <Text>
              Zapraszamy do wzięcia udziału w warsztatach dziewiarskich i szydełkowych oraz serdecznie zachęcamy do
              skorzystania z profesjonalnych kursów pierwszej pomocy.
            </Text>
            <Text>Niech zdrowie i bezpieczeństwo będą z Wami!</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md" variant="background" color={Colors.snow} padding="xl" narrowContent>
        <BackgroundImage src={bigPretzelImageUrl} />

        <Band.Slot float="left" size="sm">
          <NiceBox overflowSize="10px" width="500px" padding="lg">
            <Title>Gdzie zjeść?</Title>
            <Text>
              150m od Hali znajduje się Food Truck Park Bezogródek. Znajdziecie tam spory wybór jedzenia i napojów
              (https://www.instagram.com/bezogrodek/?hl=pl).
            </Text>
            <Text>
              Przy Błoniach znajduje się również kilka restauracji, najbliżej Pino Garden
              (https://pinogarden.pl/kategoria/karta-menu/) czy Gospoda na Piastowskiej
              (https://gospodapiastowska.pl/menu/) dla miłośników kuchni polskiej.
            </Text>
            <Text>
              Przed halą będzie można również zakupić, a jakże, krakoskiego obwarzanka, a na hali wypić pyszną kawkę od
              Tarasa z Knitted Coffee
            </Text>
            <Text>Smacznego!</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band variant="background" size="md" color={Colors.pastelGray} padding="xl" narrowContent>
        <Title>Bilety VIP</Title>

        <Band.Slot float="left" size="sm">
          <NiceBox overflowSize="10px" width="200px" padding="lg">
            <Title>Rejs dziergostatkiem</Title>
          </NiceBox>
        </Band.Slot>

        <Band.Slot size="sm">
          <NiceBox overflowSize="10px" width="200px" padding="lg">
            <Title>Early entrance</Title>
          </NiceBox>
        </Band.Slot>

        <Band.Slot float="right" size="sm">
          <NiceBox overflowSize="10px" width="200px" padding="lg">
            <Title>Goodie bag</Title>
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
