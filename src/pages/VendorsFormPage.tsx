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
import { Link } from '../components/Link';
import { FontSize } from '../styles/font-size';
import { Trans, useTranslation } from 'react-i18next';

const InvitationBoxWrapper = styled.div`
  padding-left: 240px;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const ActionLink = styled(Link)`
  color: ${TextColors.accent};
  width: fit-content;
  font-size: ${FontSize.md};
`;

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const VendorsFormPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const { i18n } = useTranslation();

  const links: Record<string, string> = {
    pl: 'https://docs.google.com/forms/d/e/1FAIpQLSdTs7hXzvlXz157H-rxGuz8Pn428g_TPmDdKVGHdHhY95EtJg/viewform?usp=dialog',
    en: 'https://docs.google.com/forms/d/e/1FAIpQLSel1l_OJKZFrPVGaotywJABBE4xIdvRyFoyYDEvTKvSU6vb0Q/viewform?usp=sharing&ouid=102752904430891841779',
    de: 'https://docs.google.com/forms/d/e/1FAIpQLSel1l_OJKZFrPVGaotywJABBE4xIdvRyFoyYDEvTKvSU6vb0Q/viewform?usp=sharing&ouid=102752904430891841779'
  };

  const formLink = links[i18n.language] || links.en;

  return (
    <PageContent variant="wide" padding="none">
      <Header />

      <Band.Wallpaper id="vendorsFormIntro" picture={<WoolPicture />} size="lg" justify="flex-start">
        <InvitationBoxWrapper>
          <SlantedCornersBox overflowSize="10px" width="500px" padding="lg">
            <CenteredSection>
              <BandTitle>{t('vendorsFormPage.title')}</BandTitle>
            </CenteredSection>
          </SlantedCornersBox>
        </InvitationBoxWrapper>
      </Band.Wallpaper>

      <Band.NarrowColumn
        id="vendors_form_content"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <Band.BeamTitle>{t('vendorsFormPage.openFormTitle')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">{t('vendorsFormPage.intro')}</Typography>
          <Typography size="md">{t('vendorsFormPage.languageHint')}</Typography>
          <ActionLink to={formLink} target="_blank" aria-label="vendorsApplicationForm">
            {t('vendorsFormPage.openCurrentLanguage')}
          </ActionLink>
        </PlainInfo>
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="vendors_form_links"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <Band.BeamTitle>{t('vendorsFormPage.allLinksTitle')}</Band.BeamTitle>

        <PlainInfo>
          <LinksList>
            <ActionLink to={links.pl} target="_blank" aria-label="vendorsApplicationFormPolish">
              {t('vendorsFormPage.links.pl')}
            </ActionLink>
            <ActionLink to={links.en} target="_blank" aria-label="vendorsApplicationFormEnglish">
              {t('vendorsFormPage.links.en')}
            </ActionLink>
            <ActionLink to={links.de} target="_blank" aria-label="vendorsApplicationFormGerman">
              {t('vendorsFormPage.links.de')}
            </ActionLink>
          </LinksList>

          <Typography size="md">
            <Trans i18nKey="vendorsFormPage.questions" />
          </Typography>
        </PlainInfo>
      </Band.NarrowColumn>
    </PageContent>
  );
};
