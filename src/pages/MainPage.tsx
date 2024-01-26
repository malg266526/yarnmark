import React, { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { PageContent } from '../components/PageContent';
import { UnprefixedTranslationKeys, useTypedTranslation } from '../translations/useTypedTranslation';

import bigShopImageUrl from '../assets/iconify/bigshop.svg';
import burgerImageUrl from '../assets/iconify/burger.svg';
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

import knitting2ImageUrl from '../assets/images/knitting2.svg';
import pinImageUrl from '../assets/images/pin.svg';

import halaAvifImageSrc from '../assets/images/hala.avif';
import halaJfifImageSrc from '../assets/images/hala.jfif';
import halaJpgImageSrc from '../assets/images/hala_quality.jpg';
import wawelImageSrc from '../assets/images/wawel.jpg';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import yarnmarkLogoSrc from '../assets/images/logos/yarnmark.png';
import { Icon } from '../components/Icon';

import { Band } from '../components/Band';
import { FunnyButton } from '../components/FunnyButton';
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
import { SubTitle, Title, TextWrapper } from '../components/Title';
import { VendorsList } from '../components/VendorsList';
import { Colors } from '../styles/theme';
import {
  ActiveImage,
  AnimatedIconWrapper,
  BackgroundImage,
  ButtonsLayout,
  ButtonsWrapper,
  CenteredTitle,
  Menu,
  ImageContentLayout,
  LayoutWithActiveButton,
  MenuBackground,
  MobileBasicInfoSection,
  MobileInfoSectionWrapper,
  MobileLocationButtonWrapper,
  MobilePicture,
  Picture,
  PhotosLayout,
  SecondaryButton,
  SectionWrapper,
  Text,
  TextH2,
  Typography
} from './MainPage.styled';
import { useRootIntersectionObserver } from './useRootIntersectionObserver';
import { Curtain } from '../components/Curtain';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { RowLayout } from '../components/RowLayout';
import { WorkshopsTimeline } from '../components/WorkshopsTimeline';

type ActiveButtonType = 'foodtruckBezogródek' | 'gospodaNaPiastowskiej' | 'pinoGarden' | 'precel' | 'knittedCoffee';

type ActiveButtonToImageConfig = Record<
  ActiveButtonType,
  {
    image: string;
    text: ReactNode;
  }
>;

type ActiveButtonToImageFunction = (t: (key: UnprefixedTranslationKeys) => string) => ActiveButtonToImageConfig;

const getActiveButtonToImage: ActiveButtonToImageFunction = (t) => ({
  foodtruckBezogródek: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.bezogrodekDescription')}
        <a href="https://www.instagram.com/bezogrodek/?hl=pl" target="_blank" rel="noreferrer">
          {t('foodBand.lookHere')}
        </a>
      </FlexColumnLayout>
    )
  },
  pinoGarden: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.pinoGardenDescription')}
        <a href="https://pinogarden.pl/kategoria/karta-menu" target="_blank" rel="noreferrer">
          {t('foodBand.checkMenu')}
        </a>
      </FlexColumnLayout>
    )
  },
  precel: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.pretzelDescription')}
      </FlexColumnLayout>
    )
  },
  gospodaNaPiastowskiej: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.piastowskaDescription')}
        <a href="https://gospodapiastowska.pl/menu/" target="_blank" rel="noreferrer">
          {t('foodBand.checkMenu')}
        </a>
      </FlexColumnLayout>
    )
  },
  knittedCoffee: {
    image: wawelImageSrc,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.knittedCoffeeDescription')}
      </FlexColumnLayout>
    )
  }
});

type ActiveTab = 'ship' | 'bag';
type WorkshopRoom = 1 | 2 | 3;

