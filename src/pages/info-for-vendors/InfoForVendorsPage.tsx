import React from 'react';
import woolsAvifLandscape from '../../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../../assets/images/wools2_landscape.webp';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { BackgroundColors } from '../../styles/theme';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Trans } from 'react-i18next';
import { Hall } from '../../components/Hall';
import { HallWrapper, PlainInfo, Separator, StyledPageContent } from './InfoForVendorsPage.styled';
import { usePhone } from '../../hooks/usePhone';
import { BackgroundPicture } from '../../components/BackgroundPicture';
import { Menu } from '../menu/Menu';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { BackgroundImageBand } from '../../components/bands/BackgroundImageBand';
import { BandTitle } from '../../components/bands/BandTitle';
import { Band } from '../../components/bands/Band';
import { SecondaryLink } from '../../components/Link';

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

      <Band.NarrowColumn
        id="vendorsRegistration"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}>
        <Band.BeamTitle>{t('infoForVendorsPage.registration.title')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.registration.beAVendor" />
          </Typography>
          <Typography size="md">{t('infoForVendorsPage.registration.start')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.registration.where')}</Typography>

          <SecondaryLink
            to="https://wloczykijki.pl/pl_PL/c/Krakoski-Yarnmark-Welny/355?preview=true"
            target="_blank"
            rel="noreferrer">
            <Typography size="md">{t('infoForVendorsPage.registration.buyHere')}</Typography>
          </SecondaryLink>

          <Typography size="md">{t('infoForVendorsPage.registration.feedback')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.registration.return')}</Typography>
        </PlainInfo>
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="hall"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}>
        <Band.BeamTitle>{t('infoForVendorsPage.hallInfo.title')}</Band.BeamTitle>

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
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="parking"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}>
        <Band.BeamTitle>{t('infoForVendorsPage.parking.title')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">{t('infoForVendorsPage.parking.parkingSpace')}</Typography>
        </PlainInfo>
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="marketing"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}>
        <Band.BeamTitle>{t('infoForVendorsPage.marketing.title')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.marketing.sendLogos" />
          </Typography>
        </PlainInfo>
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="stands"
        gap="lg"
        size="sm"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}>
        <Band.BeamTitle>{t('infoForVendorsPage.stands.title')}</Band.BeamTitle>

        <HallWrapper>
          <Hall />
        </HallWrapper>
      </Band.NarrowColumn>
    </StyledPageContent>
  );
};
