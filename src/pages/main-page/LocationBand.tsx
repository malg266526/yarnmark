import { Band } from '../../components/bands/Band';
import halaAvifImageSrc from '../../assets/images/hala.avif';
import halaWebpImageSrc from '../../assets/images/hala.webp';
import halaJpgImageSrc from '../../assets/images/hala.jpg';
import React, { useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { SecondaryButton } from './MainPage.styled';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { Trans } from 'react-i18next';
import { Icon } from '../../components/Icon';
import pinImageUrl from '../../assets/images/pin.svg';
import styled from 'styled-components';
import { Typography } from '../../components/Typography';
import { BackgroundPicture } from '../../components/BackgroundPicture';
import { BackgroundColors } from '../../styles/theme';

const AnimatedIconWrapper = styled.div`
  padding-bottom: 20px;
  border-radius: 10px;
  box-shadow: none;
  border: 6px solid transparent;
  transition: all 200ms ease-in-out;

  &:hover {
    box-shadow:
      1px 1px 5px 1px #333,
      inset 1px 1px 5px 1px #333;
    border-color: white;
  }

  @keyframes jump {
    0% {
      transform: translate(0, 0);
    }

    5% {
      transform: translate(0, -100px);
    }

    10% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes jump2 {
    0% {
      transform: translate(0, 0);
    }

    40% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(0, -50px);
    }
  }

  > ${Icon} {
    animation: 1s ease-in-out infinite alternate running jump2;
    cursor: pointer;
  }

  > ${Icon}:hover {
    animation-play-state: paused;
  }
`;

const EventLocationCard = () => {
  const t = useTypedTranslation();
  const [isSpotOpened, setIsSpotOpened] = useState<boolean>(false);

  return (
    <SlantedCornersBox width="500px" padding="lg" gap="sm">
      <Typography size="xl" weight="bold">
        {t('spotBand.title')}
      </Typography>

      <Typography size="sm">{t('spotBand.address')}</Typography>
      <Typography size="sm">{t('spotBand.description')}</Typography>

      {!isSpotOpened && (
        <SecondaryButton onClick={() => setIsSpotOpened(true)}>{t('spotBand.howToGetToUs')}</SecondaryButton>
      )}
      {isSpotOpened && (
        <>
          <Typography size="lg" weight="bold">
            {t('spotBand.howToGetToUs')}
          </Typography>

          <Typography size="sm">{t('spotBand.publicTransport')}</Typography>
          <Typography size="sm">{t('spotBand.list')}</Typography>
          <Typography size="sm">
            <Trans i18nKey="spotBand.option1" />
          </Typography>
          <Typography size="sm">
            <Trans i18nKey="spotBand.option2" />
          </Typography>
          <Typography size="sm">
            <Trans i18nKey="spotBand.option3" />
          </Typography>
          <Typography size="sm">
            <Trans i18nKey="spotBand.option4" />
          </Typography>

          <Typography size="lg" weight="bold">
            {t('spotBand.accessibleByCar')}
          </Typography>
          <Typography size="sm">{t('spotBand.byCar')}</Typography>

          <p>
            fot: <a href="https://halacracovii.pl/">https://halacracovii.pl/</a>{' '}
          </p>
        </>
      )}
    </SlantedCornersBox>
  );
};

type LocationSectionType = {
  id: string;
};

export const LocationBand = ({ id }: LocationSectionType) => {
  const t = useTypedTranslation();

  return (
    <Band.Solid id={id} justify="space-around" size="xl" color={BackgroundColors.navigationBand}>
      <BackgroundPicture size="70%" filter="grayscale(0.2) brightness(1.3) contrast(0.8)">
        <source srcSet={halaAvifImageSrc} type="image/avif" />
        <source srcSet={halaWebpImageSrc} type="image/avif" />

        <img loading="lazy" src={halaJpgImageSrc} alt="hala 100-lecia" />
      </BackgroundPicture>

      <a
        target="_blank"
        rel="noreferrer"
        aria-label={t('spotBand.googleMaps')}
        href="https://www.google.pl/maps/@50.0572998,19.9107716,3a,75y,214.48h,88.44t/data=!3m6!1e1!3m4!1sVVYRGhxvt5uE6gsr_G7cwA!2e0!7i16384!8i8192?entry=ttu">
        <AnimatedIconWrapper>
          <Icon size="200px" src={pinImageUrl} dropShadow />
        </AnimatedIconWrapper>
      </a>

      <EventLocationCard />
    </Band.Solid>
  );
};
