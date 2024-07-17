import { Band } from '../../components/Band';
import { Text, TextH2 } from './MainPage.styled';
import woolsAvifLandscape from '../../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../../assets/images/wools2_landscape.webp';
import woolsJpgLandscape from '../../assets/images/wools2_landscape.jpg';
import { NiceBox } from '../../components/NiceBox';
import { TextWrapper, Title } from '../../components/Title';
import { RowLayout } from '../../components/RowLayout';
import { Picture } from '../../components/Picture';
import yarnmarkLogoSrc from '../../assets/images/yarnmark_logo.jpg';
import yarnmarkLogoSrcWebp from '../../assets/images/yarnmark_logo.webp';
import yarnmarkLogoSrcAvif from '../../assets/images/yarnmark_logo.avif';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { FullSizePicture } from '../../components/FullSizePicture';

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
        <NiceBox overflowSize="10px" width="500px" padding="lg" marginTop="lg">
          <TextWrapper>
            <Title>Krakoski Yarnmark Wełny</Title>
          </TextWrapper>

          <TextH2>{t('welcomeBand.invitation')}</TextH2>
          <Text>{t('welcomeBand.where')}</Text>
          <Text align="justify" marginBottom="md">
            {t('welcomeBand.haveFun')}
          </Text>

          <RowLayout gap="sm">
            <div>
              <Text>{t('welcomeBand.seeYou')}</Text>
              <Text>DziergamyNaPolu x Włóczykijki</Text>
            </div>

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
        </NiceBox>
      </Band.Slot>
    </Band>
  );
};
