import React, { useCallback, useRef, useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

import mapJpgSrc from '../../assets/images/map.jpg';
import mapWebpSrc from '../../assets/images/map.webp';

import wineAvifSrc from '../../assets/images/wine.avif';
import wineJpgSrc from '../../assets/images/wine.jpg';
import wineWebpSrc from '../../assets/images/wine.webp';

import waterJpgSrc from '../../assets/images/water.jpg';
import waterWebpSrc from '../../assets/images/water.webp';

import shipAvifSrc from '../../assets/images/ship.avif';
import shipJpgSrc from '../../assets/images/ship.jpg';

import ticketAvifSrc from '../../assets/images/ticket.avif';
import ticketJpgSrc from '../../assets/images/ticket.jpg';
import ticketWebpSrc from '../../assets/images/ticket.webp';

import olaImageUrlAvif from '../../assets/images/pomagamOli.avif';
import olaImageUrlJpg from '../../assets/images/pomagamOli.jpg';
import olaImageUrlWebp from '../../assets/images/pomagamOli.webp';

import { Band } from '../../components/Band';
import { Link } from '../../components/Link';
import { usePhone } from '../usePhone';

import { Icon as IconifyIcon } from '@iconify/react';
import { Trans } from 'react-i18next';
import { Header } from '../../App.styled';
import { BurgerMenu } from '../../components/BurgerMenu';
import { Curtain } from '../../components/Curtain';
import { Picture } from '../../components/Picture';
import { RowLayout } from '../../components/RowLayout';
import { SideBar } from '../../components/SideBar';
import { TextWrapper } from '../../components/Title';
import { BrownScale } from '../../styles/theme';
import { FirstAidCard } from '../FirstAidCard';
import { LanguageSwitcher } from '../LanguageSwitcher';
import {
  BackgroundIcon,
  Drawer,
  LinkWrapper,
  Paragraph,
  PulseButton,
  StyledPageContent,
  Text,
  TextH2,
  Typography
} from './MainPage.styled';
import { useRootIntersectionObserver } from '../useRootIntersectionObserver';

import { FlexColumnLayout } from '../../components/FlexColumnLayout';

import { Button } from '../../components/Button';
import { Carouselge } from '../../components/Carouselge';
import { CruiseMap } from '../../components/CruiseMap';
import firstAidIcon from '../../assets/backgrounds/firstAid3.svg';

import { useFirstClick } from '../../hooks/useFirstClick';
import { FunnyButtonsSection } from './FunnyButtonsSection';
import { InvitationBand } from './InvitationBand';
import { VendorsSection } from './VendorsSection';
import { LocationSection } from './LocationSection';
import { WorkshopsBand } from './workshops/WorkshopsBand';
import { WorkshopsScheduleBand } from './workshops/WorkshopsScheduleBand';
import { FoodBand } from './FoodBand';
import { Menu } from '../../components/Menu';

export const MainPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const cruiseTicketsBandRef = useRef<HTMLDivElement | null>(null);

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const [isOlaDrawerOpened, setIsOlaDrawerOpened] = useState<boolean>(false);

  const observerCallback = useCallback(() => {}, []);

  useRootIntersectionObserver({
    rootRef: pageContentRef,
    elementToObserveRef: ticketsFunnyButtonRef,
    callback: observerCallback
  });

  const closeSideBar = () => setBurgerActive(false);

  const { wasClickedBefore: wasSosClicked, handleClick: handleSosClick } = useFirstClick('sosPulse');

  const [selectedIndex, setSelectedIndex] = useState(0);

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
                  to: '#food',
                  name: t('buttonsBand.foodButton'),
                  icon: <IconifyIcon icon="uil:pizza-slice" width="24" />
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

            <SideBar.LinkEntry onClick={closeSideBar} to="/hall" target="_blank">
              <IconifyIcon icon="gis:world-map" width="24" />
              {t('buttonsBand.hallMap')}
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
          <Menu.DropdownItem
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
                to: '#food',
                name: t('buttonsBand.foodButton')
              },
              {
                to: '#footer',
                name: t('menu.contact')
              }
            ]}>
            Yarnmark
          </Menu.DropdownItem>

          <Menu.DropdownItem
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
          </Menu.DropdownItem>

          <Menu.LinkItem to="/hall" target="_blank">
            {t('buttonsBand.hallMap')}
          </Menu.LinkItem>

          <Menu.LinkItem to="/info-for-vendors">{t('menu.infoForVendors')}</Menu.LinkItem>

          <Menu.LinkItem to="/statutes">{t('menu.statutes')}</Menu.LinkItem>

          <LanguageSwitcher />
        </Menu>
      )}

      <InvitationBand />

      <FunnyButtonsSection />

      <LocationSection id="location" />

      <VendorsSection id="vendors" />

      <WorkshopsBand id="workshops" />

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
          <Button aria-label="close-drawer-button" onClick={() => setIsOlaDrawerOpened(false)}>
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
            height={450}
            style={{ alignSelf: 'center' }}
          />
        </Drawer>

        <FlexColumnLayout padding="none" gap="none">
          <Paragraph>
            <RowLayout>
              <PulseButton
                aria-label="pomagam-oli-button"
                shouldPulse={!wasSosClicked}
                onClick={() => {
                  setIsOlaDrawerOpened(true);
                  handleSosClick();
                }}>
                <IconifyIcon
                  icon="noto:sos-button"
                  width="88"
                  style={{
                    filter: 'drop-shadow(2px 2px 15px rgba(255, 71, 62, 0.7))'
                  }}
                />
              </PulseButton>

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

        <BackgroundIcon src={firstAidIcon} width={500} alt="first-aid-image" />
        <FirstAidCard />
      </Band>

      <WorkshopsScheduleBand id="schedule" />

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

      <FoodBand />
    </StyledPageContent>
  );
};
