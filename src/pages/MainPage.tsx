import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { PageContent } from '../components/PageContent';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import bigShopImageUrl from '../assets/iconify/bigshop.svg';
import burgerImageUrl from '../assets/iconify/burger.svg';
import clockImageUrl from '../assets/iconify/clock.svg';
import coffeeImageUrl from '../assets/iconify/coffee.svg';
import ferryImageUrl from '../assets/iconify/ferry.svg';
import goodieBagImageUrl from '../assets/iconify/goodiebag.svg';
import pinBlackImageUrl from '../assets/iconify/pinBlack.svg';
// import pizzaImageUrl from '../assets/iconify/pizza.svg';
import pretzelImageUrl from '../assets/iconify/pretzel.svg';
import shopImageUrl from '../assets/iconify/shop.svg';
import shrimpImageUrl from '../assets/iconify/shrimp.svg';
import soupImageUrl from '../assets/iconify/soup.svg';
import ticketImageUrl from '../assets/iconify/ticket.svg';

import knitting2ImageUrl from '../assets/knitting2.svg';
import pinImageUrl from '../assets/pin.svg';
import stadionImageSrc from '../assets/hala.jpg';

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

import { Icon as IconifyIcon } from '@iconify/react';
import { Trans } from 'react-i18next';
import { Header } from '../App.styled';
import { BurgerMenu } from '../components/BurgerMenu';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { FramedBox } from '../components/FramedBox';
import { ImageButton } from '../components/ImageButton';
import { SideBar } from '../components/SideBar';
import { Tabs } from '../components/Tabs';
import { SubTitle, Title } from '../components/Title';
import { VendorsList } from '../components/VendorsList';
import { Colors } from '../styles/theme';
import {
  ActiveImage,
  AnimatedIconWrapper,
  BackgroundImage,
  ButtonsLayout,
  ButtonsWrapper,
  CenteredTitle,
  Image,
  ImageContentLayout,
  LayoutWithActiveButton,
  Menu,
  PhotosLayout,
  SecondaryButton,
  SectionWrapper,
  Text,
  TextWrapper
} from './MainPage.styled';
import { useRootIntersectionObserver } from './useRootIntersectionObserver';

type ActiveButtonType = 'foodtruckBezogródek' | 'gospodaNaPiastowskiej' | 'pinoGarden' | 'precel' | 'knittedCoffee';
const activeButtonToImage: Record<
  ActiveButtonType,
  {
    image: string;
    text: ReactNode;
  }
> = {
  foodtruckBezogródek: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        150m od Hali znajduje się Food Truck Park Bezogródek. Znajdziecie tam spory wybór jedzenia i napojów
        <a href="https://www.instagram.com/bezogrodek/?hl=pl" target="_blank" rel="noreferrer">
          Zobacz tutaj
        </a>
      </FlexColumnLayout>
    )
  },
  pinoGarden: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        Fani włoskiej kuchni i owoców morza naprzeciwko hali znajdą Pino Garden
        <a href="https://pinogarden.pl/kategoria/karta-menu" target="_blank" rel="noreferrer">
          Zobacz menu tutaj
        </a>
      </FlexColumnLayout>
    )
  },
  precel: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        Przed halą będzie można również zakupić, a jakże, krakoskiego obwarzanka
      </FlexColumnLayout>
    )
  },
  gospodaNaPiastowskiej: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        Miłośnikom polskiej kuchni polecamy Gospodę na Piastowskiej
        <a href="https://gospodapiastowska.pl/menu/" target="_blank" rel="noreferrer">
          Zobacz menu tutaj
        </a>
      </FlexColumnLayout>
    )
  },
  knittedCoffee: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        Na hali będziecie mogli wypić pyszną kawę od Tarasa z Knitted Coffee
      </FlexColumnLayout>
    )
  }
};

type ActiveTab = 'ship' | 'earlyEntrance' | 'bag';
const activeTabToContent: Record<ActiveTab, ReactNode> = {
  earlyEntrance: (
    <FlexColumnLayout gap="sm" padding="none">
      Oficjalne otwarcie bram targów jest o godz. 10:30, natomiast posiadacze biletów VIP mają zagwarantowane
      wcześniejsze wejście na halę - o godz. 10:00
    </FlexColumnLayout>
  ),
  bag: (
    <FlexColumnLayout gap="sm" padding="none">
      Info...
    </FlexColumnLayout>
  ),
  ship: (
    <FlexColumnLayout gap="sm" padding="none">
      Info...
    </FlexColumnLayout>
  )
};

