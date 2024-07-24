import { BrownScale } from '../../styles/theme';
import { ButtonsWrapper, ImageContentLayout, ImageWrapperColumn } from './MainPage.styled';
import { ImageButton } from '../../components/ImageButton';
import { Icon } from '../../components/Icon';
import burgerImageUrl from '../../assets/iconify/burger.svg';
import turkeyImageUrl from '../../assets/iconify/turkey.svg';
import shrimpImageUrl from '../../assets/iconify/shrimp.svg';
import coffeeImageUrl from '../../assets/iconify/coffee.svg';
import cupcakeImageUrl from '../../assets/iconify/cupcake.svg';
import { FramedBox } from '../../components/FramedBox';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import React, { ReactNode, useState } from 'react';
import { usePhone } from '../../hooks/usePhone';
import { Picture } from '../../components/Picture';
import bezogrodekLogoUrl from '../../assets/images/minifiedLogos/logobezogrodek.jpg';
import bezogrodekLogoUrlWebp from '../../assets/images/minifiedLogos/logobezogrodek.webp';
import bezogrodekLogoUrlAvif from '../../assets/images/minifiedLogos/logobezogrodek.avif';
import instagramImageUrl from '../../assets/iconify/instagram.svg';
import { Trans } from 'react-i18next';
import bistroImageSrc from '../../assets/images/bistro_photo.jpg';
import bistrobloniaLogoUrl from '../../assets/images/minifiedLogos/bistroblonia.jpg';
import bistrobloniaLogoUrlWebp from '../../assets/images/minifiedLogos/bistroblonia.webp';
import bistrobloniaLogoUrlAvif from '../../assets/images/minifiedLogos/bistroblonia.avif';
import grandeAppetitoUrl from '../../assets/images/minifiedLogos/grande_photo.jpg';
import grandeAppetitoUrlWebp from '../../assets/images/minifiedLogos/grande_photo.webp';
import grandeAppetitoUrlAvif from '../../assets/images/minifiedLogos/grande_photo.avif';
import grandeAppetitoLogoUrl from '../../assets/images/minifiedLogos/GrandeAppetito.jpg';
import grandeAppetitoLogoUrlWebp from '../../assets/images/minifiedLogos/GrandeAppetito.webp';
import grandeAppetitoLogoUrlAvif from '../../assets/images/minifiedLogos/GrandeAppetito.avif';
import knittedCoffeeUrl from '../../assets/images/minifiedLogos/knitted2.jpg';
import knittedCoffeeUrlWebp from '../../assets/images/minifiedLogos/knitted2.webp';
import knittedCoffeeUrlAvif from '../../assets/images/minifiedLogos/knitted2.avif';
import knittedCoffeeLogoUrl from '../../assets/images/minifiedLogos/knitted.jpg';
import knittedCoffeeLogoUrlWebp from '../../assets/images/minifiedLogos/knitted.webp';
import knittedCoffeeLogoUrlAvif from '../../assets/images/minifiedLogos/knitted.avif';
import { Icon as IconifyIcon } from '@iconify/react';
import halaLogoUrl from '../../assets/images/minifiedLogos/halalogo.jpg';
import halaLogoUrlWebp from '../../assets/images/minifiedLogos/halalogo.webp';
import halaLogoUrlAvif from '../../assets/images/minifiedLogos/halalogo.avif';
import { UnprefixedTranslationKeys, useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { ScreenSize } from '../../styles/screeen-size';
import { Spacings } from '../../styles/spacings';
import { CenteredParagraph } from '../../components/CenteredParagraph';
import { Typography } from '../../components/Typography';
import { BandTitle } from '../../components/bands/BandTitle';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';

type ActiveButtonType =
  | 'foodtruckBezogrodek'
  | 'gospodaNaPiastowskiej'
  | 'bistroblonia'
  | 'grandeappetito'
  | 'coffeehouse'
  | 'knittedCoffee';

type ActiveButtonToImageConfig = Record<
  ActiveButtonType,
  {
    image: ReactNode;
    text: ReactNode;
    secondaryText?: ReactNode;
  }
>;

export const ActiveImage = styled.img`
  max-height: 300px;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
    max-width: 100%;
  }
`;

export const LayoutWithActiveButton = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: ${Spacings.xs};
  max-width: 100%;
  gap: ${Spacings.lg};
  flex-wrap: wrap;

  @media (max-width: ${ScreenSize.tablet}) {
    margin-top: ${Spacings.md};
    flex-direction: column;
    max-width: 100vw;
  }
`;

type ActiveButtonToImageFunction = (t: (key: UnprefixedTranslationKeys) => string) => ActiveButtonToImageConfig;

const getActiveButtonToImage: ActiveButtonToImageFunction = (t) => ({
  foodtruckBezogrodek: {
    image: (
      <Picture
        width={240}
        height={240}
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
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.bezogrodekDescription')}

        <a
          href="https://www.instagram.com/bezogrodek/?hl=pl"
          target="_blank"
          rel="noreferrer"
          aria-label="See bezogrodek instagram">
          <Icon size="xl" src={instagramImageUrl} />
        </a>

        <p>
          <Trans i18nKey="foodBand.bezogrodekDescription2" />
        </p>
      </FlexColumnLayout>
    )
  },
  bistroblonia: {
    image: <ActiveImage src={bistroImageSrc} />,
    secondaryText: <Trans i18nKey="foodBand.discount15" />,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={120}
          alt="bistroblonia_logo"
          picture={{
            fallbackUrl: bistrobloniaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: bistrobloniaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: bistrobloniaLogoUrlAvif
              }
            ]
          }}
        />

        {t('foodBand.bistroBloniaDescription')}
        <a href="https://bloniabistro.pl/wp-content/uploads/2024/02/menu-BB.pdf" target="_blank" rel="noreferrer">
          {t('foodBand.checkMenu')}
        </a>
        <a
          href="https://www.instagram.com/blonia_bistro/?hl=pl"
          target="_blank"
          rel="noreferrer"
          aria-label="See Bistro Błonia instagram">
          <Icon size="xl" src={instagramImageUrl} />
        </a>
      </FlexColumnLayout>
    )
  },
  grandeappetito: {
    image: (
      <Picture
        width={240}
        alt="grandeappetito_logo"
        picture={{
          fallbackUrl: grandeAppetitoUrl,
          sources: [
            {
              type: 'image/webp',
              url: grandeAppetitoUrlWebp
            },
            {
              type: 'image/avif',
              url: grandeAppetitoUrlAvif
            }
          ]
        }}
      />
    ),
    secondaryText: <Trans i18nKey="foodBand.discount10" />,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={160}
          alt="grandeappetito_logo"
          picture={{
            fallbackUrl: grandeAppetitoLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: grandeAppetitoLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: grandeAppetitoLogoUrlAvif
              }
            ]
          }}
        />
        {t('foodBand.grandeAppetitoDescription')}
        <p>{t('foodBand.grandeAppetitoDescription2')}</p>

        <a href="https://grande-appetito.pl/menu/" target="_blank" rel="noreferrer">
          {t('foodBand.checkMenu')}
        </a>
        <a
          href="https://www.instagram.com/grande_appetito_ristorante/?hl=pl"
          target="_blank"
          rel="noreferrer"
          aria-label="See Grande appetito instagram">
          <Icon size="xl" src={instagramImageUrl} />
        </a>
      </FlexColumnLayout>
    )
  },
  gospodaNaPiastowskiej: {
    image: <ActiveImage src={bistroImageSrc} />,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        {t('foodBand.piastowskaDescription')}
        <a href="https://gospodapiastowska.pl/menu/" target="_blank" rel="noreferrer">
          {t('foodBand.checkMenu')}
        </a>
      </FlexColumnLayout>
    )
  },
  knittedCoffee: {
    image: (
      <Picture
        width={240}
        alt="knitted_coffee"
        picture={{
          fallbackUrl: knittedCoffeeUrl,
          sources: [
            {
              type: 'image/webp',
              url: knittedCoffeeUrlWebp
            },
            {
              type: 'image/avif',
              url: knittedCoffeeUrlAvif
            }
          ]
        }}
      />
    ),
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={140}
          alt="knitted_coffee_logo"
          picture={{
            fallbackUrl: knittedCoffeeLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: knittedCoffeeLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: knittedCoffeeLogoUrlAvif
              }
            ]
          }}
        />
        {t('foodBand.knittedCoffeeDescription')}
        <a href="https://www.instagram.com/knittedcoffee/?hl=pl" target="_blank" rel="noreferrer">
          <Icon size="xl" src={instagramImageUrl} />
        </a>
      </FlexColumnLayout>
    )
  },
  coffeehouse: {
    image: <IconifyIcon icon="noto:teapot" width="288" height="188" />,
    text: (
      <FlexColumnLayout gap="sm" padding="none">
        <Picture
          width={240}
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
        {t('foodBand.coffeehouse')}
      </FlexColumnLayout>
    )
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

  return (
    <SolidBackgroundBand id={id} size="md" color={BrownScale[200]} padding="xl" direction="column" align="center">
      <CenteredParagraph>
        <BandTitle>Gdzie zjeść?</BandTitle>
      </CenteredParagraph>

      <LayoutWithActiveButton>
        <ButtonsWrapper>
          <ImageButton
            active={activeButton === 'foodtruckBezogrodek'}
            onClick={() => setActiveButton('foodtruckBezogrodek')}
            icon={<Icon size="xl" src={burgerImageUrl} />}>
            Food Truck Park Bezogródek
          </ImageButton>

          <ImageButton
            active={activeButton === 'bistroblonia'}
            onClick={() => setActiveButton('bistroblonia')}
            icon={<Icon size="xl" src={turkeyImageUrl} />}>
            Bistro Błonia
          </ImageButton>

          <ImageButton
            active={activeButton === 'grandeappetito'}
            onClick={() => setActiveButton('grandeappetito')}
            icon={<Icon size="xl" src={shrimpImageUrl} />}>
            Grande Appetito
          </ImageButton>

          <ImageButton
            active={activeButton === 'knittedCoffee'}
            icon={<Icon size="xl" src={coffeeImageUrl} />}
            onClick={() => setActiveButton('knittedCoffee')}>
            Knitted Coffee
          </ImageButton>

          <ImageButton
            active={activeButton === 'coffeehouse'}
            icon={<Icon size="xl" src={cupcakeImageUrl} />}
            onClick={() => setActiveButton('coffeehouse')}>
            Kawiarnia na hali
          </ImageButton>
        </ButtonsWrapper>

        <FramedBox padding="md">
          <ImageContentLayout>
            <FlexColumnLayout padding={isPhone ? 'none' : 'md'} gap={isPhone ? 'sm' : 'md'}>
              {activeButtonToImage[activeButton].image}
              <Typography size="md">{activeButtonToImage[activeButton].secondaryText}</Typography>
            </FlexColumnLayout>

            <ImageWrapperColumn>
              <Typography size="md">{activeButtonToImage[activeButton].text}</Typography>
            </ImageWrapperColumn>
          </ImageContentLayout>
        </FramedBox>
      </LayoutWithActiveButton>
    </SolidBackgroundBand>
  );
};
