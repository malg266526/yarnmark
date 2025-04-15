import { BackgroundColors } from '../../styles/theme';
import { ImageButton } from '../../components/ImageButton';
import { Icon } from '../../components/Icon';
import burgerImageUrl from '../../assets/iconify/burger.svg';
import cupcakeImageUrl from '../../assets/iconify/cupcake.svg';
import { FramedBox } from '../../components/FramedBox';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { usePhone } from '../../hooks/usePhone';
import { Picture } from '../../components/Picture';
import bezogrodekLogoUrl from '../../assets/images/minifiedLogos/logobezogrodek.jpg';
import bezogrodekLogoUrlWebp from '../../assets/images/minifiedLogos/logobezogrodek.webp';
import bezogrodekLogoUrlAvif from '../../assets/images/minifiedLogos/logobezogrodek.avif';
import { Trans } from 'react-i18next';
import halaLogoUrl from '../../assets/images/minifiedLogos/halalogo.jpg';
import halaLogoUrlWebp from '../../assets/images/minifiedLogos/halalogo.webp';
import halaLogoUrlAvif from '../../assets/images/minifiedLogos/halalogo.avif';
import { UnprefixedTranslationKeys, useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { ScreenSize } from '../../styles/screeen-size';
import { RedesignSpacings } from '../../styles/spacings';
import { Typography } from '../../components/Typography';
import { Band } from '../../components/bands/Band';
import { Icon as IconifyIcon } from '@iconify/react';
import { RowLayout } from '../../components/RowLayout';

type ActiveButtonType = 'foodtruckBezogrodek' | 'coffeehouse';

type ActiveButtonToImageConfig = Record<
  ActiveButtonType,
  {
    image: ReactNode;
    title: string;
    address?: ReactNode;
    instagramUrl?: string;
    description: ReactNode;
    discount?: ReactNode;
    menuUrl?: string;
  }
>;

export const LayoutWithActiveButton = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  max-width: 100%;
  flex-wrap: wrap;

  @media (max-width: ${ScreenSize.tablet}) {
    flex-direction: column;
    max-width: 100vw;
    margin-bottom: ${RedesignSpacings.md};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  position: relative;
  z-index: 1;
  min-width: 250px;

  @media (max-width: ${ScreenSize.tablet}) {
    margin-bottom: ${RedesignSpacings.md};
  }

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: row;
    flex-wrap: wrap;

    > * {
      flex: 1 1 auto;
    }
  }
`;

export const RestaurantContent = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${ScreenSize.phone}) {
    flex-wrap: wrap;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
    gap: ${RedesignSpacings.sm};
  }
`;

export const LogoColumn = styled.div`
  max-width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media (max-width: ${ScreenSize.phone}) {
    max-width: 100%;
    flex-wrap: wrap;
    gap: ${RedesignSpacings.sm};
  }
`;

type ActiveButtonToImageFunction = (t: (key: UnprefixedTranslationKeys) => string) => ActiveButtonToImageConfig;

const getActiveButtonToImage: ActiveButtonToImageFunction = (t) => ({
  foodtruckBezogrodek: {
    image: (
      <Picture
        width={180}
        height={180}
        alt="bezogrodek_logo"
        picture={{
          fallbackUrl: bezogrodekLogoUrl,
          sources: [
            {
              type: 'image/webp',
              url: bezogrodekLogoUrlWebp
            },
            {
              type: 'image/avif',
              url: bezogrodekLogoUrlAvif
            }
          ]
        }}
      />
    ),
    title: 'Bezogródek Tropical Spot',
    instagramUrl: 'https://www.instagram.com/bezogrodek/?hl=pl',
    address: 'al. Marszałka Ferdinanda Focha 41',
    description: t('foodBand.bezogrodek.description'),
    discount: <Trans i18nKey="foodBand.bezogrodek.discount" />
  },
  coffeehouse: {
    image: (
      <Picture
        width={200}
        alt="hala_logo"
        picture={{
          fallbackUrl: halaLogoUrl,
          sources: [
            {
              type: 'image/webp',
              url: halaLogoUrlWebp
            },
            {
              type: 'image/avif',
              url: halaLogoUrlAvif
            }
          ]
        }}
      />
    ),
    title: t('foodBand.coffeehouse.title'),
    description: t('foodBand.coffeehouse.description')
  }
});

type FoodBandType = {
  id: string;
};

export const FoodBand = ({ id }: FoodBandType) => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const [activeButton, setActiveButton] = useState<ActiveButtonType>('foodtruckBezogrodek');

  const activeButtonToImage = getActiveButtonToImage(t);

  const rensponsivePadding = isPhone ? 'sm' : 'xl';

  const framedBoxRef = useRef<HTMLDivElement | null>(null);

  const onRestaurantClick = useCallback(
    (activeRestaurant: ActiveButtonType) => {
      setActiveButton(activeRestaurant);

      if (isPhone) {
        framedBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [isPhone]
  );

  return (
    <Band.CenteredColumn
      id={id}
      size="md"
      color={BackgroundColors.navigationBand}
      padding={rensponsivePadding}
      gap="md">
      <Band.Title>{t('foodBand.whereToEat')}</Band.Title>

      <LayoutWithActiveButton>
        <ButtonsWrapper>
          <ImageButton
            active={activeButton === 'foodtruckBezogrodek'}
            onClick={() => onRestaurantClick('foodtruckBezogrodek')}
            icon={<Icon size="md" src={burgerImageUrl} />}>
            Food Truck Park Bezogródek
          </ImageButton>

          <ImageButton
            active={activeButton === 'coffeehouse'}
            icon={<Icon size="md" src={cupcakeImageUrl} />}
            onClick={() => onRestaurantClick('coffeehouse')}
            ref={framedBoxRef}>
            Kawiarnia na hali
          </ImageButton>
        </ButtonsWrapper>

        <FramedBox padding="sm" id="framedBox">
          <RestaurantContent id="restaurantContent">
            <FlexColumnLayout padding={isPhone ? 'none' : 'md'} gap={isPhone ? 'sm' : 'md'}>
              <Typography size="lg">{activeButtonToImage[activeButton].title}</Typography>

              <Typography size="sm">{activeButtonToImage[activeButton].description}</Typography>
              <Typography size="sm">{activeButtonToImage[activeButton].discount}</Typography>
            </FlexColumnLayout>

            <LogoColumn>
              {activeButtonToImage[activeButton].image}

              <RowLayout align="flex-start">
                {activeButtonToImage[activeButton].menuUrl && (
                  <a href={activeButtonToImage[activeButton].menuUrl} target="_blank" rel="noreferrer">
                    <IconifyIcon color="black" icon="hugeicons:menu-restaurant" width="40" height="40" />
                  </a>
                )}
              </RowLayout>
            </LogoColumn>
          </RestaurantContent>
        </FramedBox>
      </LayoutWithActiveButton>
    </Band.CenteredColumn>
  );
};
