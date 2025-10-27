import React from 'react';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { BackgroundColors } from '../../styles/theme';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Trans, useTranslation } from 'react-i18next';
import { HallWrapper, PlainInfo, Separator } from './ForVendorsPage.styled';
import { usePhone } from '../../hooks/usePhone';
import { Header } from '../menu/Header';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { BandTitle } from '../../components/bands/BandTitle';
import { Band } from '../../components/bands/Band';
import { WoolPicture } from '../../components/WoolPicture';
import { PageContent } from '../../components/PageContent';
import styled from 'styled-components';
import { ScreenSize } from '../../styles/screeen-size';
import { Hall } from '../../components/Hall';
import { HallLegend } from '../../components/HallLegend';
import { RowLayout } from '../../components/RowLayout';
import { Link } from '../../components/Link';
import { FontSize } from '../../styles/font-size';

const InvitationBoxWrapper = styled.div`
  padding-left: 240px;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const MdLink = styled(Link)`
  font-size: ${FontSize.md};
`;

export const ForVendorsPage = () => {
  const t = useTypedTranslation();
  const { i18n } = useTranslation();
  const isPhone = usePhone();

  const links: Record<string, string> = {
    pl: 'https://docs.google.com/forms/d/1v33Xps7qGVO9jwpa-iAj5vjQM70gjz2HFksviCHichs/edit',
    en: 'https://docs.google.com/forms/d/15Npi8i8ujiGyyxhMJIJxMvHLxBstbVArAWoo67DsjQs/edit',
    de: 'https://docs.google.com/forms/d/15Npi8i8ujiGyyxhMJIJxMvHLxBstbVArAWoo67DsjQs/edit'
  };

  const formLink = links[i18n.language] || links.en;

  return (
    <PageContent variant="wide" padding="none">
      <Header />

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
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <Band.BeamTitle>{t('infoForVendorsPage.registration.title')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.registration.wantToJoin" />
          </Typography>
          <Typography size="md">
            <Trans
              i18nKey="infoForVendorsPage.registration.newForm"
              components={[
                <MdLink key="application_form_url" target="_blank" to={formLink} aria-label="applicationForm" />
              ]}
            />
          </Typography>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.registration.extraInfoByMail" />
          </Typography>

          <RowLayout justify="flex-start">
            <Typography size="md">{t('infoForVendorsPage.seeStatue')}</Typography>
            <Link to="/info-for-vendors-statue">
              <Typography size="md">{t('infoForVendorsPage.here')}</Typography>
            </Link>
          </RowLayout>
        </PlainInfo>
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="hall"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <Band.BeamTitle>{t('infoForVendorsPage.hallInfo.title')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.hallInfo.area" />
          </Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.openHours')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.ramp')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.participants')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.stands')}</Typography>
          <ul>
            <li>
              <Typography size="md">
                <Trans i18nKey="infoForVendorsPage.hallInfo.standPremium" />
              </Typography>
            </li>
            <li>
              <Typography size="md">
                <Trans i18nKey="infoForVendorsPage.hallInfo.standardStand" />
              </Typography>
            </li>
            <li>
              <Typography size="md">
                <Trans i18nKey="infoForVendorsPage.hallInfo.miniStand" />
              </Typography>
            </li>
          </ul>

          <Typography size="md">{t('infoForVendorsPage.hallInfo.tables')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.extensionCords')}</Typography>
          <Typography size="md">{t('infoForVendorsPage.hallInfo.socialRoom')}</Typography>
        </PlainInfo>
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="parking"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
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
        padding={isPhone ? 'sm' : 'xxl'}
      >
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
        padding={isPhone ? 'xxs' : 'xxl'}
      >
        <Band.BeamTitle>{t('infoForVendorsPage.stands.title')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">
            <Trans i18nKey="infoForVendorsPage.stands.contact" />
          </Typography>
        </PlainInfo>

        <HallWrapper id="hall_wrapper">
          <Hall multiplier={isPhone ? 7 : 15} />
          <HallLegend />
        </HallWrapper>
      </Band.NarrowColumn>
    </PageContent>
  );
};
