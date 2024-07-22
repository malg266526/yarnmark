import woolsAvifLandscape from '../../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../../assets/images/wools2_landscape.webp';
import woolsJpgLandscape from '../../assets/images/wools2_landscape.jpg';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { Picture } from '../../components/Picture';
import yarnmarkLogoSrc from '../../assets/images/yarnmark_logo.jpg';
import yarnmarkLogoSrcWebp from '../../assets/images/yarnmark_logo.webp';
import yarnmarkLogoSrcAvif from '../../assets/images/yarnmark_logo.avif';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { BackgroundImageBand } from '../../components/bands/BackgroundImageBand';
import { FullSizePicture } from '../../components/FullSizePicture';
import { BandTitle } from '../../components/bands/BandTitle';
import styled from 'styled-components';
import { Spacings } from '../../styles/spacings';

const SignatureSection = styled(FlexColumnLayout)`
  margin-top: ${Spacings.md};
`;

const CardContent = styled(FlexColumnLayout)`
  padding: ${Spacings.md} 0 0 0;
`;

const yarnmarkLogoPicture = {
  fallbackUrl: yarnmarkLogoSrc,
  sources: [
    {
      type: 'image/webp',
      url: yarnmarkLogoSrcWebp
    },
    {
      type: 'image/avif',
      url: yarnmarkLogoSrcAvif
    }
  ]
};

const WoolPicture = (
  <FullSizePicture>
    <source srcSet={woolsAvifLandscape} type="image/avif" />
    <source srcSet={woolsWebpLandscape} type="image/avif" />

    <img loading="lazy" src={woolsJpgLandscape} alt="wool skeins" />
  </FullSizePicture>
);

export const InvitationBand = () => {
  const t = useTypedTranslation();

  return (
    <BackgroundImageBand picture={WoolPicture} size="xl" padding="xl" align="center">
      <SlantedCornersBox overflowSize="10px" width="460px" padding="md">
        <CardContent padding="none" gap="sm">
          <BandTitle>Krakoski Yarnmark Wełny</BandTitle>

          <FlexColumnLayout padding="sm" align="flex-start">
            <Typography size="md">{t('welcomeBand.invitation')}</Typography>
            <Typography size="md">{t('welcomeBand.where')}</Typography>
            <Typography size="md">{t('welcomeBand.haveFun')}</Typography>

            <SignatureSection align="flex-start" gap="sm" padding="none">
              <Typography size="md">{t('welcomeBand.seeYou')}</Typography>
              <Typography size="md">
                DziergamyNaPolu <br /> & Włóczykijki
              </Typography>
            </SignatureSection>

            <Picture
              picture={yarnmarkLogoPicture}
              alt="yarnmark_logo"
              width={156}
              height={212}
              style={{ position: 'absolute', bottom: 0, right: Spacings.sm }}
            />
          </FlexColumnLayout>
        </CardContent>
      </SlantedCornersBox>
    </BackgroundImageBand>
  );
};
