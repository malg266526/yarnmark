import { Band } from '../../components/Band';
import woolsAvifLandscape from '../../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../../assets/images/wools2_landscape.webp';
import woolsJpgLandscape from '../../assets/images/wools2_landscape.jpg';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { RowLayout } from '../../components/RowLayout';
import { Picture } from '../../components/Picture';
import yarnmarkLogoSrc from '../../assets/images/yarnmark_logo.jpg';
import yarnmarkLogoSrcWebp from '../../assets/images/yarnmark_logo.webp';
import yarnmarkLogoSrcAvif from '../../assets/images/yarnmark_logo.avif';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { FullSizePicture } from '../../components/FullSizePicture';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';

export const InvitationBand = () => {
  const t = useTypedTranslation();

  return (
    <Band size="xl" padding="xl" justify="flex-start">
      <FullSizePicture>
        <source srcSet={woolsAvifLandscape} type="image/avif" />
        <source srcSet={woolsWebpLandscape} type="image/webp" />
        <img src={woolsJpgLandscape} alt="wool" />
      </FullSizePicture>

      <Band.Slot>
        <SlantedCornersBox overflowSize="10px" width="500px" padding="lg" marginTop="lg" gap="sm">
          <Typography size="xxl" weight="bold">
            Krakoski Yarnmark Wełny
          </Typography>

          <Typography size="md">{t('welcomeBand.invitation')}</Typography>
          <Typography size="md">{t('welcomeBand.where')}</Typography>
          <Typography size="md">{t('welcomeBand.haveFun')}</Typography>

          <RowLayout gap="sm">
            <FlexColumnLayout align="flex-start" gap="sm" padding="none">
              <Typography size="md">{t('welcomeBand.seeYou')}</Typography>
              <Typography size="md">DziergamyNaPolu x Włóczykijki</Typography>
            </FlexColumnLayout>

            <Picture
              picture={{
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
              }}
              alt="yarnmark_logo"
              width={156}
              height={212}
            />
          </RowLayout>
        </SlantedCornersBox>
      </Band.Slot>
    </Band>
  );
};
