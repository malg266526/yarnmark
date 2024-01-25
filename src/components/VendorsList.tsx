import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Link } from './Link';
import { ScreenSize } from '../styles/screeen-size';

import BifernoLogoUrl from './../assets/images/logos/biferno.jpg';
import BifernoLogoUrlAvif from './../assets/images/logos/biferno.avif';
import BifernoLogoUrlWebp from './../assets/images/logos/biferno.webp';

import DyeDyeDoneLogoUrl from './../assets/images/logos/dyedyedone.jpg';
import DyeDyeDoneLogoUrlAvif from './../assets/images/logos/dyedyedone.avif';
import DyeDyeDoneLogoUrlWebp from './../assets/images/logos/dyedyedone.webp';

import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import HankaMiZrobilaLogoUrlAvif from './../assets/images/logos/hankamizrobila.avif';
import HankaMiZrobilaLogoUrlWebp from './../assets/images/logos/hankamizrobila.webp';

import KnitPlLogoUrl from './../assets/images/logos/knitpl.jpg';
import KnitPlLogoUrlAvif from './../assets/images/logos/knitpl.avif';
import KnitPlLogoUrlWebp from './../assets/images/logos/knitpl.webp';

import KokonkiLogoUrl from './../assets/images/logos/kokonki.jpg';
import KokonkiLogoUrlAvif from './../assets/images/logos/kokonki.avif';
import KokonkiLogoUrlWebp from './../assets/images/logos/kokonki.webp';

import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.jpg';
import MissKnitskiLogoUrlAvif from './../assets/images/logos/missknitski.avif';
import MissKnitskiLogoUrlWebp from './../assets/images/logos/missknitski.webp';

import NaSztukiStudioLogoUrl from './../assets/images/logos/nasztukistudio.jpg';
import NaSztukiStudioLogoUrlAvif from './../assets/images/logos/nasztukistudio.avif';
import NaSztukiStudioLogoUrlWebp from './../assets/images/logos/nasztukistudio.webp';

import StrikkeLogoUrl from './../assets/images/logos/strikke.png';

import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
import TimeToKnitLogoUrlAvif from './../assets/images/logos/timetoknit.avif';
import TimeToKnitLogoUrlWebp from './../assets/images/logos/timetoknit.webp';

import TheKnittingBoxLogoUrl from './../assets/images/logos/theknittingbox.png';
import WloczykijkiLogoUrl from './../assets/images/logos/wloczykijki_logo.png';

import WoollalaLogoUrl from './../assets/images/logos/woollala.jpg';
import WoollalaLogoUrlAvif from './../assets/images/logos/woollala.avif';
import WoollalaLogoUrlWebp from './../assets/images/logos/woollala.webp';

import WoolloopLogoUrl from './../assets/images/logos/woolloop.jpg';
import WoolloopLogoUrlAvif from './../assets/images/logos/woolloop.avif';
import WoolloopLogoUrlWebp from './../assets/images/logos/woolloop.webp';

import { Picture } from './Picture';

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: center;
  gap: ${Spacings.lg};
  padding: ${Spacings.md};

  @media (max-width: ${ScreenSize.phone}) {
    gap: ${Spacings.sm};
  }
`;

export const VendorsList = () => {
  return (
    <Grid>
      <Link to="https://biferno.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={140}
          alt="biferno"
          picture={{
            fallbackUrl: BifernoLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: BifernoLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: BifernoLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://www.dyedyedone.com/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="dyedyedone"
          picture={{
            fallbackUrl: DyeDyeDoneLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: DyeDyeDoneLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: DyeDyeDoneLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="hankamizrobila"
          picture={{
            fallbackUrl: HankaMiZrobilaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: HankaMiZrobilaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: HankaMiZrobilaLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://knitpl.com/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="knitpl"
          picture={{
            fallbackUrl: KnitPlLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: KnitPlLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: KnitPlLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={200}
          alt="kokonki"
          picture={{
            fallbackUrl: KokonkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: KokonkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: KokonkiLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://www.missknitski.com/sklep/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="missknitski"
          picture={{
            fallbackUrl: MissKnitskiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: MissKnitskiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: MissKnitskiLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://nasztukistudio.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="nasztukistudio"
          picture={{
            fallbackUrl: NaSztukiStudioLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: NaSztukiStudioLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: NaSztukiStudioLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://strikke.pl/" target="_blank" rel="noreferrer">
        <img width={180} src={StrikkeLogoUrl} alt="Strikke" />
      </Link>

      <Link to="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="timetoknit"
          picture={{
            fallbackUrl: TimeToKnitLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: TimeToKnitLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: TimeToKnitLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://theknittingbox.pl" target="_blank" rel="noreferrer">
        <img width={120} src={TheKnittingBoxLogoUrl} alt="theknittingbox" />
      </Link>

      <Link to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <img width={180} src={WloczykijkiLogoUrl} alt="wloczykijki" />
      </Link>

      <Link to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <Picture
          width={180}
          alt="woollala"
          picture={{
            fallbackUrl: WoollalaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WoollalaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: WoollalaLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://woolloop.pl" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="woolloop"
          picture={{
            fallbackUrl: WoolloopLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WoolloopLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: WoolloopLogoUrlAvif
              }
            ]
          }}
        />
      </Link>
      {/*  <Link href="woolove.pl" target="_blank" rel="noreferrer">
        <img width={120} src={WooloveLogoUrl} alt="woolove" />
      </Link> */}
      {/* <Link href="https://madobo.pl" target="_blank" rel="noreferrer">
        <img width={140} src={MadoboLogoUrl} alt="madobo" />
      </Link> */}
      {/*  <Link href="https://www.instagram.com/woolniej.pl" target="_blank" rel="noreferrer">
        <img width={160} src={WoolniejLogoUrl} alt="woolniej" />
      </Link> */}
      {/*   <Link href="https://yarnwithlove.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={YarnWithLoveLogoUrl} alt="yarnwithlove" />
      </Link> */}
      {/*   <Link href="https://animotki.pl/" target="_blank" rel="noreferrer">
        <img width={160} src={AnimotkiLogoUrl} alt="animotki" />
      </Link> */}
      {/* <Link href="https://stylovewloczki.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={StyloveWloczkiLogoUrl} alt="stylovewloczki" />
      </Link> */}
      {/*       <Link href="https://www.gabowool.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={GaboWoolLogoUrl} alt="gabowool" />
      </Link> */}
      {/*       <Link href="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <img width={140} src={SiedemOczekLogoUrl} alt="7oczek" />
      </Link> */}
      {/* <Link href="https://rencami.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={RencamiLogoUrl} alt="rencami" />
      </Link> */}
      {/*  <Link href="https://wloczkomaniaczka.pl" target="_blank" rel="noreferrer">
        <img width={140} src={WloczkomaniaczkaLogoUrl} alt="wloczkomaniaczka" />
      </Link> */}
      {/*  <Link href="https://noiklawo.pl/" target="_blank" rel="noreferrer">
        <img width={220} src={SamaSeUszyjLogoUrl} alt="samaseuszyj" />
      </Link> */}
      {/*       <Link href="https://miladruciarnia.pl/" target="_blank" rel="noreferrer">
        <img width={160} src={MilaDruciarniaLogoUrl} alt="miladruciarnia" />
      </Link> */}
    </Grid>
  );
};
