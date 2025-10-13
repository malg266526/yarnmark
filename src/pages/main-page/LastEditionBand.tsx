import React from 'react';
import { SecondaryLink } from '../../components/Link';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { Typography } from '../../components/Typography';
import { Band } from '../../components/bands/Band';
import { Picture } from '../../components/Picture';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import { yarnmarkLogoPictureConfig } from '../../assets/yarnmarkLogoPictureConfig';
import bagUrlPng from '../../assets/images/bag.png';
import bagUrlWebp from '../../assets/images/bag_webp.webp';
import bagUrlAvif from '../../assets/images/bag_avif.avif';
import { RowLayout } from '../../components/RowLayout';
import { usePhone } from '../../hooks/usePhone';

const Root = styled(FlexColumnLayout)`
  padding: ${RedesignSpacings.xl} 0;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.sm} 0;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.sm};
`;

export const LastEditionBand = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <Root align="flex-start" padding="none" gap="lg">
      <Band.Title>{t('previousEdition.thankYou')}</Band.Title>

      <RowLayout wide justify="space-between">
        <FlexColumnLayout padding="none" align="flex-start" gap="lg">
          <LogoSection>
            <Picture picture={yarnmarkLogoPictureConfig} alt="yarnmark_logo" width={45} height={60} />

            <FlexColumnLayout padding="none" gap="xxs" align="flex-start">
              <Typography size="md" weight="bold">
                {t('previousEdition.yarnmarkShop')}
              </Typography>
              <SecondaryLink
                to="https://wloczykijki.pl/pl/p/Torba-Krakoski-Yarnmark-Welny/3022"
                target="_blank"
                rel="noreferrer"
              >
                <Typography size="sm">{t('previousEdition.yarnmarkBag')}</Typography>
              </SecondaryLink>
              <SecondaryLink
                to="https://wloczykijki.pl/pl/p/Butelka-Krakoski-Yarnmark-Welny-2025/3577"
                target="_blank"
                rel="noreferrer"
              >
                <Typography size="sm">{t('previousEdition.bottle')}</Typography>
              </SecondaryLink>
            </FlexColumnLayout>
          </LogoSection>

          <LogoSection>
            <Picture picture={yarnmarkLogoPictureConfig} alt="yarnmark_logo" width={45} height={60} />

            <FlexColumnLayout padding="none" gap="xxs" align="flex-start">
              <Typography size="md" weight="bold">
                {t('previousEdition.yarnmarkGallery')}
              </Typography>
              <SecondaryLink
                to="https://drive.google.com/drive/folders/1GUiZ03Em63k1AHeFiba1KZcAHoB1sm-W?fbclid=IwAR0YPaNF3SeNgZIUctnh1qyyPaOED3RjLUeDnimHs-iHiQKMbCIZgBII_4o"
                target="_blank"
                rel="noreferrer"
              >
                <Typography size="sm">{t('previousEdition.photosBy')} @czarnagrafka</Typography>
              </SecondaryLink>

              <SecondaryLink
                to="https://drive.google.com/drive/folders/12orPLbGi9M3qUfVq5XEWNhTixadRFrSJ"
                target="_blank"
                rel="noreferrer"
              >
                <Typography size="sm">{t('previousEdition.photosBy')} @labolens.photo</Typography>
              </SecondaryLink>

              <SecondaryLink to="https://www.instagram.com/ataman_lenswork/" target="_blank" rel="noreferrer">
                <Typography size="sm">
                  {t('previousEdition.photosBy')} @ataman_lenswork {t('previousEdition.savedStories')}
                </Typography>
              </SecondaryLink>
            </FlexColumnLayout>
          </LogoSection>
        </FlexColumnLayout>

        {!isPhone && (
          <Picture
            picture={{
              fallbackUrl: bagUrlPng,
              sources: [
                {
                  type: 'image/webp',
                  url: bagUrlWebp
                },
                {
                  type: 'image/avif',
                  url: bagUrlAvif
                }
              ]
            }}
            alt="yarnmark bag"
            width={126}
            height={196}
          />
        )}
      </RowLayout>
    </Root>
  );
};
