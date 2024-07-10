import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import { Band } from '../components/Band';
import { NiceBox } from '../components/NiceBox';
import { TextWrapper, Title } from '../components/Title';
import { Spacings } from '../styles/spacings';
import { BrownScale, Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import { Icon as IconifyIcon } from '@iconify/react';
import { Trans } from 'react-i18next';
import { Header } from '../App.styled';
import { BurgerMenu } from '../components/BurgerMenu';
import { Curtain } from '../components/Curtain';
import { Hall } from '../components/Hall';
import { SideBar } from '../components/SideBar';
import { ScreenSize } from '../styles/screeen-size';
import { StyledPageContent } from './InfoForVendorsPage.styled';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CenteredTitle, MainBackground, Text } from './MainPage.styled';
import { usePhone } from './usePhone';
import { Menu } from '../components/Menu';

export const FlexLayout = styled.div`
  display: flex;
  gap: ${Spacings.md};
  padding: ${Spacings.md};
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: ${Spacings.sm};
  border-bottom: 1px solid ${Colors.pinball};
`;

export const PlainInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 0 ${Spacings.md} ${Spacings.md} ${Spacings.md};
  max-width: 50%;
  width: 50%;
  min-height: 100px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);

  @media (max-width: ${ScreenSize.tablet}) {
    max-width: 92%;
    width: 92%;
  }
`;

export const TitleWrapper = styled.div`
  width: 30%;

  @media (max-width: ${ScreenSize.tablet}) {
    width: 90%;
    margin-bottom: ${Spacings.md};
    text-align: center;
  }
`;

export const HallWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  background-color: ${Colors.white};

  @media (max-width: ${ScreenSize.tablet}) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    align-self: center;
  }

  @media (max-width: ${ScreenSize.phone}) {
    width: 96%;
  }
`;

export const InfoForVendorsPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const closeSideBar = () => setBurgerActive(false);

  const standsBandRef = useRef<HTMLDivElement | null>(null);

  return (
    <StyledPageContent variant="wide" padding="none">
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

            <SideBar.LinkEntry
              to="/info-for-vendors"
              onClick={closeSideBar}
              subLinks={[
                {
                  to: '#stands',
                  name: t('menu.stands'),
                  icon: <IconifyIcon icon="bi:shop" width="24" />
                },
                {
                  to: '#footer',
                  name: t('menu.contact'),
                  icon: <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
                }
              ]}>
              <IconifyIcon icon="game-icons:wool" width="24" />
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
          <Menu.Background>
            <Menu.LinkItem to="/">Yarnmark</Menu.LinkItem>

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

            <Menu.DropdownItem
              subLinks={[
                {
                  to: '#stands',
                  name: t('menu.stands')
                },

                {
                  to: '#footer',
                  name: t('menu.contact')
                }
              ]}>
              {t('menu.infoForVendors')}
            </Menu.DropdownItem>

            <Menu.LinkItem to="/statutes">{t('menu.statutes')}</Menu.LinkItem>

            <LanguageSwitcher />
          </Menu.Background>
        </Menu>
      )}

      <Band size="lg" justify="flex-start" narrowContent="fixed" padding="md">
        <MainBackground>
          <source srcSet={woolsAvifLandscape} type="image/avif" />
          <img src={woolsWebpLandscape} alt="wool" />
        </MainBackground>

        <Band.Slot>
          <NiceBox overflowSize="10px" width="500px" padding="lg">
            <TextWrapper>
              <Title>{t('infoForVendorsPage.title')}</Title>
            </TextWrapper>
            <Text>{t('infoForVendorsPage.invitation')}</Text>
            <Text>{t('infoForVendorsPage.organisationInfo')}</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.isabelline}
        padding="xl">
        <TitleWrapper>
          <CenteredTitle>{t('infoForVendorsPage.registration.title')}</CenteredTitle>
        </TitleWrapper>

        <PlainInfo>
          <Text>
            <Trans i18nKey="infoForVendorsPage.registration.beAVendor" />
          </Text>
          <Text>{t('infoForVendorsPage.registration.start')}</Text>
          <Text>{t('infoForVendorsPage.registration.where')}</Text>
          <a
            href="https://wloczykijki.pl/pl_PL/c/Krakoski-Yarnmark-Welny/355?preview=true"
            target="_blank"
            rel="noreferrer">
            {t('infoForVendorsPage.registration.buyHere')}
          </a>
          <Text>{t('infoForVendorsPage.registration.feedback')}</Text>
          <Text>{t('infoForVendorsPage.registration.return')}</Text>
        </PlainInfo>
      </Band>

      <Band
        id="hall"
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.snow}
        padding="xl">
        <TextWrapper>
          <CenteredTitle>{t('infoForVendorsPage.hallInfo.title')}</CenteredTitle>
        </TextWrapper>

        <PlainInfo>
          <Text>{t('infoForVendorsPage.hallInfo.area')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.openHours')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.ramp')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.participants')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.stands')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.tables')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.extensionCords')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.socialRoom')}</Text>
          <Text>{t('infoForVendorsPage.hallInfo.glassWall')}</Text>
        </PlainInfo>
      </Band>

      <Band
        id="parking"
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={BrownScale[100]}
        padding="xl">
        <TextWrapper>
          <CenteredTitle>{t('infoForVendorsPage.parking.title')}</CenteredTitle>
        </TextWrapper>

        <PlainInfo>
          <Text>{t('infoForVendorsPage.parking.parkingSpace')}</Text>
        </PlainInfo>
      </Band>

      <Band
        id="marketing"
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.beige1}
        padding="xl">
        <TextWrapper>
          <CenteredTitle>{t('infoForVendorsPage.marketing.title')}</CenteredTitle>
        </TextWrapper>

        <PlainInfo>
          <Text>
            <Trans i18nKey="infoForVendorsPage.marketing.sendLogos" />
          </Text>
        </PlainInfo>
      </Band>

      <Band
        id="stands"
        ref={standsBandRef}
        size="sm"
        justify={isPhone ? 'center' : 'space-evenly'}
        variant="background"
        color={BrownScale[100]}
        padding="xl">
        <TextWrapper>
          <CenteredTitle>{t('infoForVendorsPage.stands.title')}</CenteredTitle>
        </TextWrapper>

        <HallWrapper>
          <Hall />
        </HallWrapper>
      </Band>
    </StyledPageContent>
  );
};
