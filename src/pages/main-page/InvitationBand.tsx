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
import { RowLayout } from '../../components/RowLayout';
import { usePhone } from '../../hooks/usePhone';
import { GrayScale } from '../../styles/theme';
import { ScreenSize } from '../../styles/screeen-size';
import { Radius } from '../../styles/cards';

const SignatureSection = styled(FlexColumnLayout)`
  margin-bottom: ${Spacings.lg};
`;

const BottomSection = styled(RowLayout)`
  width: 100%;
  align-items: flex-end;
  margin-top: -${Spacings.md};
`;

const Content = styled(FlexColumnLayout)`
  padding: ${Spacings.md} 0 0 0;
  background-color: ${GrayScale[50]};

  @media (max-width: ${ScreenSize.phone}) {
    background-color: ${GrayScale[200]};
    border-radius: ${Radius.xl};
  }
`;

const yarnmarkLogoPictureConfig = {
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

const InvitationCard = () => {
  const t = useTypedTranslation();

  return (
    <SlantedCornersBox overflowSize="10px" width="460px" padding="none">
      <Content padding="md" gap="sm">
        <BandTitle>Krakoski Yarnmark Wełny</BandTitle>

        <FlexColumnLayout padding="md" align="flex-start" gap="sm">
          <Typography size="md">{t('welcomeBand.invitation')}</Typography>
          <Typography size="md">{t('welcomeBand.where')}</Typography>
          <Typography size="md">{t('welcomeBand.haveFun')}</Typography>

          <BottomSection justify="space-between" gap="none">
            <SignatureSection align="flex-start" gap="sm" padding="none">
              <Typography size="md">{t('welcomeBand.seeYou')}</Typography>
              <Typography size="md">
                DziergamyNaPolu <br /> & Włóczykijki
              </Typography>
            </SignatureSection>

            <Picture picture={yarnmarkLogoPictureConfig} alt="yarnmark_logo" width={156} height={212} />
          </BottomSection>
        </FlexColumnLayout>
      </Content>
    </SlantedCornersBox>
  );
};

const WoolPicture = (
  <FullSizePicture>
    <source srcSet={woolsAvifLandscape} type="image/avif" />
    <source srcSet={woolsWebpLandscape} type="image/avif" />

    <img loading="lazy" src={woolsJpgLandscape} alt="wool skeins" />
  </FullSizePicture>
);

interface InvitationBandProps {
  id: string;
}

export const InvitationBand = ({ id }: InvitationBandProps) => {
  const isPhone = usePhone();

  if (isPhone) {
    return <InvitationCard />;
  }

  return (
    <BackgroundImageBand id={id} picture={WoolPicture} size="xl" padding="xl" align="center">
      <InvitationCard />
    </BackgroundImageBand>
  );
};
