import React, { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { UnprefixedTranslationKeys, useTypedTranslation } from '../translations/useTypedTranslation';

import mapJpgSrc from '../assets/images/map.jpg';
import mapWebpSrc from '../assets/images/map.webp';

import wineAvifSrc from '../assets/images/wine.avif';
import wineJpgSrc from '../assets/images/wine.jpg';
import wineWebpSrc from '../assets/images/wine.webp';

import waterJpgSrc from '../assets/images/water.jpg';
import waterWebpSrc from '../assets/images/water.webp';

import shipAvifSrc from '../assets/images/ship.avif';
import shipJpgSrc from '../assets/images/ship.jpg';

import ticketAvifSrc from '../assets/images/ticket.avif';
import ticketJpgSrc from '../assets/images/ticket.jpg';
import ticketWebpSrc from '../assets/images/ticket.webp';

import knittedCoffeeLogoUrlAvif from './../assets/images/minifiedLogos/knitted.avif';
import knittedCoffeeLogoUrl from './../assets/images/minifiedLogos/knitted.jpg';
import knittedCoffeeLogoUrlWebp from './../assets/images/minifiedLogos/knitted.webp';

// import burgerImageUrl from '../assets/iconify/burger.svg';
import coffeeImageUrl from '../assets/iconify/coffee.svg';
import ferryImageUrl from '../assets/iconify/ferry.svg';
import pinBlackImageUrl from '../assets/iconify/pinBlack.svg';
import pizzaImageUrl from '../assets/iconify/pizza.svg';
// import pretzelImageUrl from '../assets/iconify/pretzel.svg';
import shopImageUrl from '../assets/iconify/shop.svg';
import shrimpImageUrl from '../assets/iconify/shrimp.svg';
import turkeyImageUrl from '../assets/iconify/turkey.svg';
// import soupImageUrl from '../assets/iconify/soup.svg';

import cupcakeImageUrl from '../assets/iconify/cupcake.svg';
import ticketImageUrl from '../assets/iconify/ticket.svg';

import knitting2ImageUrl from '../assets/images/knitting2.svg';
import pinImageUrl from '../assets/images/pin.svg';

import halaAvifImageSrc from '../assets/images/hala.avif';
import halaJpgImageSrc from '../assets/images/hala.jpg';
import halaWebpImageSrc from '../assets/images/hala.webp';
import yarnmarkLogoSrcAvif from '../assets/images/yarnmark_logo.avif';
import yarnmarkLogoSrc from '../assets/images/yarnmark_logo.jpg';
import yarnmarkLogoSrcWebp from '../assets/images/yarnmark_logo.webp';

import bistroImageSrc from '../assets/images/bistro_photo.jpg';
import wawelImageSrc from '../assets/images/wawel.jpg';

import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsJpgLandscape from '../assets/images/wools2_landscape.jpg';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';

import olaImageUrlAvif from '../assets/images/pomagamOli.avif';
import olaImageUrlJpg from '../assets/images/pomagamOli.jpg';
import olaImageUrlWebp from '../assets/images/pomagamOli.webp';

import { Icon } from '../components/Icon';

import { Band } from '../components/Band';
import { FunnyButton } from '../components/FunnyButton';
import { Link } from '../components/Link';
import { NiceBox } from '../components/NiceBox';
import { usePhone } from './usePhone';

import { Icon as IconifyIcon } from '@iconify/react';
import { Trans } from 'react-i18next';
import { Header } from '../App.styled';
import { BurgerMenu } from '../components/BurgerMenu';
import { Curtain } from '../components/Curtain';
import { FramedBox } from '../components/FramedBox';
import { ImageButton } from '../components/ImageButton';
import { Picture } from '../components/Picture';
import { RowLayout } from '../components/RowLayout';
import { SideBar } from '../components/SideBar';
import { SubTitle, TextWrapper, Title } from '../components/Title';
import { BrownScale, Colors } from '../styles/theme';
import { FirstAidCard } from './FirstAidCard';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  ActiveImage,
  AnimatedIconWrapper,
  BackgroundIcon,
  BackgroundImage,
  ButtonsLayout,
  ButtonsWrapper,
  CenteredTitle,
  Drawer,
  ImageContentLayout,
  ImageWrapperColumn,
  LayoutWithActiveButton,
  LinkWrapper,
  // PhotosLayout,
  MainBackground,
  Menu,
  MenuBackground,
  MobileBasicInfoSection,
  MobileInfoSectionWrapper,
  MobileLocationButtonWrapper,
  MobilePicture,
  Paragraph,
  SecondaryButton,
  SectionWrapper,
  StyledPageContent,
  Text,
  TextH2,
  Typography,
  VendorsMapDrawer
} from './MainPage.styled';
import { VendorsList } from './VendorsList';
import { WorkshopsCarousel } from './WorkshopsCarousel';
import { WorkshopsSchedule } from './WorkshopsSchedule';
import { useRootIntersectionObserver } from './useRootIntersectionObserver';

