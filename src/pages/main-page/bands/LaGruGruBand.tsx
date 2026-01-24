import React from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { Picture } from '../../../components/Picture';
import { usePhone } from '../../../hooks/usePhone';
import { RedesignSpacings } from '../../../styles/spacings';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { TextCarousel } from '../../../components/carousels/TextCarousel';
import grupoweJpgSrc from '../../../assets/napole/grupowe.jpeg';

interface StyledProps {
  isPhone: boolean;
}

const carouselItems = [
  {
    subtitle: 'Kim jesteśmy?',
    description: 'Grupą pasjonatów, która zamienia rzemiosło w przestrzeń spotkań. Tutaj każde oczko ma swoją historię.'
  },
  {
    subtitle: 'Nasze spotkania',
    description: 'Tworzymy w przyjaznej atmosferze, dzieląc się splotami i inspiracją przy wspólnej kawie.'
  },
  {
    subtitle: 'Dołącz do nas',
    description:
      'Niezależnie od Twojego doświadczenia, zawsze znajdziemy miejsce dla kolejnej pary rąk i nowych pomysłów.'
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

        <TextCarousel title="Poznaj nas bliżej" items={carouselItems} />
      </ContentGrid>
    </Band.CenteredColumn>
  );
};
