import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Link } from '../components/Link';
import { ScreenSize } from '../styles/screeen-size';

import animotkiLogoUrl from './../assets/images/minifiedLogos/animotki.png';
import animotkiLogoUrlAvif from './../assets/images/minifiedLogos/animotki.avif';
import animotkiLogoUrlWebp from './../assets/images/minifiedLogos/animotki.webp';

import bawelnianyFilamentLogoUrl from './../assets/images/minifiedLogos/bawelnianyfilament.jpg';
import bawelnianyFilamentLogoUrlAvif from './../assets/images/minifiedLogos/bawelnianyfilament.avif';
import bawelnianyFilamentLogoUrlWebp from './../assets/images/minifiedLogos/bawelnianyfilament.webp';

import bifernoLogoUrl from './../assets/images/minifiedLogos/biferno.png';
import bifernoLogoUrlAvif from './../assets/images/minifiedLogos/biferno.avif';
import bifernoLogoUrlWebp from './../assets/images/minifiedLogos/biferno.webp';

import brioszkaLogoUrl from './../assets/images/minifiedLogos/brioszka.png';
import brioszkaLogoUrlAvif from './../assets/images/minifiedLogos/brioszka.avif';
import brioszkaLogoUrlWebp from './../assets/images/minifiedLogos/brioszka.webp';

import dyeDyeDoneLogoUrlAvif from './../assets/images/minifiedLogos/dyedyedone.avif';
import dyeDyeDoneLogoUrl from './../assets/images/minifiedLogos/dyedyedone.png';
import dyeDyeDoneLogoUrlWebp from './../assets/images/minifiedLogos/dyedyedone.webp';

import gaboWoolLogoUrl from './../assets/images/minifiedLogos/gabowool.png';
import gaboWoolLogoUrlAvif from './../assets/images/minifiedLogos/gabowool.avif';
import gaboWoolLogoUrlWebp from './../assets/images/minifiedLogos/gabowool.webp';

import hankaMiZrobilaLogoUrl from './../assets/images/minifiedLogos/hankamizrobila.png';
import hankaMiZrobilaLogoUrlAvif from './../assets/images/minifiedLogos/hankamizrobila.avif';
import hankaMiZrobilaLogoUrlWebp from './../assets/images/minifiedLogos/hankamizrobila.webp';

import knitPlLogoUrl from './../assets/images/minifiedLogos/knitpl.png';
import knitPlLogoUrlAvif from './../assets/images/minifiedLogos/knitpl.avif';
import knitPlLogoUrlWebp from './../assets/images/minifiedLogos/knitpl.webp';

import kokonkiLogoUrl from './../assets/images/minifiedLogos/kokonki.png';

import madoboLogoUrl from './../assets/images/minifiedLogos/madobo.png';
import madoboLogoUrlAvif from './../assets/images/minifiedLogos/madobo.avif';
import madoboLogoUrlWebp from './../assets/images/minifiedLogos/madobo.webp';

import malinowyKosLogoUrl from './../assets/images/minifiedLogos/malinowyKos.png';
import malinowyKosLogoUrlAvif from './../assets/images/minifiedLogos/malinowyKos.avif';
import malinowyKosLogoUrlWebp from './../assets/images/minifiedLogos/malinowyKos.webp';

import maniaChomikujeLogoUrl from './../assets/images/minifiedLogos/mania.png';
import maniaChomikujeLogoUrlAvif from './../assets/images/minifiedLogos/mania.avif';
import maniaChomikujeLogoUrlWebp from './../assets/images/minifiedLogos/mania.webp';

import missKnitskiLogoUrl from './../assets/images/minifiedLogos/missknitski.png';
import missKnitskiLogoUrlAvif from './../assets/images/minifiedLogos/missknitski.avif';
import missKnitskiLogoUrlWebp from './../assets/images/minifiedLogos/missknitski.webp';

import mokoszaLogoUrl from './../assets/images/minifiedLogos/mokosza.png';
import mokoszaLogoUrlAvif from './../assets/images/minifiedLogos/mokosza.avif';
import mokoszaLogoUrlWebp from './../assets/images/minifiedLogos/mokosza.webp';

import motkomaniaLogoUrl from './../assets/images/minifiedLogos/motkomania.jpg';
import motkomaniaLogoUrlAvif from './../assets/images/minifiedLogos/motkomania.avif';
import motkomaniaLogoUrlWebp from './../assets/images/minifiedLogos/motkomania.webp';

import naSztukiStudioLogoUrl from './../assets/images/minifiedLogos/nasztukistudio.png';

import siedemOczekLogoUrl from './../assets/images/minifiedLogos/7oczek.jpg';
import siedemOczekLogoUrlAvif from './../assets/images/minifiedLogos/7oczek.avif';
import siedemOczekLogoUrlWebp from './../assets/images/minifiedLogos/7oczek.webp';

import strikkeLogoUrl from './../assets/images/minifiedLogos/strikke.png';

import pimotkiLogoUrl from './../assets/images/minifiedLogos/pimotki.png';

