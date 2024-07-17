import React, { useRef } from 'react';
import woolsAvifLandscape from '../../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../../assets/images/wools2_landscape.webp';
import { Band } from '../../components/Band';
import { NiceBox } from '../../components/NiceBox';
import { TextWrapper, Title } from '../../components/Title';
import { BrownScale, Colors } from '../../styles/theme';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Trans } from 'react-i18next';
import { Hall } from '../../components/Hall';
import { HallWrapper, PlainInfo, StyledPageContent, TitleWrapper } from './InfoForVendorsPage.styled';
import { CenteredTitle, MainBackground, Text } from '../main-page/MainPage.styled';
import { usePhone } from '../../hooks/usePhone';
import { Menu } from './Menu';

export const InfoForVendorsPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const standsBandRef = useRef<HTMLDivElement | null>(null);

  return (
    <StyledPageContent variant="wide" padding="none">
      <Menu />

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