export const MainPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const vendorsBandRef = useRef<HTMLDivElement | null>(null);
  const spotBandRef = useRef<HTMLDivElement | null>(null);
  const cashmereTicketsBandRef = useRef<HTMLDivElement | null>(null);
  const foodBandRef = useRef<HTMLDivElement | null>(null);

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const vendorsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const geoFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  // const foodFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  // const shipFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const [activeButton, setActiveButton] = useState<ActiveButtonType>('foodtruckBezogródek');
  const [activeTab, setActiveTab] = useState<ActiveTab>('ship');
  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const [isSpotOpened, setIsSpotOpened] = useState<boolean>(false);

  const activeButtonToImage = getActiveButtonToImage(t);

  const observerCallback = useCallback(() => {}, []);

  useRootIntersectionObserver({
    rootRef: pageContentRef,
    elementToObserveRef: ticketsFunnyButtonRef,
    callback: observerCallback
  });

  const closeSideBar = () => setBurgerActive(false);

  const activeTabToContent: Record<ActiveTab, ReactNode> = {
    bag: (
      <FlexColumnLayout gap="sm" padding="none">
        Info...
      </FlexColumnLayout>
    ),
    ship: (
      <FlexColumnLayout gap="sm" padding="none">
        <Text>{t('cashmereTicketsBand.beautifulCruise')}</Text>
        <Text>{t('cashmereTicketsBand.invitations')}</Text>
      </FlexColumnLayout>
    )
  };

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopName="Pierwsza pomoc" workshopTime="10:00 - 12::00" />
      </WorkshopsTimeline>
    ),
    2: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopName="Pierwsza pomoc" workshopTime="10:00 - 12::00" />
      </WorkshopsTimeline>
    ),
    3: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopName="Pierwsza pomoc" workshopTime="10:00 - 12::00" />
      </WorkshopsTimeline>
    )
  };

  const eventLocationCard = useMemo(
    () => (
      <NiceBox width="500px" padding="lg">
        <TextWrapper align="center">
          <Title>Gdzie?</Title>
        </TextWrapper>
        <Text>Aleja Marszałka Ferdynanda Focha 40</Text>
        <Text>{t('spotBand.neighbourhood1')}</Text>
        <Text>{t('spotBand.neighbourhood2')}</Text>

        {!isSpotOpened && (
          <SecondaryButton onClick={() => setIsSpotOpened(true)}>{t('spotBand.howToGetToUs')}</SecondaryButton>
        )}

        {isSpotOpened && (
          <>
            <TextWrapper align="center" marginTop="md">
              <SubTitle>{t('spotBand.howToGetToUs')}</SubTitle>
            </TextWrapper>
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

            <TextWrapper align="center" marginTop="md">
              <SubTitle>{t('spotBand.accessibleByCar')}</SubTitle>
            </TextWrapper>
            <Text>{t('spotBand.byCar')}</Text>

            <p>
              fot: <a href="https://halacracovii.pl/">https://halacracovii.pl/</a>{' '}
            </p>
          </>
        )}
      </NiceBox>
    ),
    [isSpotOpened, setIsSpotOpened, t]
  );

  const eventLocationButton = useMemo(
    () => (
      <a
        target="_blank"
        rel="noreferrer"
        aria-label="jak dotrzeć na targi z google maps"
        href="https://www.google.pl/maps/@50.0572998,19.9107716,3a,75y,214.48h,88.44t/data=!3m6!1e1!3m4!1sVVYRGhxvt5uE6gsr_G7cwA!2e0!7i16384!8i8192?entry=ttu">
        <AnimatedIconWrapper>
          <Icon size="200px" src={pinImageUrl} dropShadow />
        </AnimatedIconWrapper>
      </a>
    ),
    []
  );

  const infoSectionButtons = useMemo(
    () => (
      <ButtonsLayout>
        <FunnyButton
          mobileSlot={t('buttonsBand.tickets.mobileTitle')}
          ref={ticketsFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={ticketImageUrl} />}
          text={t('buttonsBand.tickets.text')}
        />
        <FunnyButton
          mobileSlot={t('buttonsBand.vendors.mobileTitle')}
          ref={vendorsFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={shopImageUrl} />}
          text={t('buttonsBand.vendors.text')}
          onClick={() => vendorsBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />
        <FunnyButton
          mobileSlot={t('buttonsBand.location.mobileTitle')}
          ref={geoFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={pinBlackImageUrl} />}
          text={t('buttonsBand.location.text')}
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
        onClick={() => cashmereTickets.current?.scrollIntoView({ behavior: 'smooth' })}
      /> */}
      </ButtonsLayout>
    ),
    [t]
  );

  const pcInfoSection = useMemo(
    () => (
      <MobileInfoSectionWrapper>
        <Typography size="40px" weight="bold" paddingBottom="md">
          {t('buttonsBand.firstEvent')}
        </Typography>
        <Typography size="20px" weight="regular" paddingBottom="sm">
          {t('buttonsBand.otherCities')}
        </Typography>
        <Typography size="20px" weight="regular">
          {t('buttonsBand.linksBelow')}
        </Typography>
      </MobileInfoSectionWrapper>
    ),
    [t]
  );

  const mobileInfoSection = useMemo(
    () => (
      <MobileInfoSectionWrapper>
        <Typography size="20px" weight="bold" paddingBottom="md">
          {t('buttonsBand.firstEvent')}
        </Typography>
        <Typography size="16px" weight="regular" paddingBottom="sm">
          {t('buttonsBand.otherCities')}
        </Typography>
        <Typography size="16px" weight="regular">
          {t('buttonsBand.linksBelow')}
        </Typography>
      </MobileInfoSectionWrapper>
    ),
    [t]
  );

  const mobileEventLocationBand = useMemo(
    () => (
      <>
        <MobilePicture>
          <source srcSet={halaAvifImageSrc} type="image/avif" />
          <source srcSet={halaJfifImageSrc} type="image/jpeg" />
          <img src={halaJpgImageSrc} alt="hala 100-lecia" />
          <MobileLocationButtonWrapper>{eventLocationButton}</MobileLocationButtonWrapper>
        </MobilePicture>

        {eventLocationCard}
      </>
    ),
    [eventLocationCard, eventLocationButton]
  );

  return (
    <PageContent ref={pageContentRef} variant="wide" padding="none">
      {isPhone && <Curtain onClick={() => setBurgerActive(false)} active={burgerActive} />}
      {isPhone && (
        <>
          <Header>
            <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
          </Header>

          <SideBar roundedCorners="left" active={burgerActive}>
            <SideBar.LinkEntry
              to="/"
              onClick={() => {
                closeSideBar();
              }}>
              <IconifyIcon icon="game-icons:wool" width="24" />
              Yarnmark
            </SideBar.LinkEntry>

            <SideBar.LinkEntry
              to="#vendors"
              onClick={() => {
                closeSideBar();
              }}>
              <IconifyIcon icon="bi:shop" width="24" />
              {t('menu.vendors')}
            </SideBar.LinkEntry>

            <SideBar.LinkEntry onClick={closeSideBar} to="/info-for-vendors">
              <IconifyIcon icon="material-symbols:info-outline" width="24" />
              {t('menu.infoForVendors')}
            </SideBar.LinkEntry>

            <SideBar.LinkEntry to="#workshops" onClick={closeSideBar}>
              <IconifyIcon icon="icons8:student" width="24" />
              {t('menu.workshops')}
            </SideBar.LinkEntry>

            {/*           <SideBar.LinkEntry
                onClick={() => {
                  closeSideBar();
                  () => cashmereTicketsBandRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                <IconifyIcon icon="clarity:ferry-solid" width="24" />
                {t('menu.cashmereTickets')}

              </SideBar.LinkEntry> */}

            <SideBar.LinkEntry
              to="#footer"
              onClick={() => {
                closeSideBar();
              }}>
              <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
              {t('menu.contact')}
            </SideBar.LinkEntry>

            <LanguageSwitch />
          </SideBar>
        </>
      )}

      {!isPhone && (
        <Menu>
          <MenuBackground>
            <Link color="black" to="/">
              Yarnmark
            </Link>

            <Link color="black" to="#vendors">
              {t('menu.vendors')}
            </Link>

            <Link color="black" to="/info-for-vendors">
              {t('menu.infoForVendors')}
            </Link>

            <Link to="#workshops" color="black">
              {t('menu.workshops')}
            </Link>
            {/*           <Link
              color="black"
              anchorProps={{
                onClick: () => cashmereTicketsBandRef.current?.scrollIntoView({ behavior: 'smooth' })
              }}>
              {t('menu.cashmereTickets')}
            </Link> */}
            <Link color="black" to="#footer">
              {t('menu.contact')}
            </Link>

            <LanguageSwitch />
          </MenuBackground>
        </Menu>
      )}

      <Band size="xl" padding="xl" justify="flex-start">
        <Picture>
          <source srcSet={woolsAvifLandscape} type="image/avif" />
          <img src={woolsWebpLandscape} alt="wool" />
        </Picture>

        <Band.Slot>
          <NiceBox overflowSize="10px" width="500px" padding="lg" marginTop="lg">
            <TextWrapper>
              <Title>Krakoski Yarnmark Wełny</Title>
            </TextWrapper>

            <TextH2>{t('welcomeBand.invitation')}</TextH2>
            <Text>{t('welcomeBand.where')}</Text>
            <Text align="justify" marginBottom="md">
              {t('welcomeBand.haveFun')}
            </Text>

            <RowLayout gap="sm">
              <div>
                <Text>{t('welcomeBand.seeYou')}</Text>
                <Text>DziergamyNaPolu x Włóczykijki</Text>
              </div>

              <img src={yarnmarkLogoSrc} alt="yarnmark_logo" width={156} />
            </RowLayout>
          </NiceBox>
        </Band.Slot>
      </Band>

      {isPhone ? (
        <MobileBasicInfoSection zIndex={1} backgroundUrl={knitting2ImageUrl}>
          {mobileInfoSection}
          {infoSectionButtons}
        </MobileBasicInfoSection>
      ) : (
        <Band size="md" variant="background" color={Colors.pastelGray} padding="xl" narrowContent>
          <BackgroundImage src={knitting2ImageUrl} alt="wool_skeins_background" />

          <SectionWrapper>
            {pcInfoSection}
            {infoSectionButtons}
          </SectionWrapper>
        </Band>
      )}

      {isPhone ? (
        mobileEventLocationBand
      ) : (
        <Band
          justify="space-around"
          ref={spotBandRef}
          size="xl"
          padding="sm"
          variant="background-image"
          background={
            <Band.Picture>
              <source srcSet={halaAvifImageSrc} type="image/avif" />
              <source srcSet={halaJfifImageSrc} type="image/jpeg" />
              <img src={halaJpgImageSrc} alt="hala cracovii" />
            </Band.Picture>
          }>
          <Band.Slot>{eventLocationButton}</Band.Slot>

          <Band.Slot>{eventLocationCard}</Band.Slot>
        </Band>
      )}

      {/* TODO: change color to snow when all bands revealed */}
      <Band id="vendors" ref={vendorsBandRef} size="md" variant="background" color={Colors.isabelline} padding="xl">
        <BackgroundImage src={bigShopImageUrl} alt="shop_icon_background" />

        <Band.Slot flex="auto-grow" size="sm">
          <TextWrapper align="center">
            <Title>{t('vendorsPage.title')}</Title>
          </TextWrapper>
          <VendorsList />
        </Band.Slot>
      </Band>

      <Band
        id="workshops"
        gap="xl"
        size="md"
        variant="background"
        justify="space-around"
        color={Colors.beige1}
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
              <PhotoFrame.Cursive>{t('workshopsBand.firstAid')}</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop1')}>
              <PhotoFrame.Cursive>Uwolnij pomysły</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop2')}>
              <PhotoFrame.Cursive>TODO: Warsztaty 2</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop3')}>
              <PhotoFrame.Cursive>TODO: Warsztaty 3</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop1')}>
              <PhotoFrame.Cursive>Uwolnij pomysły</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop2')}>
              <PhotoFrame.Cursive>TODO: Warsztaty 2</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop3')}>
              <PhotoFrame.Cursive>TODO: Warsztaty 3</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop1')}>
              <PhotoFrame.Cursive>Uwolnij pomysły</PhotoFrame.Cursive>
            </PhotoFrame>
            <PhotoFrame
              variant="slot"
              maxSize="400px"
              slotSize="200px"
              src={wawelImageSrc}
              slot={t('workshopsBand.workshop2')}>
              <PhotoFrame.Cursive>TODO: Warsztaty 2</PhotoFrame.Cursive>
            </PhotoFrame>
          </PhotosLayout>
        </Band.Slot>

        <Band.Slot flex="auto-shrink">
          <NiceBox padding="lg">
            <Title>{t('workshopsBand.title')}</Title>
            <Text>{t('workshopsBand.entertainsAndTeaches')}</Text>
            <Text>{t('workshopsBand.invitation')}</Text>
            <Text>{t('workshopsBand.mayTheHealthBeWithYou')}</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band
        id="schedule"
        size="md"
        variant="background"
        justify="space-around"
        color={Colors.linen}
        padding="xl"
        align="initial"
        direction="column">
        <TextWrapper align="center">
          <Title>{t('scheduleBand.title')}</Title>
        </TextWrapper>

        <Tabs>
          <Tabs.Tab onClick={() => setActiveRoom(1)} active={activeRoom === 1}>
            {t('scheduleBand.room1')}
          </Tabs.Tab>

          <Tabs.Tab onClick={() => setActiveRoom(2)} active={activeRoom === 2}>
            {t('scheduleBand.room2')}
          </Tabs.Tab>

          <Tabs.Tab onClick={() => setActiveRoom(3)} active={activeRoom === 3}>
            {t('scheduleBand.room3')}
          </Tabs.Tab>
        </Tabs>

        <Tabs.Content>{activeRoomToContent[activeRoom]}</Tabs.Content>
      </Band>

      <Band ref={foodBandRef} size="md" variant="background" color={Colors.snow} padding="xl">
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
        ref={cashmereTicketsBandRef}
        variant="background"
        justify="space-around"
        color={Colors.isabelline}
        padding="xl"
        align="initial"
        direction="column">
        <TextWrapper align="center">
          <Title>{t('cashmereTicketsBand.title')}</Title>
        </TextWrapper>

        <Text align="center" marginBottom="md">
          {t('cashmereTicketsBand.ticketDescription')}
        </Text>

        <Tabs>
          <Tabs.Tab onClick={() => setActiveTab('ship')} active={activeTab === 'ship'}>
            <Icon size="xl" src={ferryImageUrl} />
            {t('cashmereTicketsBand.cruise')}
          </Tabs.Tab>

          <Tabs.Tab onClick={() => setActiveTab('bag')} active={activeTab === 'bag'}>
            <Icon size="xl" src={goodieBagImageUrl} />
            {t('cashmereTicketsBand.souverirBag')}
          </Tabs.Tab>
        </Tabs>

        <Tabs.Content>{activeTabToContent[activeTab]}</Tabs.Content>
      </Band>
    </PageContent>
  );
};