import timeToKnitLogoUrl from './../assets/images/minifiedLogos/timetoknit.png';
import timeToKnitLogoUrlAvif from './../assets/images/minifiedLogos/timetoknit.avif';
import timeToKnitLogoUrlWebp from './../assets/images/minifiedLogos/timetoknit.webp';

import theKnittingBoxLogoUrl from './../assets/images/minifiedLogos/theknittingbox.png';

import welnaBawelnaLogoUrl from './../assets/images/minifiedLogos/WelnaBawelna.jpg';
import welnaBawelnaLogoUrlAvif from './../assets/images/minifiedLogos/WelnaBawelna.avif';
import welnaBawelnaLogoUrlWebp from './../assets/images/minifiedLogos/WelnaBawelna.webp';

import wloczykijkiLogoUrl from './../assets/images/minifiedLogos/wloczykijki.png';
import wloczykijkiLogoUrlAvif from './../assets/images/minifiedLogos/wloczykijki.avif';
import wloczykijkiLogoUrlWebp from './../assets/images/minifiedLogos/wloczykijki.webp';

import woollalaLogoUrl from './../assets/images/minifiedLogos/woollala.png';
import woollalaLogoUrlWebp from './../assets/images/minifiedLogos/woollala.webp';

import woolloopLogoUrl from './../assets/images/minifiedLogos/woolloop.png';
import woolloopLogoUrlAvif from './../assets/images/minifiedLogos/woolloop.avif';
import woolloopLogoUrlWebp from './../assets/images/minifiedLogos/woolloop.webp';

import wooloveLogoUrl from './../assets/images/minifiedLogos/woolove.png';
import wooloveLogoUrlAvif from './../assets/images/minifiedLogos/woolove.avif';
import wooloveLogoUrlWebp from './../assets/images/minifiedLogos/woolove.webp';

import { Picture } from '../components/Picture';

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
      <Link to="https://animotki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="animotki"
          picture={{
            fallbackUrl: animotkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: animotkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: animotkiLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://www.facebook.com/bawelnianyfilament/" target="_blank" rel="noreferrer">
        <Picture
          width={110}
          alt="bawelnianyfilament"
          picture={{
            fallbackUrl: bawelnianyFilamentLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: bawelnianyFilamentLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: bawelnianyFilamentLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://biferno.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
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
      </Link>

      <Link to="https://brioszka.com.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="brioszka"
          picture={{
            fallbackUrl: brioszkaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: brioszkaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: brioszkaLogoUrlAvif
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
            fallbackUrl: dyeDyeDoneLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: dyeDyeDoneLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: dyeDyeDoneLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://www.gabowool.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={130}
          alt="gabowool"
          picture={{
            fallbackUrl: gaboWoolLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: gaboWoolLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: gaboWoolLogoUrlAvif
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
      </Link>

      <Link to="https://knitpl.com/" target="_blank" rel="noreferrer">
        <Picture
          width={90}
          alt="knitpl"
          picture={{
            fallbackUrl: knitPlLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: knitPlLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: knitPlLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <img width={120} src={kokonkiLogoUrl} alt="kokonki_logo" />
      </Link>

      <Link to="https://madobo.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="madobo_logo"
          picture={{
            fallbackUrl: madoboLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: madoboLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: madoboLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://malinowykos.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="malinowykos_logo"
          picture={{
            fallbackUrl: malinowyKosLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: malinowyKosLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: malinowyKosLogoUrlAvif
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
            fallbackUrl: maniaChomikujeLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: maniaChomikujeLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: maniaChomikujeLogoUrlAvif
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
            fallbackUrl: missKnitskiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: missKnitskiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: missKnitskiLogoUrlAvif
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
            fallbackUrl: mokoszaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: mokoszaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: mokoszaLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://motkomania.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={160}
          alt="motkomania"
          picture={{
            fallbackUrl: motkomaniaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: motkomaniaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: motkomaniaLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://nasztukistudio.pl/" target="_blank" rel="noreferrer">
        <img width={100} src={naSztukiStudioLogoUrl} alt="nasztukistudio_logo" />
      </Link>

      <Link to="https://pimotki.pl/" target="_blank" rel="noreferrer">
        <img width={100} src={pimotkiLogoUrl} alt="pimotki_logo" />
      </Link>

      <Link to="https://strikke.pl/" target="_blank" rel="noreferrer">
        <img width={150} src={strikkeLogoUrl} alt="Strikke" />
      </Link>

      <Link to="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
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
      </Link>

      <Link to="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="timetoknit"
          picture={{
            fallbackUrl: timeToKnitLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: timeToKnitLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: timeToKnitLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://theknittingbox.pl" target="_blank" rel="noreferrer">
        <img width={180} src={theKnittingBoxLogoUrl} alt="theknittingbox" />
      </Link>

      <Link to="https://welnabawelna.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={140}
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
      </Link>

      <Link to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={150}
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
      </Link>

      <Link to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <Picture
          width={150}
          alt="woollala"
          picture={{
            fallbackUrl: woollalaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: woollalaLogoUrlWebp
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
            fallbackUrl: woolloopLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: woolloopLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: woolloopLogoUrlAvif
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
            fallbackUrl: wooloveLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: wooloveLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: wooloveLogoUrlAvif
              }
            ]
          }}
        />
      </Link>
    </Grid>
  );
};
