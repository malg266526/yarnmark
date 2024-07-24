import React from 'react';
import { StyledPageContent } from './info-for-vendors/InfoForVendorsPage.styled';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import { Picture } from '../components/Picture';
import hallMapImageUrlAvif from '../assets/images/Mapka_targi.avif';
import hallMapImageUrlJpg from '../assets/images/Mapka_targi.jfif';
import hallMapImageUrlWebp from '../assets/images/Mapka_targi.webp';
import legendImageUrlAvif from '../assets/images/Legenda.avif';
import legendImageUrlJpg from '../assets/images/Legenda.jfif';
import legendImageUrlWebp from '../assets/images/legenda.webp';
import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';
import { usePhone, useTablet } from '../hooks/usePhone';
import { FullSizePicture } from '../components/FullSizePicture';
import { BackgroundImageBand } from '../components/bands/BackgroundImageBand';

const MapWithLegend = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding: ${Spacings.md};
  background-color: white;

  @media (max-width: ${ScreenSize.smallPc}) {
    flex-direction: column;
    align-items: center;
    overflow-x: scroll;
  }

  @media (max-width: ${ScreenSize.smallPc}) {
    align-items: flex-start;
  }
`;

export const HallMapPage = () => {
  const isTablet = useTablet();
  const isPhone = usePhone();

  const mapSize = isPhone ? '360px' : isTablet ? '500px' : '700px';
  const legendSize = isPhone ? '200px' : isTablet ? '400px' : '500px';

  return (
    <StyledPageContent variant="wide" padding="none">
      <BackgroundImageBand
        size="sm"
        justify="center"
        padding="xxl"
        picture={
          <FullSizePicture>
            <source srcSet={woolsAvifLandscape} type="image/avif" />
            <img src={woolsWebpLandscape} alt="wool" />
          </FullSizePicture>
        }>
        <MapWithLegend>
          <Picture
            picture={{
              fallbackUrl: hallMapImageUrlJpg,
              sources: [
                {
                  type: 'image/webp',
                  url: hallMapImageUrlWebp
                },
                {
                  type: 'image/avif',
                  url: hallMapImageUrlAvif
                }
              ]
            }}
            alt="hall_map"
            width={mapSize}
            style={{ alignSelf: 'center' }}
          />

          <Picture
            picture={{
              fallbackUrl: legendImageUrlJpg,
              sources: [
                {
                  type: 'image/webp',
                  url: legendImageUrlWebp
                },
                {
                  type: 'image/avif',
                  url: legendImageUrlAvif
                }
              ]
            }}
            alt="hall_map"
            width={legendSize}
            style={{ alignSelf: 'center' }}
          />
        </MapWithLegend>
      </BackgroundImageBand>
    </StyledPageContent>
  );
};