import bistrobloniaLogoUrlAvif from './../assets/images/minifiedLogos/bistroblonia.avif';
import bistrobloniaLogoUrl from './../assets/images/minifiedLogos/bistroblonia.jpg';
import bistrobloniaLogoUrlWebp from './../assets/images/minifiedLogos/bistroblonia.webp';

import grandeAppetitoLogoUrlAvif from './../assets/images/minifiedLogos/GrandeAppetito.avif';
import grandeAppetitoLogoUrl from './../assets/images/minifiedLogos/GrandeAppetito.jpg';
import grandeAppetitoLogoUrlWebp from './../assets/images/minifiedLogos/GrandeAppetito.webp';

import grandeAppetitoUrlAvif from './../assets/images/minifiedLogos/grande_photo.avif';
import grandeAppetitoUrl from './../assets/images/minifiedLogos/grande_photo.jpg';
import grandeAppetitoUrlWebp from './../assets/images/minifiedLogos/grande_photo.webp';

import halaLogoUrlAvif from './../assets/images/minifiedLogos/halalogo.avif';
import halaLogoUrl from './../assets/images/minifiedLogos/halalogo.jpg';
import halaLogoUrlWebp from './../assets/images/minifiedLogos/halalogo.webp';

import { FlexColumnLayout } from '../components/FlexColumnLayout';

import sweatersBackgroundUrlAvif from './../assets/backgrounds/sweaters_background.avif';
import sweatersBackgroundUrl from './../assets/backgrounds/sweaters_background.jpg';
import sweatersBackgroundUrlWebp from './../assets/backgrounds/sweaters_background.webp';

import { Button } from '../components/Button';
import { Carouselge } from '../components/Carouselge';
import { CruiseMap } from '../components/CruiseMap';
import { Hall } from '../components/Hall';
import { MenuItem } from '../components/MenuItem';
import firstAidIcon from './../assets/backgrounds/firstAid3.svg';
type ActiveButtonType =
  | 'foodtruckBezogródek'
  | 'gospodaNaPiastowskiej'
  | 'bistroblonia'
  | 'grandeappetito'
  | 'coffeehouse'
  | 'knittedCoffee';

type ActiveButtonToImageConfig = Record<
  ActiveButtonType,
  {
    image: ReactNode;
    text: ReactNode;
    secondaryText?: ReactNode;
  }
>;

type ActiveButtonToImageFunction = (t: (key: UnprefixedTranslationKeys) => string) => ActiveButtonToImageConfig;

