import React from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { Picture } from '../../../components/Picture';
import { usePhone } from '../../../hooks/usePhone';
import { RedesignSpacings } from '../../../styles/spacings';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { TextCarousel, TextCarouselItem } from '../../../components/carousels/TextCarousel';
import { SlantedCornersBox } from '../../../components/SlantedCornersBox';

import lagrugruJpg from '../../../assets/images/lagrugru/DSC04493.jpg';
import lagrugruWebp from '../../../assets/images/lagrugru/DSC04493.webp';
import lagrugruAvif from '../../../assets/images/lagrugru/DSC04493.avif';

interface StyledProps {
  isPhone: boolean;
}

const lagrugruPictureConfig = {
  fallbackUrl: lagrugruJpg,
  sources: [
    {
      type: 'image/avif',
      url: lagrugruAvif
    },
    {
      type: 'image/webp',
      url: lagrugruWebp
    }
  ]
};

const carouselItems: TextCarouselItem[] = [
  {
    title: 'LaGrrrrruGru',
    subtitle: 'Zestaw szydełkowy na krakoskiego amigurumi gołąbka',
    description:
      'Kompletny box: wyjątkowy, dedykowany wzór by SisHomemade, włóczka oraz akcesoria. Potrzebujesz jedynie szydełka. Wzór otrzymasz w wersji elektronicznej',
    button: {
      title: 'Kupisz tutaj'
    }
  },
  {
    title: 'Wybierz Swój Rozmiar!',
    subtitle: 'Dwa rozmiary do wyboru - 10cm i 15cm',
    description:
      'Obydwa rozmiary zawierają brelok. Box zawiera wzór oraz ilość włóczki potrzebną do wykonania wybranego przez ciebie rozmiaru',
    extraParagraph: 'Cena: 79zł zestaw mały, 89zł zestaw duży'
  },
  {
    title: 'Kolor Niespodzianka!',
    subtitle: 'Różne warianty kolorystyczne oraz gołąbkowe dodatki',
    description:
      'LaGruGru dostępny będzie w wielu wariantach kolorystycznych, ale...  kolor, który otrzymasz pozostaje niespodzianką! Czy trafi ci się klasyczek, szalona wersja multikolor, romantyczna, a może złoty a skromny? Dowiesz się otwierając paczkę!',
    extraParagraph:
      'Niektóre gołąbki będą zawierały również extra atrybuty. Dodatkowa karta wzoru oraz włóczką będą w boxie. Czy dostaniesz LaGruGru w koronie? A może z obwarzankiem? Tutaj również zdecyduje los!'
  },
  {
    title: 'Warsztat towarzyszący',
    subtitle: 'LaGruGru z SisHomemade',
    description:
      'Na warsztacie z Sis zaczniesz ??. Wzór oraz box otrzymasz na miejscu. Wymagana umiejętność zrobienia łańcuszka oraz półsłupka',
    button: {
      title: 'Więcej info o warsztatach'
    }
  }
];

const TwoColumnLayout = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${({ isPhone }) => (isPhone ? 'column' : 'row')};
  width: ${({ isPhone }) => (isPhone ? '100%' : '80%')};
  align-items: center;
  justify-content: center;
  gap: ${({ isPhone }) => (isPhone ? RedesignSpacings.lg : RedesignSpacings.xl)};
  margin-top: ${({ isPhone }) => (isPhone ? RedesignSpacings.md : RedesignSpacings.xl)};

  > div {
    flex: 1;
    width: ${({ isPhone }) => (isPhone ? '100%' : '50%')};
    display: flex;
    justify-content: center;
  }
`;

export const LaGruGruBand = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn id="lagrugru" size="lg" color={BackgroundColors.card} padding={isPhone ? 'lg' : 'xxxl'}>
      <Band.Title>{t('lagrugruBand.title')}</Band.Title>

      <TwoColumnLayout isPhone={isPhone}>
        <div>
          <SlantedCornersBox width={isPhone ? '100%' : '700px'} padding="none" overflowSize="10px">
            <Picture picture={lagrugruPictureConfig} alt="Grupa LaGruGru" width={isPhone ? 300 : 700} />
          </SlantedCornersBox>
        </div>

        <div>
          <TextCarousel items={carouselItems} />
        </div>
      </TwoColumnLayout>
    </Band.CenteredColumn>
  );
};
