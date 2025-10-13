import React from 'react';
import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { RedesignSpacings } from '../styles/spacings';
import { usePhone } from '../hooks/usePhone';
import { PageContent } from '../components/PageContent';
import { Header } from './menu/Header';
import { Band } from '../components/bands/Band';
import { WoolPicture } from '../components/WoolPicture';
import { SlantedCornersBox } from '../components/SlantedCornersBox';
import { CenteredSection } from '../components/CenteredSection';
import { BandTitle } from '../components/bands/BandTitle';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { BackgroundColors } from '../styles/theme';
import { Hall } from '../components/Hall';

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
  const isPhone = usePhone();
  const t = useTypedTranslation();

  return (
    <PageContent variant="wide" padding="none">
      <Header />

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
        padding={isPhone ? 'sm' : 'lg'}
      >
        <MapWithLegend>
          <Hall multiplier={isPhone ? 13 : 20} />
        </MapWithLegend>
      </Band.CenteredColumn>
    </PageContent>
  );
};