const getActiveButtonToImage: ActiveButtonToImageFunction = (t) => ({
  foodtruckBezogródek: {
    image: <ActiveImage src={wawelImageSrc} />,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.bezogrodekDescription')}
        <a href="https://www.instagram.com/bezogrodek/?hl=pl" target="_blank" rel="noreferrer">
          {t('foodBand.lookHere')}
        </a>
      </FlexColumnLayout>
    )
  },
  bistroblonia: {
    image: <ActiveImage src={bistroImageSrc} />,
    secondaryText: t('foodBand.discount15'),
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={120}
          alt="bistroblonia_logo"
          picture={{
            fallbackUrl: bistrobloniaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: bistrobloniaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: bistrobloniaLogoUrlAvif
              }
            ]
          }}
        />
        {t('foodBand.bistroBloniaDescription')}
        <a href="https://bloniabistro.pl/wp-content/uploads/2024/02/menu-BB.pdf" target="_blank" rel="noreferrer">
          {t('foodBand.checkMenu')}
        </a>
      </FlexColumnLayout>
    )
  },
  grandeappetito: {
    image: (
      <Picture
        width={240}
        alt="grandeappetito_logo"
        picture={{
          fallbackUrl: grandeAppetitoUrl,
          sources: [
            {
              type: 'image/webp',
              url: grandeAppetitoUrlWebp
            },
            {
              type: 'image/avif',
              url: grandeAppetitoUrlAvif
            }
          ]
        }}
      />
    ),
    secondaryText: t('foodBand.discount10'),
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={160}
          alt="grandeappetito_logo"
          picture={{
            fallbackUrl: grandeAppetitoLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: grandeAppetitoLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: grandeAppetitoLogoUrlAvif
              }
            ]
          }}
        />
        {t('foodBand.grandeAppetitoDescription')}
        <a href="https://grande-appetito.pl/menu/" target="_blank" rel="noreferrer">
          {t('foodBand.checkMenu')}
        </a>
      </FlexColumnLayout>
    )
  },
  gospodaNaPiastowskiej: {
    image: <ActiveImage src={bistroImageSrc} />,
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
    image: <ActiveImage src={bistroImageSrc} />,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={140}
          alt="knitted_coffee_logo"
          picture={{
            fallbackUrl: knittedCoffeeLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: knittedCoffeeLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: knittedCoffeeLogoUrlAvif
              }
            ]
          }}
        />
        {t('foodBand.knittedCoffeeDescription')}
      </FlexColumnLayout>
    )
  },
  coffeehouse: {
    image: <IconifyIcon icon="noto:teapot" width="288" height="188" />,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={240}
          alt="hala_logo"
          picture={{
            fallbackUrl: halaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: halaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: halaLogoUrlAvif
              }
            ]
          }}
        />
        {t('foodBand.coffeehouse')}
      </FlexColumnLayout>
    )
  }
});

