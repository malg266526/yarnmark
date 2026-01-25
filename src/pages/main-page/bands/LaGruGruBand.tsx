import React from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { Picture } from '../../../components/Picture';
import { usePhone } from '../../../hooks/usePhone';
import { RedesignSpacings } from '../../../styles/spacings';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { TextCarousel, TextCarouselItem } from '../../../components/carousels/TextCarousel';
import grupoweJpgSrc from '../../../assets/napole/grupowe.jpeg';

interface StyledProps {
  isPhone: boolean;
}

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

const ContentGrid = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${({ isPhone }) => (isPhone ? 'column' : 'row')};
  width: 100%;
  max-width: 1200px;
  align-items: center;
  justify-content: space-evenly;
  gap: ${({ isPhone }) => (isPhone ? RedesignSpacings.lg : RedesignSpacings.xl)};
  margin-top: ${({ isPhone }) => (isPhone ? RedesignSpacings.md : RedesignSpacings.xl)};
`;

const ImageWrapper = styled.div<StyledProps>`
  z-index: 1;
  width: ${({ isPhone }) => (isPhone ? '100%' : '400px')};
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
`;

export const LaGruGruBand = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn id="lagrugru" size="lg" color={BackgroundColors.card} padding={isPhone ? 'lg' : 'xxxl'}>
      <Band.Title>{t('lagrugruBand.title')}</Band.Title>

      <ContentGrid isPhone={isPhone}>
        <ImageWrapper isPhone={isPhone}>
          <Picture picture={{ fallbackUrl: grupoweJpgSrc }} alt="Grupa LaGruGru" width={isPhone ? 400 : 400} />
        </ImageWrapper>

        <TextCarousel items={carouselItems} />
      </ContentGrid>
    </Band.CenteredColumn>
  );
};
