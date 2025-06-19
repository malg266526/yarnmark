import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Link } from '../../components/Link';
import { ScreenSize } from '../../styles/screeen-size';

import wloczykijkiLogoUrl from '../../assets/images/minifiedLogos/wloczykijki.png';
import wloczykijkiLogoUrlAvif from '../../assets/images/minifiedLogos/wloczykijki.avif';
import wloczykijkiLogoUrlWebp from '../../assets/images/minifiedLogos/wloczykijki.webp';

import { Picture } from '../../components/Picture';

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 40px;
  padding-top: ${RedesignSpacings.sm};
  flex-shrink: 0;

  @media (max-width: ${ScreenSize.phone}) {
    gap: 20px;
    padding: 40px 20px;
  }
`;

const LogoLink = styled(Link)`
  padding: 0;
`;

export const VendorsList = () => {
  return (
    <Grid>
      <LogoLink to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={130}
          height={45}
          alt="wloczykijki_logo"
          picture={{
            fallbackUrl: wloczykijkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: wloczykijkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: wloczykijkiLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>
    </Grid>
  );
};
