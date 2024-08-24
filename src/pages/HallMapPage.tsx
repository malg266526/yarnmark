import React from 'react';
import { Picture } from '../components/Picture';
import hallMapImageUrlAvif from '../assets/images/Mapka_targi.avif';
import hallMapImageUrlJpg from '../assets/images/Mapka_targi.jfif';
import hallMapImageUrlWebp from '../assets/images/Mapka_targi.webp';
import legendImageUrlAvif from '../assets/images/Legenda.avif';
import legendImageUrlJpg from '../assets/images/Legenda.jfif';
import legendImageUrlWebp from '../assets/images/legenda.webp';
import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { RedesignSpacings } from '../styles/spacings';
import { usePhone, useTablet } from '../hooks/usePhone';
import { PageContent } from '../components/PageContent';
import { Menu } from './menu/Menu';
import { Band } from '../components/bands/Band';
import { WoolPicture } from '../components/WoolPicture';
import { SlantedCornersBox } from '../components/SlantedCornersBox';
import { CenteredSection } from '../components/CenteredSection';
import { BandTitle } from '../components/bands/BandTitle';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { BackgroundColors } from '../styles/theme';

const InvitationBoxWrapper = styled.div`
  padding-left: 240px;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const MapWithLegend = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding: ${RedesignSpacings.sm};
  background-color: white;
  z-index: 1;

  @media (max-width: ${ScreenSize.smallPc}) {
    flex-direction: column;
    align-items: center;
    overflow-x: scroll;
  }

  @media (max-width: ${ScreenSize.smallPc}) {
    align-items: flex-start;
  }

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

export const HallMapPage = () => {
  const isTablet = useTablet();
  const isPhone = usePhone();
  const t = useTypedTranslation();

  const mapSize = isPhone ? '360px' : isTablet ? '500px' : '700px';
  const legendSize = isPhone ? '200px' : '400px';

  return (
    <PageContent variant="wide" padding="none">
      <Menu />

      <Band.Wallpaper id="infoForVendorsIntro" picture={<WoolPicture />} size="md" justify="flex-start">
        <InvitationBoxWrapper>
          <SlantedCornersBox overflowSize="10px" width="500px" padding="lg">
            <CenteredSection>
              <BandTitle>{t('hallMap.title')}</BandTitle>
            </CenteredSection>
          </SlantedCornersBox>
        </InvitationBoxWrapper>
      </Band.Wallpaper>

      <Band.CenteredColumn
        id="hallMap"
        size="sm"
        color={BackgroundColors.navigationBand}
        padding={isPhone ? 'sm' : 'lg'}>
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
      </Band.CenteredColumn>
    </PageContent>
  );
};
