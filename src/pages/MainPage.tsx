import React, { useRef, useState } from 'react';
import { PageContent } from '../components/PageContent';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import bigShopImageUrl from '../assets/iconify/bigshop.svg';
import burgerImageUrl from '../assets/iconify/burger.svg';
import clockImageUrl from '../assets/iconify/clock.svg';
import coffeeImageUrl from '../assets/iconify/coffee.svg';
import ferryImageUrl from '../assets/iconify/ferry.svg';
import goodieBagImageUrl from '../assets/iconify/goodiebag.svg';
import pinBlackImageUrl from '../assets/iconify/pinBlack.svg';
import pizzaImageUrl from '../assets/iconify/pizza.svg';
import pretzelImageUrl from '../assets/iconify/pretzel.svg';
import shopImageUrl from '../assets/iconify/shop.svg';
import shrimpImageUrl from '../assets/iconify/shrimp.svg';
import soupImageUrl from '../assets/iconify/soup.svg';
import ticketImageUrl from '../assets/iconify/ticket.svg';

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

import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { ImageButton } from '../components/ImageButton';
import { ShowOnClickLayout } from '../components/ShowOnClickLayout';
import { ShowOnHoverButton } from '../components/ShowOnHoverButton';
import { ShowOnHoverLayout } from '../components/ShowOnHoverLayout';
import { VendorsList } from '../components/VendorsList';
import { Colors } from '../styles/theme';
import {
  AnimatedIconWrapper,
  BackgroundImage,
  ButtonsLayout,
  CenteredTitle,
  Image,
  Menu,
  PhotosLayout,
  SectionWrapper,
  Text,
  Title
} from './MainPage.styled';
import { Header } from '../App.styled';
import { SideBar } from '../components/SideBar';
import { BurgerMenu } from '../components/BurgerMenu';
import { Icon as IconifyIcon } from '@iconify/react';

