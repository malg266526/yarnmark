import sweatersBackgroundUrlAvif from '../../../assets/backgrounds/sweaters_background.avif';
import sweatersBackgroundUrlWebp from '../../../assets/backgrounds/sweaters_background.webp';
import sweatersBackgroundUrl from '../../../assets/backgrounds/sweaters_background.jpg';
import { WorkshopsCarousel } from './WorkshopsCarousel';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { CenteredParagraph } from '../../../components/CenteredParagraph';
import { BackgroundImageBand } from '../../../components/bands/BackgroundImageBand';
import { FullSizePicture } from '../../../components/FullSizePicture';
import { BandTitle } from '../../../components/bands/BandTitle';

type WorkshopsBandType = {
  id: string;
};

export const WorkshopsBand = ({ id }: WorkshopsBandType) => {
  const t = useTypedTranslation();

  return (
    <BackgroundImageBand
      id={id}
      size="lg"
      justify="center"
      align="center"
      direction="column"
      padding="xl"
      picture={
        <FullSizePicture>
          <source srcSet={sweatersBackgroundUrlAvif} type="image/avif" />
          <source srcSet={sweatersBackgroundUrlWebp} type="image/webp" />
          <img src={sweatersBackgroundUrl} alt="wool background" style={{ objectFit: 'cover' }} />
        </FullSizePicture>
      }>
      <CenteredParagraph>
        <BandTitle>{t('workshopsBand.title')}</BandTitle>
      </CenteredParagraph>

      <WorkshopsCarousel />
    </BackgroundImageBand>
  );
};
