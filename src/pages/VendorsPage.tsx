import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Link } from '../components/Link';
import { PageContent } from '../components/PageContent';
import { Spacings } from '../styles/spacings';
import MockLogo from './../assets/images/logo_wystawcy.png';
import BifernoLogoUrl from './../assets/images/biferno.png';
import MadoboLogoUrl from './../assets/images/madobo.png';
import MiedzyDrutamiLogoUrl from './../assets/images/miedzydrutami.png';
import WoollalaLogoUrl from './../assets/images/woollala.jpg';
import WoolloopLogoUrl from './../assets/images/woolloop.png';
import WoolniejLogoUrl from './../assets/images/woolniej.png';
import TimeToKnitLogoUrl from './../assets/images/timetoknit.jpg';
import YarnWithLoveLogoUrl from './../assets/images/yarnwithlove.png';

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: center;
  gap: ${Spacings.sm};
`;

export const VendorsPage = () => {
  return (
    <PageContent variant="narrow">
      <Card flexDirection="row">
        <FlexColumnLayout>
          <Grid>
            <Link href="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
              <img width={160} src={MockLogo} alt="wloczykijki" />
            </Link>

            <Link href="https://biferno.pl/" target="_blank" rel="noreferrer">
              <img width={140} src={BifernoLogoUrl} alt="biferno" />
            </Link>

            <Link href="https://madobo.pl" target="_blank" rel="noreferrer">
              <img width={140} src={MadoboLogoUrl} alt="madobo" />
            </Link>

            <Link href="https://miedzydrutami.pl" target="_blank" rel="noreferrer">
              <img width={140} src={MiedzyDrutamiLogoUrl} alt="miedzydrutami" />
            </Link>

            <Link href="https://www.woollala.com" target="_blank" rel="noreferrer">
              <img width={120} src={WoollalaLogoUrl} alt="woollala" />
            </Link>

            <Link href="https://woolloop.pl" target="_blank" rel="noreferrer">
              <img width={160} src={WoolloopLogoUrl} alt="woolloop" />
            </Link>

            <Link href="https://www.instagram.com/woolniej.pl" target="_blank" rel="noreferrer">
              <img width={160} src={WoolniejLogoUrl} alt="woolniej" />
            </Link>

            <Link href="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
              <img width={200} src={TimeToKnitLogoUrl} alt="timetoknit" />
            </Link>

            <Link href="https://yarnwithlove.pl/" target="_blank" rel="noreferrer">
              <img width={140} src={YarnWithLoveLogoUrl} alt="yarnwithlove" />
            </Link>
          </Grid>
        </FlexColumnLayout>
      </Card>
    </PageContent>
  );
};
