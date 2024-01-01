import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import yarn2ImageUrl from '../assets/images/wools2.jpeg';
import { Band } from '../components/Band';
import { NiceBox } from '../components/NiceBox';
import { Title } from '../components/Title';
import { PageContent } from '../components/PageContent';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import { CenteredTitle, Image, Text, Menu } from './MainPage.styled';
import { Link } from '../components/Link';
import { usePhone } from './usePhone';
import { Hall } from '../components/Hall';
import { HallLegend } from '../components/HallLegend';
import { BurgerMenu } from '../components/BurgerMenu';
import { Header } from '../App.styled';
import { SideBar } from '../components/SideBar';
import { Icon as IconifyIcon } from '@iconify/react';
import { ScreenSize } from '../styles/screeen-size';

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
  padding: 0 ${Spacings.sm} ${Spacings.md} ${Spacings.sm};
  max-width: 50%;
  width: 50%;
  min-height: 100px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);

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
  min-width: 45%;
  justify-content: space-between;
  display: flex;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  background-color: ${Colors.white};
  padding: ${Spacings.md};

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
    <PageContent variant="wide" padding="none">
      {isPhone && (
        <Header>
          <>
            <SideBar roundedCorners="left" className={burgerActive ? 'visible' : undefined}>
              <SideBar.LinkEntry
                href="/"
                onClick={() => {
                  closeSideBar();
                }}>
                <IconifyIcon icon="game-icons:wool" width="24" />
                Yarnmark
              </SideBar.LinkEntry>

              <SideBar.LinkEntry
                onClick={() => {
                  standsBandRef.current?.scrollIntoView({ behavior: 'smooth' });
                  closeSideBar();
                }}>
                <IconifyIcon icon="bi:shop" width="24" />
                Stoiska
              </SideBar.LinkEntry>

              <SideBar.LinkEntry
                onClick={() => {
                  closeSideBar();
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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
              onClick: () => standsBandRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}>
            Stoiska
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

      <Band size="md" justify="flex-start" narrowContent padding="md">
        <Image src={yarn2ImageUrl} />
        <Band.Slot>
          <NiceBox overflowSize="10px" width="500px" padding="lg">
            <Title>{t('infoForVendorsPage.title')}</Title>
            <Text>Serdecznie Was zapraszamy do wzięcia udziału w I edycji Krakoskiego Yarnmarku Wełny!</Text>
            <Text>Poniżej kilka informacji organizacyjnych dla Was</Text>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band size="sm" variant="background" justify="center" align="center" color={Colors.isabelline} padding="xl">
        <TitleWrapper>
          <CenteredTitle>Hala</CenteredTitle>
        </TitleWrapper>

        <PlainInfo>
          <Text>Mamy do dyspozycji powierzchnię 1142m2.</Text>
          <Text>Hala będzie dostępna od północy, na miejscu będą panowie portierzy.</Text>

          {/*  <Text>Hala zostanie otwarta o godz. ?? .</Text>
          <Text>Hala znajduje się na tym samym poziomie co parking.</Text>
          <Text>TODO: dodać opis do stoisk - wybór z mapki, zapisy na stoiska</Text>
          <Text>Istnieje możliwość wykupienia stoiska podwójnego.</Text>
          <Text>TODO: Jakieś info o stołach i krzesłach??</Text>
          <Text>TODO: Wymiary hali to: ??</Text> */}
        </PlainInfo>
      </Band>

      <Band size="sm" variant="background" justify="center" align="center" color={Colors.snow} padding="xl">
        <TitleWrapper>
          <CenteredTitle>Parking</CenteredTitle>
        </TitleWrapper>

        <PlainInfo>
          <Text>Każdemu wystawcy na dzień targów przysługuje darmowe miejsce parkingowe przy hali</Text>
        </PlainInfo>
      </Band>

      <Band size="sm" variant="background" justify="center" align="center" color={Colors.beige1} padding="xl">
        <TitleWrapper>
          <CenteredTitle>Marketing</CenteredTitle>
        </TitleWrapper>

        <PlainInfo>
          <Text>
            Zachęcamy do przesłania swojego na logo na adres email <b>strona.dziergamynapolu@gmail.com</b>, umieścimy je
            w zakładce "Wystawcy" i w ten sposób poinformujemy dziewiarki i dziewiarzy, że z nami będziecie
          </Text>
        </PlainInfo>
      </Band>

      <Band ref={standsBandRef} size="sm" justify="center" variant="background" color={Colors.linen} padding="xl">
        <TitleWrapper>
          <CenteredTitle>Stoiska</CenteredTitle>
        </TitleWrapper>

        <HallWrapper>
          <Hall />
          <HallLegend />
        </HallWrapper>
      </Band>
    </PageContent>
  );
};