export const MainPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const vendorsBandRef = useRef<HTMLDivElement | null>(null);
  const spotBandRef = useRef<HTMLDivElement | null>(null);
  const workshopsBandRef = useRef<HTMLDivElement | null>(null);
  const vipTicketsBandRef = useRef<HTMLDivElement | null>(null);
  const foodBandRef = useRef<HTMLDivElement | null>(null);

  const closeSideBar = () => setBurgerActive(false);

  const width = window.innerWidth;

  return (
    <PageContent variant="wide" padding="none">
      {isPhone && (
        <Header>
          <>
            <SideBar roundedCorners="left" className={burgerActive ? 'visible' : undefined}>
              <SideBar.LinkEntry
                onClick={() => {
                  closeSideBar();
                  () => window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                <IconifyIcon icon="game-icons:wool" width="24" />
                Yarnmark
              </SideBar.LinkEntry>

              <SideBar.LinkEntry
                onClick={() => {
                  () => vendorsBandRef.current?.scrollIntoView({ behavior: 'smooth' });
                  closeSideBar();
                }}>
                <IconifyIcon icon="bi:shop" width="24" />
                {t('menu.vendors')}
              </SideBar.LinkEntry>

              <SideBar.LinkEntry onClick={closeSideBar} href="/info-for-vendors">
                <IconifyIcon icon="material-symbols:info-outline" width="24" />
                {t('menu.infoForVendors')}
              </SideBar.LinkEntry>

              <SideBar.LinkEntry
                onClick={() => {
                  closeSideBar();
                  () => workshopsBandRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                <IconifyIcon icon="icons8:student" width="24" />
                {t('menu.workshops')}
              </SideBar.LinkEntry>

              <SideBar.LinkEntry
                onClick={() => {
                  closeSideBar();
                  () => vipTicketsBandRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                <IconifyIcon icon="clarity:ferry-solid" width="24" />
                {t('menu.vipTickets')}
              </SideBar.LinkEntry>

              <SideBar.LinkEntry
                onClick={() => {
                  closeSideBar();
                  () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}>
                <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
                {t('menu.contact')}
              </SideBar.LinkEntry>
            </SideBar>
            <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
          </>
        </Header>
      )}

      {!isPhone && (
        <Menu>
          <Link color="black" href="/">
            Yarnmark
          </Link>

          <Link
            color="black"
            anchorProps={{
              onClick: () => vendorsBandRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}>
            {t('menu.vendors')}
          </Link>
          <Link color="black" href="/info-for-vendors">
            {t('menu.infoForVendors')}
          </Link>
          <Link
            color="black"
            anchorProps={{
              onClick: () => workshopsBandRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}>
            {t('menu.workshops')}
          </Link>
          <Link
            color="black"
            anchorProps={{
              onClick: () => vipTicketsBandRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}>
            {t('menu.vipTickets')}
          </Link>
          <Link
            color="black"
            anchorProps={{
              onClick: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }}>
            {t('menu.contact')}
          </Link>
        </Menu>
      )}

      <Band size="xl" padding="xl" justify="flex-start">
        <Image src={yarn2ImageUrl} />
        <Band.Slot>
          <NiceBox overflowSize="10px" width="500px" padding="lg">
            <Title>Krakoski Yarnmark Wełny</Title>
            <Text>Serdecznie zapraszamy na I edycję targów wełny w stolicy małopolski!</Text>
            <Text>Yarnmark odbędzie się 27/04/2024r. o godz. 10:30, w Hali 100-lecia KS Cracovia</Text>
            <Text>
              Mamy nadzieję, że będzie to dla Was dzień nie tylko zakupowego szaleństwa i udanych łowów, ale również
              wspólnego dziergania na trybunach i dobrej zabawy.
            </Text>
            <Text>Do zobaczenia!</Text>
            <Text>DziergamyNaPolu x Włóczykijki</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md" variant="background" color={Colors.pastelGray} padding="xl" narrowContent>
        <BackgroundImage src={knitting2ImageUrl} />

        <SectionWrapper>
          <InfoSection>
            <InfoSection.Title>{width}</InfoSection.Title>

            <InfoSection.Title>Pierwsze takie wydarzenie w Krakowie!</InfoSection.Title>
            <InfoSection.Text>
              Toruń, Warszawa, Gdańsk, Wrocław... wreszcie nadszedł czas na spotkanie w Krakowie! Liczymy, że
              zaszczycicie nasz targowy debiut Waszą obecnoscią.
            </InfoSection.Text>
            <InfoSection.Text>
              Poniżej znajdziecie kilka linków, które pomogą Wam zaplanować swój czas w naszym pięknym mieście.
            </InfoSection.Text>
          </InfoSection>

          <ButtonsLayout>
            <FunnyButton icon={<Icon size="xl" src={ticketImageUrl} />} text="Tutaj kupisz bilet" />
            <FunnyButton
              icon={<Icon size="xl" src={shopImageUrl} />}
              text="Sprawdź z jakimi wystawcami się spotkasz"
              onClick={() => vendorsBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
            <FunnyButton
              icon={<Icon size="xl" src={pinBlackImageUrl} />}
              text="Zobacz gdzie jesteśmy i jak tam dojechać"
              onClick={() => spotBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
            <FunnyButton
              icon={<Icon size="xl" src={pizzaImageUrl} />}
              text="Zobacz co zjesz w okolicy"
              onClick={() => foodBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
            <FunnyButton
              icon={<Icon size="xl" src={ferryImageUrl} />}
              text="Sprawdź nasz VIP pakiet"
              onClick={() => vipTicketsBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
          </ButtonsLayout>
        </SectionWrapper>
      </Band>

      <Band justify="space-around" ref={spotBandRef} size="xl" variant="background-image" src={stadionImageSrc}>
        <Band.Slot>
          <a href="https://www.google.pl/maps/place/Hala+100-lecia+KS+Cracovia+wraz+z+Centrum+Sportu+Niepe%C5%82nosprawnych/@50.0570694,19.9078517,17z/data=!3m1!4b1!4m6!3m5!1s0x47165bdbabf291a1:0x3a0607d5947b7ef2!8m2!3d50.0570694!4d19.9104266!16s%2Fg%2F11f5t43046?entry=ttu">
            <AnimatedIconWrapper>
              <Icon size="200px" src={pinImageUrl} dropShadow />
            </AnimatedIconWrapper>
          </a>
        </Band.Slot>

        <Band.Slot>
          <NiceBox width="500px" padding="lg">
            <Title align="center">Gdzie?</Title>
            <Text>Hala 100-lecia KS Cracovia wraz z Centrum Sportu Niepełnosprawnych</Text>
            <Text>Aleja Marszałka Ferdynanda Focha 40</Text>

            <Title marginTop="md" align="center">
              Jak do nas dojechać?
            </Title>
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
      </Band>

      <Band ref={vendorsBandRef} size="md" variant="background" color={Colors.snow} padding="xl">
        <BackgroundImage src={bigShopImageUrl} />

        <Band.Slot flex="auto-grow" size="sm">
          <Title>Wystawcy</Title>
          <VendorsList />
        </Band.Slot>
      </Band>

      <Band
        ref={workshopsBandRef}
        gap="xl"
        size="md"
        variant="background"
        justify="space-around"
        color={Colors.isabelline}
        padding="xl"
        reverseOnMobile>
        <Band.Slot flex="auto-grow">
          <PhotosLayout>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              src={wawelImageSrc}
              slotSize="200px"
              slot={'TODO: foto i tekst od Ani'}>
              <PhotoFrame.Cursive>Pierwsza pomoc</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame maxSize="400px" src={wawelImageSrc}>
              <PhotoFrame.Cursive>TODO: Warsztaty 1</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame maxSize="400px" src={wawelImageSrc}>
              <PhotoFrame.Cursive>TODO: Warsztaty 2</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame maxSize="400px" src={wawelImageSrc}>
              <PhotoFrame.Cursive>TODO: Warsztaty 3</PhotoFrame.Cursive>
            </PhotoFrame>
          </PhotosLayout>
        </Band.Slot>

        <Band.Slot flex="auto-shrink">
          <NiceBox padding="lg">
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

      <Band ref={foodBandRef} size="md" variant="background" color={Colors.pastelGray} padding="xl">
        <CenteredTitle>Gdzie zjeść?</CenteredTitle>
        <ShowOnClickLayout>
          <ImageButton
            icon={<Icon size="xl" src={burgerImageUrl} />}
            photo={wawelImageSrc}
            text={
              <FlexColumnLayout gap="sm" padding="none">
                150m od Hali znajduje się Food Truck Park Bezogródek. Znajdziecie tam spory wybór jedzenia i napojów
                <a href="https://www.instagram.com/bezogrodek/?hl=pl" target="_blank" rel="noreferrer">
                  Zobacz tutaj
                </a>
              </FlexColumnLayout>
            }>
            Food Truck Park Bezogródek
          </ImageButton>

          <ImageButton
            icon={<Icon size="xl" src={shrimpImageUrl} />}
            photo={wawelImageSrc}
            text={
              <FlexColumnLayout gap="sm" padding="none">
                Fani włoskiej kuchni i owoców morza naprzeciwko hali znajdą Pino Garden
                <a href="https://pinogarden.pl/kategoria/karta-menu" target="_blank" rel="noreferrer">
                  Zobacz menu tutaj
                </a>
              </FlexColumnLayout>
            }>
            Pino Garden
          </ImageButton>

          <ImageButton
            icon={<Icon size="xl" src={soupImageUrl} />}
            photo={wawelImageSrc}
            text={
              <FlexColumnLayout gap="sm" padding="none">
                Miłośnikom polskiej kuchni polecamy Gospodę na Piastowskiej
                <a href="https://gospodapiastowska.pl/menu/" target="_blank" rel="noreferrer">
                  Zobacz menu tutaj
                </a>
              </FlexColumnLayout>
            }>
            Gospoda na Piastowskiej
          </ImageButton>

          <ImageButton
            icon={<Icon size="xl" src={pretzelImageUrl} />}
            photo={wawelImageSrc}
            text={
              <FlexColumnLayout gap="sm" padding="none">
                Przed halą będzie można również zakupić, a jakże, krakoskiego obwarzanka
              </FlexColumnLayout>
            }>
            Krakowskie obwarzanki
          </ImageButton>

          <ImageButton
            icon={<Icon size="xl" src={coffeeImageUrl} />}
            photo={wawelImageSrc}
            text={
              <FlexColumnLayout gap="sm" padding="none">
                Na hali będziecie mogli wypić pyszną kawę od Tarasa z Knitted Coffee
              </FlexColumnLayout>
            }>
            Knitted Coffee
          </ImageButton>
        </ShowOnClickLayout>
      </Band>

      <Band
        ref={vipTicketsBandRef}
        size="md"
        variant="background"
        justify="space-around"
        color={Colors.isabelline}
        padding="xl">
        <Band.Slot>
          <NiceBox width="500px" padding="lg">
            <Title>Bilety VIP</Title>
            <Text>Oferujemy możliwość zakupu biletów zwykłych oraz biletów VIP.</Text>
            <Text>Bilety VIP oprócz wejściowki na targi obejmują:</Text>
          </NiceBox>
        </Band.Slot>

        <Band.Slot>
          <ShowOnHoverLayout>
            <ShowOnHoverButton
              icon={<Icon size="xl" src={ferryImageUrl} />}
              text={
                <FlexColumnLayout gap="sm" padding="none">
                  Opis...
                </FlexColumnLayout>
              }>
              Rejs Dziergostatkiem
            </ShowOnHoverButton>

            <ShowOnHoverButton
              icon={<Icon size="xl" src={clockImageUrl} />}
              text={
                <FlexColumnLayout gap="sm" padding="none">
                  Oficjalne otwarcie bram targów jest o godz. 10:30, natomiast posiadacze biletów VIP mają
                  zagwarantowane wcześniejsze wejście na halę - o godz. 10:00
                </FlexColumnLayout>
              }>
              Early entrance
            </ShowOnHoverButton>

            <ShowOnHoverButton
              icon={<Icon size="xl" src={goodieBagImageUrl} />}
              text={
                <FlexColumnLayout gap="sm" padding="none">
                  Info...
                </FlexColumnLayout>
              }>
              Pamiątkowa torba targowa
            </ShowOnHoverButton>
          </ShowOnHoverLayout>
        </Band.Slot>
      </Band>
    </PageContent>
  );
};
