import React from 'react';
import { SlantedCornersBox } from '../components/SlantedCornersBox';
import { BackgroundColors } from '../styles/theme';
import { Header } from './menu/Header';
import { CenteredSection } from '../components/CenteredSection';
import { BandTitle } from '../components/bands/BandTitle';
import { PageContent } from '../components/PageContent';
import { WoolPicture } from '../components/WoolPicture';
import { Band } from '../components/bands/Band';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { usePhone } from '../hooks/usePhone';
import { PlainInfo, Separator } from './for-vendors/ForVendorsPage.styled';
import { Typography } from '../components/Typography';
import { VendorsFormView } from './vendors-form/VendorsFormView';
import { InvitationBoxWrapper } from './vendors-form/VendorsFormPage.styled';
import { useVendorsForm } from './vendors-form/useVendorsForm';

export const VendorsFormPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const form = useVendorsForm();

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
        <Band.BeamTitle>{t('vendorsFormPage.formTitle')}</Band.BeamTitle>

        <PlainInfo style={{ alignItems: 'center' }}>
          <VendorsFormView {...form} />
        </PlainInfo>
      </Band.NarrowColumn>

      <Separator />

      <Band.NarrowColumn
        id="vendors_form_help"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <Band.BeamTitle>{t('vendorsFormPage.helpTitle')}</Band.BeamTitle>

        <PlainInfo>
          <Typography size="md">{t('vendorsFormPage.helpDescription')}</Typography>
          <Typography size="md">{t('vendorsFormPage.questions')}</Typography>
        </PlainInfo>
      </Band.NarrowColumn>
    </PageContent>
  );
};
