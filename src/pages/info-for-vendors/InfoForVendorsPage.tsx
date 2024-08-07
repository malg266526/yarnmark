import React from 'react';
import woolsAvifLandscape from '../../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../../assets/images/wools2_landscape.webp';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { BackgroundColors, BrownScale, Colors } from '../../styles/theme';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Trans } from 'react-i18next';
import { Hall } from '../../components/Hall';
import { HallWrapper, PlainInfo, StyledPageContent } from './InfoForVendorsPage.styled';
import { usePhone } from '../../hooks/usePhone';
import { BackgroundPicture } from '../../components/BackgroundPicture';
import { Menu } from '../menu/Menu';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { BackgroundImageBand } from '../../components/bands/BackgroundImageBand';
import { BandTitle } from '../../components/bands/BandTitle';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';
import { Band } from '../../components/bands/Band';

export const InfoForVendorsPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <StyledPageContent variant="wide" padding="none">
      <Menu />

      <BackgroundImageBand
        id="infoForVendorsIntro"
        size="lg"
        justify="flex-start"
        align="center"
        padding="xl"
        picture={
          <BackgroundPicture>
            <source srcSet={woolsAvifLandscape} type="image/avif" />
            <img src={woolsWebpLandscape} alt="wool" />
          </BackgroundPicture>
        }>
        <SlantedCornersBox overflowSize="10px" width="500px" padding="lg">
          <FlexColumnLayout align="flex-start" padding="none" gap="sm">
            <BandTitle>{t('infoForVendorsPage.title')}</BandTitle>

            <Typography size="sm">{t('infoForVendorsPage.invitation')}</Typography>
            <Typography size="sm">{t('infoForVendorsPage.organisationInfo')}</Typography>
          </FlexColumnLayout>
        </SlantedCornersBox>
      </BackgroundImageBand>

      <Band.CenteredColumn
        id="vendorsRegistration"
        size="sm"
        justify={isPhone ? 'center' : 'space-evenly'}
        color={BackgroundColors.navigationBand}
        padding="xl">
        <Band.BeamTitle>{t('infoForVendorsPage.registration.title')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="sm">
            <Trans i18nKey="infoForVendorsPage.registration.beAVendor" />
          </Typography>
          <Typography size="sm">{t('infoForVendorsPage.registration.start')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.registration.where')}</Typography>
          <a
            href="https://wloczykijki.pl/pl_PL/c/Krakoski-Yarnmark-Welny/355?preview=true"
            target="_blank"
            rel="noreferrer">
            {t('infoForVendorsPage.registration.buyHere')}
          </a>
          <Typography size="sm">{t('infoForVendorsPage.registration.feedback')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.registration.return')}</Typography>
        </PlainInfo>
      </Band.CenteredColumn>

      <SolidBackgroundBand
        id="hall"
        size="sm"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.snow}
        padding="xl">
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.hallInfo.title')}
        </Typography>

        <PlainInfo>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.area')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.openHours')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.ramp')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.participants')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.stands')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.tables')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.extensionCords')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.socialRoom')}</Typography>
          <Typography size="sm">{t('infoForVendorsPage.hallInfo.glassWall')}</Typography>
        </PlainInfo>
      </SolidBackgroundBand>

      <SolidBackgroundBand
        id="parking"
        size="sm"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={BrownScale[100]}
        padding="xl">
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.parking.title')}
        </Typography>

        <PlainInfo>
          <Typography size="sm">{t('infoForVendorsPage.parking.parkingSpace')}</Typography>
        </PlainInfo>
      </SolidBackgroundBand>

      <SolidBackgroundBand
        id="marketing"
        size="sm"
        justify={isPhone ? 'center' : 'space-evenly'}
        align="center"
        color={Colors.beige1}
        padding="xl">
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.marketing.title')}
        </Typography>

        <PlainInfo>
          <Typography size="sm">
            <Trans i18nKey="infoForVendorsPage.marketing.sendLogos" />
          </Typography>
        </PlainInfo>
      </SolidBackgroundBand>

      <SolidBackgroundBand
        id="stands"
        size="sm"
        justify={isPhone ? 'center' : 'space-evenly'}
        color={BrownScale[100]}
        padding="xl">
        <Typography size="xxl" weight="bold">
          {t('infoForVendorsPage.stands.title')}
        </Typography>

        <HallWrapper>
          <Hall />
        </HallWrapper>
      </SolidBackgroundBand>
    </StyledPageContent>
  );
};