export const MainPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const vendorsBandRef = useRef<HTMLDivElement | null>(null);
  const spotBandRef = useRef<HTMLDivElement | null>(null);
  const workshopsBandRef = useRef<HTMLDivElement | null>(null);
  const vipTicketsBandRef = useRef<HTMLDivElement | null>(null);
  const foodBandRef = useRef<HTMLDivElement | null>(null);

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const vendorsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const geoFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  // const foodFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  // const shipFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const [activeButton, setActiveButton] = useState<ActiveButtonType>('foodtruckBezogródek');
  const [activeTab, setActiveTab] = useState<ActiveTab>('ship');

  const [isSpotOpened, setIsSpotOpened] = useState<boolean>(false);

  const observerCallback = useCallback(() => {}, []);

  useRootIntersectionObserver({
    rootRef: pageContentRef,
    elementToObserveRef: ticketsFunnyButtonRef,
    callback: observerCallback
  });

  const closeSideBar = () => setBurgerActive(false);

  return (
    <PageContent ref={pageContentRef} variant="wide" padding="none">
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
            <Text>{t('welcomeBand.invitation')}</Text>
            <Text>{t('welcomeBand.where')}</Text>
            <Text>{t('welcomeBand.haveFun')}</Text>
            <Text>{t('welcomeBand.seeYou')}</Text>
            <Text>DziergamyNaPolu x Włóczykijki</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="md" variant="background" color={Colors.pastelGray} padding="xl" narrowContent>
        <BackgroundImage src={knitting2ImageUrl} />

        <SectionWrapper>
          <InfoSection>
            <InfoSection.Title>{t('buttonsBand.firstEvent')}</InfoSection.Title>
            <InfoSection.Text>{t('buttonsBand.otherCities')}</InfoSection.Text>
            <InfoSection.Text>{t('buttonsBand.linksBelow')}</InfoSection.Text>
          </InfoSection>

          <ButtonsLayout>
            <FunnyButton
              ref={ticketsFunnyButtonRef}
              icon={<Icon size="xl" zIndex={0} src={ticketImageUrl} />}
              text={t('buttonsBand.ticketButton')}
            />
            <FunnyButton
              ref={vendorsFunnyButtonRef}
              icon={<Icon size="xl" zIndex={0} src={shopImageUrl} />}
              text={t('buttonsBand.vendorsButton')}
              onClick={() => vendorsBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
            <FunnyButton
              ref={geoFunnyButtonRef}
              icon={<Icon size="xl" zIndex={0} src={pinBlackImageUrl} />}
              text={t('buttonsBand.spotButton')}
              onClick={() => spotBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
            {/*             <FunnyButton
              ref={foodFunnyButtonRef}
              icon={<Icon size="xl" zIndex={0} src={pizzaImageUrl} />}
              text={t('buttonsBand.foodButton')}
              onClick={() => foodBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            /> */}
            {/*             <FunnyButton
              ref={shipFunnyButtonRef}
              icon={<Icon size="xl" zIndex={0} src={ferryImageUrl} />}
              text={t('buttonsBand.cashmereButton')}
              onClick={() => vipTicketsBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
            /> */}
          </ButtonsLayout>
        </SectionWrapper>
      </Band>

      <Band
        justify="space-around"
        ref={spotBandRef}
        size="xl"
        padding="sm"
        variant="background-image"
        src={stadionImageSrc}>
        <Band.Slot>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.pl/maps/@50.0572998,19.9107716,3a,75y,214.48h,88.44t/data=!3m6!1e1!3m4!1sVVYRGhxvt5uE6gsr_G7cwA!2e0!7i16384!8i8192?entry=ttu">
            <AnimatedIconWrapper>
              <Icon size="200px" src={pinImageUrl} dropShadow />
            </AnimatedIconWrapper>
          </a>
        </Band.Slot>

        <Band.Slot>
          <NiceBox width="500px" padding="lg">
            <Title align="center">Gdzie?</Title>
            <Text>Aleja Marszałka Ferdynanda Focha 40</Text>
            <Text>{t('spotBand.neighbourhood1')}</Text>
            <Text>{t('spotBand.neighbourhood2')}</Text>

            {!isSpotOpened && (
              <SecondaryButton onClick={() => setIsSpotOpened(true)}>{t('spotBand.howToGetToUs')}</SecondaryButton>
            )}

            {isSpotOpened && (
              <>
                <Title align="center" marginTop="md">
                  {t('spotBand.howToGetToUs')}
                </Title>
                <Text>{t('spotBand.publicTransport')}</Text>
                <Text>{t('spotBand.list')}</Text>
                <Text>
                  <Trans i18nKey="spotBand.option1" />
                </Text>
                <Text>
                  <Trans i18nKey="spotBand.option2" />
                </Text>
                <Text>
                  <Trans i18nKey="spotBand.option3" />
                </Text>
                <Text>
                  <Trans i18nKey="spotBand.option4" />
                </Text>

                <SubTitle align="center" marginTop="md">
                  {t('spotBand.accessibleByCar')}
                </SubTitle>
                <Text>{t('spotBand.byCar')}</Text>

                <p>fot: https://halacracovii.pl/ </p>
              </>
            )}
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band ref={vendorsBandRef} size="md" variant="background" color={Colors.snow} padding="xl">
        <BackgroundImage src={bigShopImageUrl} />

        <Band.Slot flex="auto-grow" size="sm">
          <Title align="center">Wystawcy</Title>
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

        <LayoutWithActiveButton>
          <ButtonsWrapper>
            <ImageButton
              active={activeButton === 'foodtruckBezogródek'}
              onClick={() => setActiveButton('foodtruckBezogródek')}
              icon={<Icon size="xl" src={burgerImageUrl} />}>
              Food Truck Park Bezogródek
            </ImageButton>

            <ImageButton
              active={activeButton === 'pinoGarden'}
              onClick={() => setActiveButton('pinoGarden')}
              icon={<Icon size="xl" src={shrimpImageUrl} />}>
              Pino Garden
            </ImageButton>

            <ImageButton
              active={activeButton === 'gospodaNaPiastowskiej'}
              onClick={() => setActiveButton('gospodaNaPiastowskiej')}
              icon={<Icon size="xl" src={soupImageUrl} />}>
              Gospoda na Piastowskiej
            </ImageButton>

            <ImageButton onClick={() => setActiveButton('precel')} icon={<Icon size="xl" src={pretzelImageUrl} />}>
              Krakowskie obwarzanki
            </ImageButton>

            <ImageButton
              active={activeButton === 'knittedCoffee'}
              icon={<Icon size="xl" src={coffeeImageUrl} />}
              onClick={() => setActiveButton('knittedCoffee')}>
              Knitted Coffee
            </ImageButton>
          </ButtonsWrapper>

          <FramedBox padding="md">
            <ImageContentLayout>
              <ActiveImage src={activeButtonToImage[activeButton].image} />
              <TextWrapper>{activeButtonToImage[activeButton].text}</TextWrapper>
            </ImageContentLayout>
          </FramedBox>
        </LayoutWithActiveButton>
      </Band>

      <Band
        size="md"
        ref={vipTicketsBandRef}
        variant="background"
        justify="space-around"
        color={Colors.isabelline}
        padding="xl"
        align="initial"
        direction="column">
        <Title align="center">Bilety VIP</Title>

        <Text align="center" marginBottom="md">
          Oferujemy możliwość zakupu biletów zwykłych oraz biletów VIP. Bilety VIP oprócz wejściowki na targi obejmują
        </Text>

        <Tabs>
          <Tabs.Tab onClick={() => setActiveTab('ship')} active={activeTab === 'ship'}>
            <Icon size="xl" src={ferryImageUrl} />
            Rejs Dziergostatkiem
          </Tabs.Tab>

          <Tabs.Tab onClick={() => setActiveTab('earlyEntrance')} active={activeTab === 'earlyEntrance'}>
            <Icon size="xl" src={clockImageUrl} />
            Early entrance
          </Tabs.Tab>

          <Tabs.Tab onClick={() => setActiveTab('bag')} active={activeTab === 'bag'}>
            <Icon size="xl" src={goodieBagImageUrl} />
            Pamiątkowa torba targowa
          </Tabs.Tab>
        </Tabs>

        <Tabs.Content>{activeTabToContent[activeTab]}</Tabs.Content>
      </Band>
    </PageContent>
  );
};
