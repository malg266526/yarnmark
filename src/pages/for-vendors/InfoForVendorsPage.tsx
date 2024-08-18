import React from 'react';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { BackgroundColors } from '../../styles/theme';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Trans } from 'react-i18next';
import { Hall } from '../../components/Hall';
import { HallWrapper, PlainInfo, Separator } from './InfoForVendorsPage.styled';
import { usePhone } from '../../hooks/usePhone';
import { Menu } from '../menu/Menu';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { BandTitle } from '../../components/bands/BandTitle';
import { Band } from '../../components/bands/Band';
import { SecondaryLink } from '../../components/Link';
import { WoolPicture } from '../../components/WoolPicture';
import { PageContent } from '../../components/PageContent';
import styled from 'styled-components';

const InvitationBoxWrapper = styled.div`
  padding-left: 240px;
`;

export const InfoForVendorsPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <PageContent variant="wide" padding="none">
      <Menu />

      <Band.Wallpaper id="infoForVendorsIntro" picture={<WoolPicture />} size="lg" justify="flex-start">
        <InvitationBoxWrapper>
          <SlantedCornersBox overflowSize="10px" width="500px" padding="lg">
            <FlexColumnLayout align="flex-start" padding="none" gap="sm">
              <BandTitle>{t('infoForVendorsPage.title')}</BandTitle>

              <Typography size="sm">{t('infoForVendorsPage.invitation')}</Typography>
              <Typography size="sm">{t('infoForVendorsPage.organisationInfo')}</Typography>
            </FlexColumnLayout>
          </SlantedCornersBox>
        </InvitationBoxWrapper>
      </Band.Wallpaper>

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
    </PageContent>
  );
};
