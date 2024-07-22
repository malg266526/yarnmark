import { Band } from '../../../components/Band';
import sweatersBackgroundUrlAvif from '../../../assets/backgrounds/sweaters_background.avif';
import sweatersBackgroundUrlWebp from '../../../assets/backgrounds/sweaters_background.webp';
import sweatersBackgroundUrl from '../../../assets/backgrounds/sweaters_background.jpg';
import { WorkshopsCarousel } from './WorkshopsCarousel';
import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Typography } from '../../../components/Typography';
import { CenteredParagraph } from '../../../components/CenteredParagraph';

type WorkshopsBandType = {
  id: string;
};

export const WorkshopsBand = ({ id }: WorkshopsBandType) => {
  const t = useTypedTranslation();

  return (
    <Band
      id={id}
      gap="md"
      size="lg"
      justify="center"
      padding="xl"
      direction="column"
      variant="background-image"
      background={
        <Band.Picture>
          <source srcSet={sweatersBackgroundUrlAvif} type="image/avif" />
          <source srcSet={sweatersBackgroundUrlWebp} type="image/webp" />
          <img src={sweatersBackgroundUrl} alt="wool background" style={{ objectFit: 'cover' }} />
        </Band.Picture>
      }>
      <CenteredParagraph>
        <Typography size="xxl" weight="bold">
          {t('workshopsBand.title')}
        </Typography>
      </CenteredParagraph>

      <WorkshopsCarousel />
    </Band>
  );
};
