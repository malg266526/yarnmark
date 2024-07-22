import React, { useRef } from 'react';
import woolsAvifLandscape from '../../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../../assets/images/wools2_landscape.webp';
import { Band } from '../../components/Band';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { BrownScale, Colors } from '../../styles/theme';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Trans } from 'react-i18next';
import { Hall } from '../../components/Hall';
import { HallWrapper, PlainInfo, StyledPageContent } from './InfoForVendorsPage.styled';
import { usePhone } from '../../hooks/usePhone';
import { FullSizePicture } from '../../components/FullSizePicture';
import { Menu } from '../menu/Menu';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { BackgroundImageBand } from '../../components/bands/BackgroundImageBand';
import { BandTitle } from '../../components/bands/BandTitle';

export const InfoForVendorsPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const standsBandRef = useRef<HTMLDivElement | null>(null);

  return (
    <StyledPageContent variant="wide" padding="none">
      <Menu />

      <BackgroundImageBand
        size="lg"
        justify="flex-start"
        align="center"
        padding="xl"
        picture={
          <FullSizePicture>
            <source srcSet={woolsAvifLandscape} type="image/avif" />
            <img src={woolsWebpLandscape} alt="wool" />
          </FullSizePicture>
        }>
        <SlantedCornersBox overflowSize="10px" width="500px" padding="lg">
          <FlexColumnLayout align="flex-start" padding="none" gap="sm">
            <BandTitle>{t('infoForVendorsPage.title')}</BandTitle>

            <Typography size="md">{t('infoForVendorsPage.invitation')}</Typography>
            <Typography size="md">{t('infoForVendorsPage.organisationInfo')}</Typography>
          </FlexColumnLayout>
        </SlantedCornersBox>
      </BackgroundImageBand>

      <Band
        size="sm"
        variant="background"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.isabelline}
        padding="xl">
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.registration.title')}
        </Typography>

        <PlainInfo>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.registration.beAVendor" />
          </Typography>
          <Typography size="md">{t('infoForVendorsPage.registration.start')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.registration.where')}</Typography>
          <a
            href="https://wloczykijki.pl/pl_PL/c/Krakoski-Yarnmark-Welny/355?preview=true"
            target="_blank"
            rel="noreferrer">
            {t('infoForVendorsPage.registration.buyHere')}
          </a>
          <Typography size="md">{t('infoForVendorsPage.registration.feedback')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.registration.return')}</Typography>
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
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.hallInfo.title')}
        </Typography>

        <PlainInfo>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.area')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.openHours')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.ramp')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.participants')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.stands')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.tables')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.extensionCords')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.socialRoom')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.glassWall')}</Typography>
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
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.parking.title')}
        </Typography>

        <PlainInfo>
          <Typography size="md">{t('infoForVendorsPage.parking.parkingSpace')}</Typography>
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
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.marketing.title')}
        </Typography>

        <PlainInfo>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.marketing.sendLogos" />
          </Typography>
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
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.stands.title')}
        </Typography>

        <HallWrapper>
          <Hall />
        </HallWrapper>
      </Band>
    </StyledPageContent>
  );
};
