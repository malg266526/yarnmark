import React from 'react';
import styled from 'styled-components';
import { ScreenSize } from '../styles/screeen-size';
import { usePhone } from '../hooks/usePhone';
import { PageContent } from '../components/PageContent';
import { Header } from './menu/Header';
import { Band } from '../components/bands/Band';
import { WoolPicture } from '../components/WoolPicture';
import { SlantedCornersBox } from '../components/SlantedCornersBox';
import { CenteredSection } from '../components/CenteredSection';
import { BandTitle } from '../components/bands/BandTitle';
import { BackgroundColors, HallColors } from '../styles/theme';
import { RedesignSpacings } from '../styles/spacings';
import { Typography } from '../components/Typography';

const InvitationBoxWrapper = styled.div`
  padding-left: 240px;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const Table = styled.div`
  display: grid;
  flex: 1;
  width: 80%;

  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: ${RedesignSpacings.sm};
  overflow: scroll;

  @media (max-width: ${ScreenSize.tablet}) {
    max-width: 100vw;
    width: 100%;
    overflow: scroll;

    grid-gap: ${RedesignSpacings.xxs};
  }
`;

const Th = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cell = styled.div<{ background?: keyof typeof HallColors }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${RedesignSpacings.sm};
  border-radius: ${RedesignSpacings.xxs};

  background-color: ${({ background }) => (background ? HallColors[background] : 'transparent')};
`;

export const WorkshopsSchedule = () => {
  const isPhone = usePhone();

  return (
    <PageContent variant="wide" padding="none">
      <Header />

      <Band.Wallpaper id="infoForVendorsIntro" picture={<WoolPicture />} size="md" justify="flex-start">
        <InvitationBoxWrapper>
          <SlantedCornersBox overflowSize="10px" width="500px" padding="lg">
            <CenteredSection>
              <BandTitle>Harmonogram warsztatów</BandTitle>
            </CenteredSection>
          </SlantedCornersBox>
        </InvitationBoxWrapper>
      </Band.Wallpaper>

      <Band.CenteredColumn
        id="hallMap"
        size="sm"
        color={BackgroundColors.navigationBand}
        padding={isPhone ? 'sm' : 'lg'}>
        <Table>
          <Th>
            <Typography size="md" weight="bold">
              Biblioteka
            </Typography>
          </Th>
          <Th>
            <Typography size="md" weight="bold">
              Bursa - Sala A
            </Typography>
          </Th>
          <Th>
            <Typography size="md" weight="bold">
              Hala - Sala konferencyjna
            </Typography>
          </Th>
          <Th>
            <Typography size="md" weight="bold">
              Bursa - Sala B
            </Typography>
          </Th>

          <Cell background={100}>
            <p>Edknitted</p>
            <h3>Polish Your Pattern</h3>
            <Typography size="md">9:00 - 12:00</Typography>
          </Cell>

          <Cell background={200}>
            <p>Knitolog</p>
            <h3>Żakard dla mniej lub bardziej zaawansowanych</h3>
            <Typography size="md">9:00 - 12:00</Typography>
          </Cell>

          <Cell background={300}>
            <p>Lud-art</p>
            <h3>Haft Ludowy</h3>
            <Typography size="md">9:00 - 12:00</Typography>
          </Cell>

          <Cell background={400}>
            <p>Drutututu</p>
            <h3>Druty - podstawy</h3>
            <Typography size="md">9:00 - 11:00</Typography>
          </Cell>

          <Cell background={400}>
            <p>Skein</p>
            <h3>Punch needle</h3>
            <Typography size="md">12:30 - 15:30</Typography>
          </Cell>

          <Cell background={300}>
            <p>Iwona Eriksson</p>
            <h3>Rzędy skrócone</h3>
            <Typography size="md">12:30 - 15:30</Typography>
          </Cell>

          <Cell background={200}>
            <p>Kroopa Knits</p>
            <h3>Podstawy żakardu</h3>
            <Typography size="md">12:30 - 16:30</Typography>
          </Cell>

          <Cell background={100}>
            <p>Heart of Cotton</p>
            <h3>Podstawy szydełka</h3>
            <Typography size="md">11:30 - 13:30</Typography>
          </Cell>

          <Cell />
          <Cell />
          <Cell />
          <Cell background={300}>
            <p>Haftowa Baba</p>
            <h3>Haft na wełnie</h3>
            <Typography size="md">14:00 - 17:00</Typography>
          </Cell>
        </Table>
      </Band.CenteredColumn>
    </PageContent>
  );
};
