import { Band } from '../../components/Band';
import halaAvifImageSrc from '../../assets/images/hala.avif';
import halaWebpImageSrc from '../../assets/images/hala.webp';
import halaJpgImageSrc from '../../assets/images/hala.jpg';
import React, { useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { usePhone } from '../../hooks/usePhone';
import { MobilePicture, SecondaryButton, Text } from './MainPage.styled';
import { SlantingFrameBox } from '../../components/SlantingFrameBox';
import { Trans } from 'react-i18next';
import { Icon } from '../../components/Icon';
import pinImageUrl from '../../assets/images/pin.svg';
import styled from 'styled-components';
import { Typography } from '../../components/Typography';

const MobileLocationButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(10%, -50%);
`;

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
    <SlantingFrameBox width="500px" padding="lg" gap="sm">
      <Typography size="xl" weight="bold">
        {t('spotBand.title')}
      </Typography>

      <Typography size="md">{t('spotBand.address')}</Typography>
      <Typography size="md">{t('spotBand.description')}</Typography>

      {!isSpotOpened && (
        <SecondaryButton onClick={() => setIsSpotOpened(true)}>{t('spotBand.howToGetToUs')}</SecondaryButton>
      )}
      {isSpotOpened && (
        <>
          <Typography size="lg" weight="bold">
            {t('spotBand.howToGetToUs')}
          </Typography>

          <Typography size="md">{t('spotBand.publicTransport')}</Typography>
          <Typography size="md">{t('spotBand.list')}</Typography>
          <Typography size="md">
            <Trans i18nKey="spotBand.option1" />
          </Typography>
          <Typography size="md">
            <Trans i18nKey="spotBand.option2" />
          </Typography>
          <Typography size="md">
            <Trans i18nKey="spotBand.option3" />
          </Typography>
          <Typography size="md">
            <Trans i18nKey="spotBand.option4" />
          </Typography>

          <Typography size="lg" weight="bold">
            {t('spotBand.accessibleByCar')}
          </Typography>
          <Typography size="md">{t('spotBand.byCar')}</Typography>

          <p>
            fot: <a href="https://halacracovii.pl/">https://halacracovii.pl/</a>{' '}
          </p>
        </>
      )}
    </SlantingFrameBox>
  );
};

const EventLocationButton = () => {
  const t = useTypedTranslation();

  return (
    <a
      target="_blank"
      rel="noreferrer"
      aria-label={t('spotBand.googleMaps')}
      href="https://www.google.pl/maps/@50.0572998,19.9107716,3a,75y,214.48h,88.44t/data=!3m6!1e1!3m4!1sVVYRGhxvt5uE6gsr_G7cwA!2e0!7i16384!8i8192?entry=ttu">
      <AnimatedIconWrapper>
        <Icon size="200px" src={pinImageUrl} dropShadow />
      </AnimatedIconWrapper>
    </a>
  );
};

type LocationSectionType = {
  id: string;
};

export const LocationBand = ({ id }: LocationSectionType) => {
  const isPhone = usePhone();

  return isPhone ? (
    <Band id={id}>
      <MobilePicture>
        <source srcSet={halaAvifImageSrc} type="image/avif" />
        <source srcSet={halaWebpImageSrc} type="image/webp" />
        <img loading="lazy" src={halaJpgImageSrc} alt="hala 100-lecia" />
        <MobileLocationButtonWrapper>
          <EventLocationButton />
        </MobileLocationButtonWrapper>
      </MobilePicture>

      <EventLocationCard />
    </Band>
  ) : (
    <Band
      id={id}
      justify="space-around"
      size="xl"
      padding="sm"
      variant="background-image"
      background={
        <Band.Picture>
          <source srcSet={halaAvifImageSrc} type="image/avif" />
          <source srcSet={halaWebpImageSrc} type="image/webp" />
          <img src={halaJpgImageSrc} alt="hala cracovii" />
        </Band.Picture>
      }>
      <Band.Slot>
        <EventLocationButton />
      </Band.Slot>

      <Band.Slot>
        <EventLocationCard />
      </Band.Slot>
    </Band>
  );
};
