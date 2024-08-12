import { Band } from '../../components/bands/Band';
import halaAvifImageSrc from '../../assets/images/hala.avif';
import halaWebpImageSrc from '../../assets/images/hala.webp';
import halaJpgImageSrc from '../../assets/images/hala.jpg';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { Typography } from '../../components/Typography';
import { BackgroundPicture } from '../../components/BackgroundPicture';
import { BackgroundColors } from '../../styles/theme';
import { RedesignSpacings, Spacings } from '../../styles/spacings';
import { DropShadow, Radius } from '../../styles/cards';
import { useToggle } from '../../hooks/useToggle';
import chevronDownIcon from '../../assets/figmaIcons/chevron_down-icon.svg';
import { Icon } from '../../components/Icon';

const MapIframeWrapper = styled.div`
  z-index: 1;
  padding: ${RedesignSpacings.sm};
  background-color: white;
  border-radius: ${Radius.md};
  box-shadow: ${DropShadow.md};
  align-self: flex-start;
`;

const BusesSection = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0px')};
  overflow-y: scroll;
  text-align: justify;
  gap: ${RedesignSpacings.xs};
  font-family: 'Roboto Thin';
  transition: all 1s ease;
`;

export const SecondaryButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-top: ${Spacings.sm};
  background-color: transparent;
  border: none;
  gap: ${RedesignSpacings.xs};
`;

const ChevronIcon = styled(Icon)`
  transition: all 0.2s linear;

  &.active {
    transform: rotate(180deg);
  }
`;

const EventLocationCard = () => {
  const t = useTypedTranslation();
  const [isSpotOpened, toggle] = useToggle();

  return (
    <SlantedCornersBox width="500px" padding="md" gap="sm">
      <Typography size="xl" weight="bold">
        {t('spotBand.title')}
      </Typography>

      <Typography size="sm">{t('spotBand.address')}</Typography>
      <Typography size="sm">{t('spotBand.description')}</Typography>

      <SecondaryButton onClick={toggle}>
        <Typography size="lg" weight="bold">
          {t('spotBand.howToGetToUs')}
        </Typography>
        <ChevronIcon size="xs" zIndex={0} src={chevronDownIcon} className={isSpotOpened ? `active` : ''} />
      </SecondaryButton>

      {isSpotOpened && (
        <BusesSection isOpen={isSpotOpened}>
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

          <Typography size="md" weight="bold">
            {t('spotBand.accessibleByCar')}
          </Typography>
          <Typography size="sm">{t('spotBand.byCar')}</Typography>

          <p>
            fot: <a href="https://halacracovii.pl/">https://halacracovii.pl/</a>{' '}
          </p>
        </BusesSection>
      )}
    </SlantedCornersBox>
  );
};

type LocationSectionType = {
  id: string;
};

export const LocationBand = ({ id }: LocationSectionType) => {
  return (
    <Band.Solid id={id} justify="space-around" size="xl" gap="md" color={BackgroundColors.navigationBand}>
      <BackgroundPicture size="70%" filter="grayscale(0.2) brightness(1.3) contrast(0.8)">
        <source srcSet={halaAvifImageSrc} type="image/avif" />
        <source srcSet={halaWebpImageSrc} type="image/avif" />

        <img loading="lazy" src={halaJpgImageSrc} alt="hala 100-lecia" />
      </BackgroundPicture>

      <MapIframeWrapper>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10246.191626486176!2d19.91077164422553!3d50.05729980000923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1723487309028!5m2!1spl!2spl"
          width="340"
          height="230"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </MapIframeWrapper>

      <EventLocationCard />
    </Band.Solid>
  );
};
