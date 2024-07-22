import { SectionWrapper } from './MainPage.styled';
import { Band } from '../../components/Band';
import { Colors } from '../../styles/theme';
import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from '../../components/Link';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { Typography } from '../../components/Typography';
import { BandTitle } from '../../components/bands/BandTitle';

type LastEditionBandType = {
  id: string;
};

export const LastEditionBand = ({ id }: LastEditionBandType) => {
  const t = useTypedTranslation();

  return (
    <Band
      id={id}
      size="md"
      variant="background"
      color={Colors.pastelGray}
      padding="xl"
      narrowContent="auto"
      overflowX="hidden">
      <SectionWrapper>
        <BandTitle>{t('previousEdition.thankYou')}</BandTitle>

        <Typography size="lg" weight="regular">
          <Trans
            i18nKey="previousEdition.fillTheSurvey"
            components={[
              <Link
                key="survey_link"
                target="_blank"
                to="https://docs.google.com/forms/d/e/1FAIpQLSciBZoXDEmQdk4wCmWJC3Bg7ME4O6EfyYg1b9gpF0N01DXwTg/viewform"
              />
            ]}
          />
        </Typography>

        <Typography size="xl" weight="bold">
          {t('previousEdition.yarnmarkShop')}
        </Typography>

        <Link to="https://wloczykijki.pl/pl/p/Torba-Krakoski-Yarnmark-Welny/3022" target="_blank" rel="noreferrer">
          {t('previousEdition.yarnmarkBag')}
        </Link>

        <Typography size="xl" weight="bold">
          {t('previousEdition.yarnmarkGallery')}
        </Typography>

        <FlexColumnLayout gap="sm" align="flex-start" padding="none">
          <Link
            to="https://drive.google.com/drive/folders/1GUiZ03Em63k1AHeFiba1KZcAHoB1sm-W?fbclid=IwAR0YPaNF3SeNgZIUctnh1qyyPaOED3RjLUeDnimHs-iHiQKMbCIZgBII_4o"
            target="_blank"
            rel="noreferrer">
            {t('previousEdition.photosBy')} @czarnagrafka
          </Link>
          <Link
            to="https://drive.google.com/drive/folders/12orPLbGi9M3qUfVq5XEWNhTixadRFrSJ"
            target="_blank"
            rel="noreferrer">
            {t('previousEdition.photosBy')} @labolens.photo
          </Link>
          <Link to="https://www.instagram.com/ataman_lenswork/" target="_blank" rel="noreferrer">
            {t('previousEdition.photosBy')} @ataman_lenswork {t('previousEdition.savedStories')}
          </Link>
        </FlexColumnLayout>
      </SectionWrapper>
    </Band>
  );
};
