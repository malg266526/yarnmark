import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import { Band } from '../components/Band';
import { NiceBox } from '../components/NiceBox';
import { PageContent } from '../components/PageContent';
import { TextWrapper, Title } from '../components/Title';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import { Icon as IconifyIcon } from '@iconify/react';
import { Trans } from 'react-i18next';
import { Header } from '../App.styled';
import { BurgerMenu } from '../components/BurgerMenu';
import { Curtain } from '../components/Curtain';
import { Hall } from '../components/Hall';
import { HallLegend } from '../components/HallLegend';
import { Link } from '../components/Link';
import { TransparentButton } from '../components/Menu';
import { SideBar } from '../components/SideBar';
import { ScreenSize } from '../styles/screeen-size';
import { CenteredTitle, Menu, MenuBackground, Picture, Text } from './MainPage.styled';
import { usePhone } from './usePhone';

export const FlexLayout = styled.div`
  display: flex;
  gap: ${Spacings.md};
  padding: ${Spacings.md};
`;

export const TextUnderlined = styled(Text)`
  text-decoration: underline;
  font-size: 16px;
  margin-top: ${Spacings.sm};
`;

export const PasswordInput = styled.input`
  width: 300px;
  margin-top: ${Spacings.xs};
  margin-right: ${Spacings.md};
`;

export const Span = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Error = styled(Text)`
  color: ${Colors.error};
  margin-top: 0;
  font-size: 16px;
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

const TEMPLATE = 'dziergamy';

export const InfoForVendorsPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const closeSideBar = () => setBurgerActive(false);

  const standsBandRef = useRef<HTMLDivElement | null>(null);

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [shouldShowError, setShouldShowError] = useState(false);

  const validateAndGo = useCallback(() => {
    setShouldShowError(false);
    const validOne = TEMPLATE.split('').reverse().join('').replace('a', '@').replace('e', 'E');

    const isPasswordValid = password === validOne;

    if (isPasswordValid) {
      window.open('https://wloczykijki.pl/', '_blank');
    } else {
      setShouldShowError(true);
    }
  }, [password]);

  return (
    <PageContent variant="wide" padding="none">
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
              to="#stands"
              onClick={() => {
                closeSideBar();
              }}>
              <IconifyIcon icon="bi:shop" width="24" />
              {t('menu.stands')}
            </SideBar.LinkEntry>

            <SideBar.LinkEntry
              to="#footer"
              onClick={() => {
                closeSideBar();
              }}>
              <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
              {t('menu.contact')}
            </SideBar.LinkEntry>
          </SideBar>
        </>
      )}

      {!isPhone && (
        <Menu>
          <MenuBackground>
            <Link color="black" to="/">
              Yarnmark
            </Link>

            <Link color="black" to="#stands">
              {t('menu.stands')}
            </Link>

            <Link color="black" to="#footer">
              {t('menu.contact')}
            </Link>
          </MenuBackground>
        </Menu>
      )}

      <Band size="lg" justify="flex-start" narrowContent padding="md">
        <Picture>
          <source srcSet={woolsAvifLandscape} type="image/avif" />
          <img src={woolsWebpLandscape} />
        </Picture>

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
        id="hall"
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.isabelline}
        padding="xl">
        <TextWrapper>
          <CenteredTitle>Hala</CenteredTitle>
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
        </PlainInfo>
      </Band>

      <Band
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.snow}
        padding="xl">
        <TitleWrapper>
          <CenteredTitle>{t('infoForVendorsPage.registration.title')}</CenteredTitle>
        </TitleWrapper>

        <PlainInfo>
          <Text>{t('infoForVendorsPage.registration.start')}</Text>
          <Text>{t('infoForVendorsPage.registration.where')}</Text>

          <TransparentButton onClick={() => setShowPasswordInput(true)}>
            <TextUnderlined>{t('infoForVendorsPage.registration.buyHere')}</TextUnderlined>
          </TransparentButton>

          {showPasswordInput && (
            <div>
              <Span>
                <PasswordInput
                  name="vendorPassword"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <TransparentButton onClick={validateAndGo}>
                  <TextUnderlined>Go!</TextUnderlined>
                </TransparentButton>
              </Span>
              {shouldShowError && <Error>Error</Error>}
            </div>
          )}
          <Text>{t('infoForVendorsPage.registration.feedback')}</Text>
          <Text>{t('infoForVendorsPage.registration.return')}</Text>
        </PlainInfo>
      </Band>

      <Band
        id="parking"
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.linen}
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
        color={Colors.linen}
        padding="xl">
        <TextWrapper>
          <CenteredTitle>{t('infoForVendorsPage.stands.title')}</CenteredTitle>
        </TextWrapper>

        <HallWrapper>
          <Hall />
          <HallLegend />
        </HallWrapper>
      </Band>
    </PageContent>
  );
};
