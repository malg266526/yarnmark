import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Link } from '../../components/Link';
import { ScreenSize } from '../../styles/screeen-size';

import bifernoLogoUrl from '../../assets/images/minifiedLogos/biferno.png';
import bifernoLogoUrlAvif from '../../assets/images/minifiedLogos/biferno.avif';
import bifernoLogoUrlWebp from '../../assets/images/minifiedLogos/biferno.webp';

import centrumWloczekLogoUrl from '../../assets/images/minifiedLogos/centrumwloczek.png';
import centrumWloczekLogoUrlAvif from '../../assets/images/minifiedLogos/centrumwloczek.avif';

import hankaMiZrobilaLogoUrl from '../../assets/images/minifiedLogos/hankamizrobila.png';
import hankaMiZrobilaLogoUrlAvif from '../../assets/images/minifiedLogos/hankamizrobila.avif';
import hankaMiZrobilaLogoUrlWebp from '../../assets/images/minifiedLogos/hankamizrobila.webp';

import kokonkiLogoUrl from '../../assets/images/minifiedLogos/kokonki.png';

import siedemOczekLogoUrl from '../../assets/images/minifiedLogos/7oczek.jpg';
import siedemOczekLogoUrlAvif from '../../assets/images/minifiedLogos/7oczek.avif';
import siedemOczekLogoUrlWebp from '../../assets/images/minifiedLogos/7oczek.webp';

import okkiLogoUrl from '../../assets/images/minifiedLogos/okki.jfif';
import okkiLogoUrlAvif from '../../assets/images/minifiedLogos/okki.avif';
import okkiLogoUrlWebp from '../../assets/images/minifiedLogos/okki.webp';

import welnaBawelnaLogoUrl from '../../assets/images/minifiedLogos/WelnaBawelna.jpg';
import welnaBawelnaLogoUrlAvif from '../../assets/images/minifiedLogos/WelnaBawelna.avif';
import welnaBawelnaLogoUrlWebp from '../../assets/images/minifiedLogos/WelnaBawelna.webp';

import wloczykijkiLogoUrl from '../../assets/images/minifiedLogos/wloczykijki.png';
import wloczykijkiLogoUrlAvif from '../../assets/images/minifiedLogos/wloczykijki.avif';
import wloczykijkiLogoUrlWebp from '../../assets/images/minifiedLogos/wloczykijki.webp';

import lusiaLogoUrl from '../../assets/images/minifiedLogos/lusia.png';
import lusiaLogoUrlAvif from '../../assets/images/minifiedLogos/lusia.avif';
import lusiaLogoUrlWebp from '../../assets/images/minifiedLogos/lusia.webp';

import wloczkotki from '../../assets/images/minifiedLogos/wloczkotki.jpg';
import wloczkotkiAvif from '../../assets/images/minifiedLogos/wloczkotki.avif';
import wloczkotkiWebp from '../../assets/images/minifiedLogos/wloczkotki.webp';

import agnawool from '../../assets/images/minifiedLogos/agnawool.jpg';
import agnawoolAvif from '../../assets/images/minifiedLogos/agnawool.avif';
import agnawoolWebp from '../../assets/images/minifiedLogos/agnawool.webp';

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

const divider = 1;

export const VendorsList = () => {
  return (
    <Grid>
      <LogoLink to="https://agnawool.art/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="agnawool_logo"
          picture={{
            fallbackUrl: agnawool,
            sources: [
              {
                type: 'image/webp',
                url: agnawoolWebp
              },
              {
                type: 'image/avif',
                url: agnawoolAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://wloczkotki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="wloczkotki_logo"
          picture={{
            fallbackUrl: wloczkotki,
            sources: [
              {
                type: 'image/webp',
                url: wloczkotkiWebp
              },
              {
                type: 'image/avif',
                url: wloczkotkiAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://biferno.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={83 / divider}
          alt="biferno"
          picture={{
            fallbackUrl: bifernoLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: bifernoLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: bifernoLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://centrumwloczek.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="centrum_wloczek_logo"
          picture={{
            fallbackUrl: centrumWloczekLogoUrl,
            sources: [
              {
                type: 'image/avif',
                url: centrumWloczekLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://centrumwloczek.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="centrum_wloczek_logo"
          picture={{
            fallbackUrl: centrumWloczekLogoUrl,
            sources: [
              {
                type: 'image/avif',
                url: centrumWloczekLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="hankamizrobila_logo"
          picture={{
            fallbackUrl: hankaMiZrobilaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: hankaMiZrobilaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: hankaMiZrobilaLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <img width={100 / divider} height={100 / divider} src={kokonkiLogoUrl} alt="kokonki_logo" />
      </LogoLink>

      <LogoLink to="https://www.lusiaknits.com/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="lusiaknits_logo"
          picture={{
            fallbackUrl: lusiaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: lusiaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: lusiaLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.instagram.com/okki_handmade/" target="_blank" rel="noreferrer">
        <Picture
          width={120 / divider}
          height={100 / divider}
          alt="okki_handamde_logo"
          picture={{
            fallbackUrl: okkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: okkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: okkiLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <Picture
          width={87 / divider}
          height={100 / divider}
          alt="7Oczek_logo"
          picture={{
            fallbackUrl: siedemOczekLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: siedemOczekLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: siedemOczekLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://welnabawelna.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="welnabawelna"
          picture={{
            fallbackUrl: welnaBawelnaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: welnaBawelnaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: welnaBawelnaLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

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
