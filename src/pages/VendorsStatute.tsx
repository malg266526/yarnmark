import React from 'react';
import styled from 'styled-components';
import { SlantedCornersBox } from '../components/SlantedCornersBox';
import { BackgroundColors, TextColors } from '../styles/theme';
import { Header } from './menu/Header';
import { CenteredSection } from '../components/CenteredSection';
import { BandTitle } from '../components/bands/BandTitle';
import { PageContent } from '../components/PageContent';
import { WoolPicture } from '../components/WoolPicture';
import { Band } from '../components/bands/Band';
import { ScreenSize } from '../styles/screeen-size';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { usePhone } from '../hooks/usePhone';
import { PlainInfo, Separator } from './for-vendors/ForVendorsPage.styled';
import { Typography } from '../components/Typography';
import { Trans } from 'react-i18next';

const Link = styled.a`
  color: ${TextColors.accent};
  text-decoration: none;
`;

const InvitationBoxWrapper = styled.div`
  padding-left: 240px;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const StatueContent = styled(PlainInfo)`
  ol {
    line-height: 22px;
  }
`;

const CenteredH2 = styled.h3`
  text-align: center;
`;

export const VendorStatutePage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <PageContent variant="wide" padding="none">
      <Header />

      <Band.Wallpaper id="infoForVendorsIntro" picture={<WoolPicture />} size="lg" justify="flex-start">
        <InvitationBoxWrapper>
          <SlantedCornersBox overflowSize="10px" width="500px" padding="lg">
            <CenteredSection>
              <BandTitle>{t('menu.statuteForVendors')}</BandTitle>
            </CenteredSection>
          </SlantedCornersBox>
        </InvitationBoxWrapper>
      </Band.Wallpaper>

      <Band.NarrowColumn
        id="yarnmark_statue"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <Typography size="sm" weight="light">
          {t('vendorsStatue.intro')}
        </Typography>

        <Band.BeamTitle>{t('vendorsStatue.title')}</Band.BeamTitle>

        <StatueContent>
          <p>{t('vendorsStatue.explanationIntro')}</p>
          <ol>
            <li>
              <Trans i18nKey="vendorsStatue.explanation1" />
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.explanation2" />
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.explanation3" />
            </li>
            <li>
              <Trans
                i18nKey="vendorsStatue.explanation4"
                components={[
                  <Link
                    key="tickets_url"
                    target="_blank"
                    href="http://localhost:8090/info-for-vendors"
                    aria-label="tickets"
                    style={{ pointerEvents: 'none' }}
                  />
                ]}
              />
            </li>
          </ol>

          <CenteredH2>{t('vendorsStatue.subtitle')}</CenteredH2>

          <ol>
            <li>{t('vendorsStatue.condition1')}</li>
            <li>{t('vendorsStatue.condition2')}</li>
            <li>{t('vendorsStatue.condition3')}</li>
            <li>
              <Trans i18nKey="vendorsStatue.condition4" />
              <ul>
                <li>{t('vendorsStatue.subcondition4a')}</li>
                <li>{t('vendorsStatue.subcondition4b')}</li>
                <li>{t('vendorsStatue.subcondition4c')}</li>
              </ul>
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.condition5" />
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.condition6" />
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.condition7" />
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.condition8" />
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.condition9" />
              <ul>
                <li>{t('vendorsStatue.subcondition9a')}</li>
                <li>{t('vendorsStatue.subcondition9b')}</li>
                <li>
                  <Trans i18nKey="vendorsStatue.subcondition9c" />
                </li>
              </ul>
            </li>
            <li>
              <Trans i18nKey="vendorsStatue.condition10" />
            </li>
          </ol>
        </StatueContent>
      </Band.NarrowColumn>

      <Separator />
    </PageContent>
  );
};