export const MainPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const vendorsBandRef = useRef<HTMLDivElement | null>(null);
  const spotBandRef = useRef<HTMLDivElement | null>(null);
  const cruiseTicketsBandRef = useRef<HTMLDivElement | null>(null);
  const foodBandRef = useRef<HTMLDivElement | null>(null);

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const vendorsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const geoFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const foodFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const shipFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const [activeButton, setActiveButton] = useState<ActiveButtonType>('bistroblonia');

  const [isSpotOpened, setIsSpotOpened] = useState<boolean>(false);
  const [isOlaDrawerOpened, setIsOlaDrawerOpened] = useState<boolean>(false);
  const [isVendorsMapShown, showVendorsMap] = useState<boolean>(false);

  const activeButtonToImage = getActiveButtonToImage(t);

  const observerCallback = useCallback(() => {}, []);

  useRootIntersectionObserver({
    rootRef: pageContentRef,
    elementToObserveRef: ticketsFunnyButtonRef,
    callback: observerCallback
  });

  const closeSideBar = () => setBurgerActive(false);

  const eventLocationCard = useMemo(
    () => (
      <NiceBox width="500px" padding="lg">
        <TextWrapper align="center">
          <Title>{t('spotBand.title')}</Title>
        </TextWrapper>
        <Text>{t('spotBand.address')}</Text>
        <Text>{t('spotBand.description')}</Text>
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

  const [selectedIndex, setSelectedIndex] = useState(0);

  const infoSectionButtons = useMemo(
    () => (
      <ButtonsLayout>
        <FunnyButton
          mobileSlot={t('buttonsBand.tickets.mobileTitle')}
          ref={ticketsFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={ticketImageUrl} />}
          text={t('buttonsBand.tickets.text')}
          onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}
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
        <FunnyButton
          ref={foodFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={pizzaImageUrl} />}
          text={t('buttonsBand.foodButton')}
          onClick={() => foodBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />
        <FunnyButton
          mobileSlot={t('buttonsBand.cruiseButton')}
          ref={shipFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={ferryImageUrl} />}
          text={t('buttonsBand.cruiseButton')}
          onClick={() => cruiseTicketsBandRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />
      </ButtonsLayout>
    ),
    [t]
  );

  const pcInfoSection = useMemo(
    () => (
      <MobileInfoSectionWrapper>
        <Typography size="xxl" weight="bold" paddingBottom="md">
          {t('buttonsBand.firstEvent')}
        </Typography>
        <Typography size="lg" weight="regular" paddingBottom="sm">
          {t('buttonsBand.otherCities')}
        </Typography>
        <Typography size="lg" weight="regular">
          {t('buttonsBand.linksBelow')}
        </Typography>
      </MobileInfoSectionWrapper>
    ),
    [t]
  );

  const mobileInfoSection = useMemo(
    () => (
      <MobileInfoSectionWrapper>
        <Typography size="lg" weight="bold" paddingBottom="md">
          {t('buttonsBand.firstEvent')}
        </Typography>
        <Typography size="md" weight="regular" paddingBottom="sm">
          {t('buttonsBand.otherCities')}
        </Typography>
        <Typography size="md" weight="regular">
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
          <source srcSet={halaWebpImageSrc} type="image/webp" />
          <img loading="lazy" src={halaJpgImageSrc} alt="hala 100-lecia" />
          <MobileLocationButtonWrapper>{eventLocationButton}</MobileLocationButtonWrapper>
        </MobilePicture>

        {eventLocationCard}
      </>
    ),
    [eventLocationCard, eventLocationButton]
  );

  return (
    <StyledPageContent ref={pageContentRef} variant="wide" padding="none">
      {isPhone && <Curtain onClick={() => setBurgerActive(false)} active={burgerActive} />}
      {isPhone && (
        <>
          <Header>
            <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
          </Header>

          <SideBar roundedCorners="left" active={burgerActive}>
            <SideBar.LinkEntry
              to="/"
              onClick={closeSideBar}
              subLinks={[
                {
                  to: '#vendors',
                  name: t('menu.vendors'),
                  icon: <IconifyIcon icon="bi:shop" width="24" />
                },
                {
                  to: '#workshops',
                  name: t('menu.workshops'),
                  icon: <IconifyIcon icon="icons8:student" width="24" />
                },
                {
                  to: '#cruise',
                  name: t('menu.cruise'),
                  icon: <IconifyIcon icon="clarity:ferry-solid" width="24" />
                },
                {
                  to: '#footer',
                  name: t('menu.contact'),
                  icon: <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
                }
              ]}>
              <IconifyIcon icon="game-icons:wool" width="24" />
              Yarnmark
            </SideBar.LinkEntry>

            <SideBar.LinkEntry
              target="_blank"
              to="https://wloczykijki.pl/pl_PL/i/Krakoski-Yarnmark-Welny/41?preview=true"
              onClick={closeSideBar}
              subLinks={[
                {
                  to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832',
                  name: t('menu.entranceTicket'),
                  target: '_blank',
                  icon: <IconifyIcon icon="streamline:tickets" width="24" />
                },
                {
                  to: 'https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358',
                  name: t('menu.workshopTickets'),
                  target: '_blank',
                  icon: <IconifyIcon icon="streamline:tickets" width="24" />
                },
                {
                  to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833',
                  name: t('menu.cruiseTickets'),
                  target: '_blank',
                  icon: <IconifyIcon icon="streamline:tickets" width="24" />
                }
              ]}>
              <IconifyIcon icon="streamline:tickets" width="24" />
              {t('menu.tickets')}
            </SideBar.LinkEntry>

            <SideBar.LinkEntry onClick={closeSideBar} to="/info-for-vendors">
              <IconifyIcon icon="material-symbols:info-outline" width="24" />
              {t('menu.infoForVendors')}
            </SideBar.LinkEntry>

            <SideBar.LinkEntry to="/statutes" onClick={closeSideBar}>
              <IconifyIcon icon="mdi:document-sign" width="24" />
              {t('menu.statutes')}
            </SideBar.LinkEntry>

            <LanguageSwitcher />
          </SideBar>
        </>
      )}

      {!isPhone && (
        <Menu>
          <MenuBackground>
            <MenuItem
              subLinks={[
                {
                  to: '#vendors',
                  name: t('menu.vendors')
                },
                {
                  to: '#workshops',
                  name: t('menu.workshops')
                },
                {
                  to: '#cruise',
                  name: t('menu.cruise')
                },
                {
                  to: '#footer',
                  name: t('menu.contact')
                }
              ]}>
              Yarnmark
            </MenuItem>

            <MenuItem
              subLinks={[
                {
                  to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832',
                  name: t('menu.entranceTicket'),
                  target: '_blank'
                },
                {
                  to: 'https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358',
                  name: t('menu.workshopTickets'),
                  target: '_blank'
                },
                {
                  to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833',
                  name: t('menu.cruiseTickets'),
                  target: '_blank'
                }
              ]}>
              {t('menu.tickets')}
            </MenuItem>

            <MenuItem to="/info-for-vendors">{t('menu.infoForVendors')}</MenuItem>

            <MenuItem to="/statutes">{t('menu.statutes')}</MenuItem>

            <LanguageSwitcher />
          </MenuBackground>
        </Menu>
      )}

      <Band size="xl" padding="xl" justify="flex-start">
        <MainBackground>
          <source srcSet={woolsAvifLandscape} type="image/avif" />
          <source srcSet={woolsWebpLandscape} type="image/webp" />
          <img src={woolsJpgLandscape} alt="wool" />
        </MainBackground>

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

              <Picture
                picture={{
                  fallbackUrl: yarnmarkLogoSrc,
                  sources: [
                    {
                      type: 'image/webp',
                      url: yarnmarkLogoSrcWebp
                    },
                    {
                      type: 'image/avif',
                      url: yarnmarkLogoSrcAvif
                    }
                  ]
                }}
                alt="yarnmark_logo"
                width={156}
              />
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
        <Band size="md" variant="background" color={Colors.pastelGray} padding="xl" narrowContent="fixed">
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
              <source srcSet={halaWebpImageSrc} type="image/webp" />
              <img src={halaJpgImageSrc} alt="hala cracovii" />
            </Band.Picture>
          }>
          <Band.Slot>{eventLocationButton}</Band.Slot>

          <Band.Slot>{eventLocationCard}</Band.Slot>
        </Band>
      )}

      <Band
        id="vendors"
        ref={vendorsBandRef}
        size="lg"
        variant="background"
        padding="xl"
        color={`linear-gradient(to bottom, #eee3de, #fff,  #fff, #fff, #eee3de);`}>
        <Band.Slot flex="auto-grow" size="sm">
          <RowLayout>
            <TextWrapper align="center">
              <Title>{t('vendorsPage.title')}</Title>
            </TextWrapper>

            <Button onClick={() => showVendorsMap((prev) => !prev)}>
              <IconifyIcon icon="fluent-emoji:information" width="48" />
            </Button>
          </RowLayout>

          <VendorsMapDrawer isOpen={isVendorsMapShown}>
            <Button onClick={() => showVendorsMap(false)}>
              <IconifyIcon icon="mingcute:close-fill" />
            </Button>

            <Hall multiplier={19} />
          </VendorsMapDrawer>

          <VendorsList />
        </Band.Slot>
      </Band>

      <Band
        id="workshops"
        gap="md"
        size="lg"
        justify="center"
        padding="xl"
        direction="column"
        variant="background-image"
        background={
          <Band.Picture>
            <source srcSet={sweatersBackgroundUrlAvif} type="image/avif" />
            <source srcSet={sweatersBackgroundUrlWebp} type="image/webp" />
            <img src={sweatersBackgroundUrl} alt="wool background" style={{ objectFit: 'cover' }} />
          </Band.Picture>
        }>
        <CenteredTitle>{t('workshopsBand.title')}</CenteredTitle>
        <WorkshopsCarousel />
      </Band>

      <Band
        id="firstaid"
        gap="xl"
        size="md"
        flexWrap="wrap"
        variant="background"
        justify="space-around"
        color={BrownScale[100]}
        padding="xl">
        <Drawer isOpen={isOlaDrawerOpened}>
          <Button onClick={() => setIsOlaDrawerOpened(false)}>
            <IconifyIcon icon="mingcute:close-fill" />
          </Button>

          <Picture
            picture={{
              fallbackUrl: olaImageUrlJpg,
              sources: [
                {
                  type: 'image/webp',
                  url: olaImageUrlWebp
                },
                {
                  type: 'image/avif',
                  url: olaImageUrlAvif
                }
              ]
            }}
            alt="yarnmark_logo"
            width={320}
            style={{ alignSelf: 'center' }}
          />
        </Drawer>

        <FlexColumnLayout padding="none" gap="none">
          <Paragraph>
            <RowLayout>
              <Button onClick={() => setIsOlaDrawerOpened(true)}>
                <IconifyIcon
                  icon="noto:sos-button"
                  width="88"
                  style={{
                    filter: 'drop-shadow(2px 2px 15px rgba(255, 71, 62, 0.7))'
                  }}
                />
              </Button>

              <FlexColumnLayout padding="xs" gap="none" align="flex-start">
                <Text marginTop="xs">{t('firstAidBand.saveTheLife')}</Text>

                <IconifyIcon
                  icon="fluent:arrow-reply-20-filled"
                  width="40"
                  color="#cf4a4a"
                  style={{
                    transform: 'scaleY(-1)',
                    marginLeft: '18px'
                  }}
                />
              </FlexColumnLayout>
            </RowLayout>
          </Paragraph>

          <Paragraph>
            <h4>"{t('workshops.firstAidQuote')}"</h4>
            <h5>Thomas Keneally</h5>
          </Paragraph>
        </FlexColumnLayout>

        <BackgroundIcon src={firstAidIcon} width={500} />
        <FirstAidCard />
      </Band>

      <Band
        id="schedule"
        size="lg"
        variant="background"
        justify="space-between"
        color={Colors.snow}
        padding="xl"
        align="center"
        direction="column">
        <TextWrapper align="center" marginBottom="lg">
          <Title>{t('scheduleBand.title')}</Title>
        </TextWrapper>

        <WorkshopsSchedule />
      </Band>

      <Band
        id="cruise"
        size="lg"
        ref={cruiseTicketsBandRef}
        narrowContent="auto"
        variant="background-image"
        justify="flex-end"
        background={
          <Band.Picture opacity={0.8} objectFit="cover" filter="grayscale(0.2) brightness(1.3) contrast(0.8)">
            <source srcSet={shipAvifSrc} type="image/avif" />
            <img loading="lazy" src={shipJpgSrc} alt="sailing ship" />
          </Band.Picture>
        }>
        <Band.Slot alignItems="flex-end" width="100%">
          <Carouselge
            height="600px"
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
            indicators="white">
            <Carouselge.Item>
              <Carouselge.ItemBackground
                variant="bottom"
                background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 95%)">
                <source srcSet={waterWebpSrc} type="image/webp" />
                <img src={waterJpgSrc} alt="water visible on the ship" />
              </Carouselge.ItemBackground>

              <TextWrapper>
                <Typography size="xl" weight="bold">
                  {t('cashmereTicketsBand.beautifulCruise')}
                </Typography>
              </TextWrapper>

              <TextH2>{t('cashmereTicketsBand.invitation')}</TextH2>
              <TextH2>{t('cashmereTicketsBand.ship')}</TextH2>
            </Carouselge.Item>

            <Carouselge.Item>
              <Carouselge.ItemBackground
                background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)"
                variant="bottom">
                <source srcSet={wineAvifSrc} type="image/avif" />
                <source srcSet={wineWebpSrc} type="image/webp" />
                <img src={wineJpgSrc} alt="glass of wine" />
              </Carouselge.ItemBackground>

              <TextWrapper>
                <Typography size="xl" weight="bold">
                  {t('cashmereTicketsBand.prosecco.title')}
                </Typography>
              </TextWrapper>

              <FlexColumnLayout gap="sm" padding="none" align="flex-start">
                <Text>{t('cashmereTicketsBand.prosecco.intro')}</Text>
                <Text>{t('cashmereTicketsBand.prosecco.description')}</Text>
              </FlexColumnLayout>
            </Carouselge.Item>

            <Carouselge.Item>
              <Carouselge.ItemBackground
                variant="bottom"
                background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)">
                <source srcSet={ticketAvifSrc} type="image/avif" />
                <source srcSet={ticketWebpSrc} type="image/webp" />
                <img src={ticketJpgSrc} alt="ticket lying around" />
              </Carouselge.ItemBackground>

              <FlexColumnLayout gap="sm" padding="none" align="flex-start">
                <TextWrapper>
                  <Typography size="xl" weight="bold">
                    {t('cashmereTicketsBand.tickets')}
                  </Typography>
                </TextWrapper>

                <LinkWrapper>
                  <Link target="_blank" to="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833">
                    {t('cashmereTicketsBand.buyTickets')}
                  </Link>
                </LinkWrapper>

                <FlexColumnLayout gap="sm" padding="none" align="flex-start">
                  <Typography size="xl" weight="bold">
                    {t('cashmereTicketsBand.map.price')}:
                  </Typography>
                  <Text marginTop="none">130 zł </Text>
                  <Text marginTop="none">
                    <Trans i18nKey="cashmereTicketsBand.map.priceIncludesYarnmarkTicket" />
                  </Text>
                </FlexColumnLayout>
              </FlexColumnLayout>
            </Carouselge.Item>

            <Carouselge.Item>
              <Carouselge.ItemBackground
                variant="bottom"
                background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)">
                <source srcSet={mapWebpSrc} type="image/webp" />
                <img src={mapJpgSrc} alt="map" />
              </Carouselge.ItemBackground>

              <CruiseMap />
            </Carouselge.Item>
          </Carouselge>
        </Band.Slot>
      </Band>

      <Band ref={foodBandRef} size="md" variant="background" color={BrownScale[200]} padding="xl">
        <CenteredTitle>Gdzie zjeść?</CenteredTitle>

        <LayoutWithActiveButton>
          <ButtonsWrapper>
            {/*             <ImageButton
              active={activeButton === 'foodtruckBezogródek'}
              onClick={() => setActiveButton('foodtruckBezogródek')}
              icon={<Icon size="xl" src={burgerImageUrl} />}>
              Food Truck Park Bezogródek
            </ImageButton> */}

            <ImageButton
              active={activeButton === 'bistroblonia'}
              onClick={() => setActiveButton('bistroblonia')}
              icon={<Icon size="xl" src={turkeyImageUrl} />}>
              Bistro Błonia
            </ImageButton>

            <ImageButton
              active={activeButton === 'grandeappetito'}
              onClick={() => setActiveButton('grandeappetito')}
              icon={<Icon size="xl" src={shrimpImageUrl} />}>
              Grande Appetito
            </ImageButton>

            {/*           <ImageButton
              active={activeButton === 'gospodaNaPiastowskiej'}
              onClick={() => setActiveButton('gospodaNaPiastowskiej')}
              icon={<Icon size="xl" src={soupImageUrl} />}>
              Gospoda na Piastowskiej
            </ImageButton> */}

            {/*          <ImageButton onClick={() => setActiveButton('precel')} icon={<Icon size="xl" src={pretzelImageUrl} />}>
              Krakowskie obwarzanki
            </ImageButton> */}

            <ImageButton
              active={activeButton === 'knittedCoffee'}
              icon={<Icon size="xl" src={coffeeImageUrl} />}
              onClick={() => setActiveButton('knittedCoffee')}>
              Knitted Coffee
            </ImageButton>

            <ImageButton
              active={activeButton === 'coffeehouse'}
              icon={<Icon size="xl" src={cupcakeImageUrl} />}
              onClick={() => setActiveButton('coffeehouse')}>
              Kawiarnia na hali
            </ImageButton>
          </ButtonsWrapper>

          <FramedBox padding="md">
            <ImageContentLayout>
              <FlexColumnLayout>
                {activeButtonToImage[activeButton].image}
                <TextWrapper>{activeButtonToImage[activeButton].secondaryText}</TextWrapper>
              </FlexColumnLayout>

              <ImageWrapperColumn>
                <TextWrapper>{activeButtonToImage[activeButton].text}</TextWrapper>
              </ImageWrapperColumn>
            </ImageContentLayout>
          </FramedBox>
        </LayoutWithActiveButton>
      </Band>
    </StyledPageContent>
  );
};
