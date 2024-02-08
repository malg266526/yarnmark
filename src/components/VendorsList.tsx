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

import GaboWoolLogoUrl from './../assets/images/logos/gabo.jpg';
import GaboWoolLogoUrlAvif from './../assets/images/logos/gabo.avif';
import GaboWoolLogoUrlWebp from './../assets/images/logos/gabo.webp';

import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import HankaMiZrobilaLogoUrlAvif from './../assets/images/logos/hankamizrobila.avif';
import HankaMiZrobilaLogoUrlWebp from './../assets/images/logos/hankamizrobila.webp';

import KnitPlLogoUrl from './../assets/images/logos/knitpl.jpg';
import KnitPlLogoUrlAvif from './../assets/images/logos/knitpl.avif';
import KnitPlLogoUrlWebp from './../assets/images/logos/knitpl.webp';

import KokonkiLogoUrl from './../assets/images/logos/kokonki.jpg';
import KokonkiLogoUrlAvif from './../assets/images/logos/kokonki.avif';
import KokonkiLogoUrlWebp from './../assets/images/logos/kokonki.webp';

import ManiaChomikujeLogoUrl from './../assets/images/logos/Mania.jpg';
import ManiaChomikujeLogoUrlAvif from './../assets/images/logos/Mania.avif';
import ManiaChomikujeLogoUrlWebp from './../assets/images/logos/Mania.webp';

import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.jpg';
import MissKnitskiLogoUrlAvif from './../assets/images/logos/missknitski.avif';
import MissKnitskiLogoUrlWebp from './../assets/images/logos/missknitski.webp';

import MokoszaLogoUrl from './../assets/images/logos/mokosza.jpg';
import MokoszaLogoUrlAvif from './../assets/images/logos/mokosza.avif';
import MokoszaLogoUrlWebp from './../assets/images/logos/mokosza.webp';

import NaSztukiStudioLogoUrl from './../assets/images/logos/nasztukistudio.jpg';
import NaSztukiStudioLogoUrlAvif from './../assets/images/logos/nasztukistudio.avif';
import NaSztukiStudioLogoUrlWebp from './../assets/images/logos/nasztukistudio.webp';

import SiedemOczekLogoUrl from './../assets/images/logos/7oczek.png';
import StrikkeLogoUrl from './../assets/images/logos/strikke.png';

import PimotkiLogoUrl from './../assets/images/logos/pimotki.jpg';
import PimotkiLogoUrlAvif from './../assets/images/logos/pimotki.avif';
import PimotkiLogoUrlWebp from './../assets/images/logos/pimotki.webp';

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

import WooloveLogoUrl from './../assets/images/logos/woolove.jpg';
import WooloveLogoUrlAvif from './../assets/images/logos/woolove.avif';
import WooloveLogoUrlWebp from './../assets/images/logos/woolove.webp';

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
          width={100}
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
          width={100}
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

      <Link to="https://www.gabowool.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={110}
          alt="gabowool"
          picture={{
            fallbackUrl: GaboWoolLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: GaboWoolLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: GaboWoolLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
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
          width={100}
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
          width={150}
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

      <Link to="https://www.facebook.com/groups/1020511551665421/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="maniachomikuje"
          picture={{
            fallbackUrl: ManiaChomikujeLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: ManiaChomikujeLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: ManiaChomikujeLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://www.missknitski.com/sklep/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
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

      <Link to="https://mokosza.com/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="mokosza"
          picture={{
            fallbackUrl: MokoszaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: MokoszaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: MokoszaLogoUrlAvif
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

      <Link to="https://pimotki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="pimotki"
          picture={{
            fallbackUrl: PimotkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: PimotkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: PimotkiLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://strikke.pl/" target="_blank" rel="noreferrer">
        <img width={150} src={StrikkeLogoUrl} alt="Strikke" />
      </Link>

      <Link to="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <img width={100} src={SiedemOczekLogoUrl} alt="7Oczek" />
      </Link>

      <Link to="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
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
        <img width={100} src={TheKnittingBoxLogoUrl} alt="theknittingbox" />
      </Link>

      <Link to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <img width={150} src={WloczykijkiLogoUrl} alt="wloczykijki" />
      </Link>

      <Link to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <Picture
          width={150}
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
          width={100}
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

      <Link to="https://www.woolove.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="woolove"
          picture={{
            fallbackUrl: WooloveLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WooloveLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: WooloveLogoUrlAvif
              }
            ]
          }}
        />
      </Link>
    </Grid>
  );
};
