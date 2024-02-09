import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Link } from '../components/Link';
import { ScreenSize } from '../styles/screeen-size';

import AnimotkiLogoUrl from './../assets/images/logos/animotki.jpg';
import AnimotkiLogoUrlAvif from './../assets/images/logos/animotki.avif';
import AnimotkiLogoUrlWebp from './../assets/images/logos/animotki.webp';

import BawelnianyFilamentLogoUrl from './../assets/images/logos/bawelnianyfilament.jpg';
import BawelnianyFilamentLogoUrlAvif from './../assets/images/logos/bawelnianyfilament.avif';
import BawelnianyFilamentLogoUrlWebp from './../assets/images/logos/bawelnianyfilament.webp';

import BifernoLogoUrl from './../assets/images/logos/biferno.jpg';
import BifernoLogoUrlAvif from './../assets/images/logos/biferno.avif';
import BifernoLogoUrlWebp from './../assets/images/logos/biferno.webp';

import BrioszkaLogoUrl from './../assets/images/logos/brioszka.jpg';
import BrioszkaLogoUrlAvif from './../assets/images/logos/brioszka.avif';
import BrioszkaLogoUrlWebp from './../assets/images/logos/brioszka.webp';

import DyeDyeDoneLogoUrl from './../assets/images/logos/dyedyedone.jpg';
import DyeDyeDoneLogoUrlAvif from './../assets/images/logos/dyedyedone.avif';
import DyeDyeDoneLogoUrlWebp from './../assets/images/logos/dyedyedone.webp';

import GaboWoolLogoUrl from './../assets/images/logos/gabo.jpg';
import GaboWoolLogoUrlAvif from './../assets/images/logos/gabo.avif';
import GaboWoolLogoUrlWebp from './../assets/images/logos/gabo.webp';

import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import HankaMiZrobilaLogoUrlAvif from './../assets/images/logos/hankamizrobila.avif';
import HankaMiZrobilaLogoUrlWebp from './../assets/images/logos/hankamizrobila.webp';

import knitPlLogoUrl from './../assets/images/minifiedLogos/knitpl.png';
import knitPlLogoUrlAvif from './../assets/images/minifiedLogos/knitpl.avif';
import knitPlLogoUrlWebp from './../assets/images/minifiedLogos/knitpl.webp';

import KokonkiLogoUrl from './../assets/images/minifiedLogos/kokonki.png';

import MadoboLogoUrl from './../assets/images/logos/madobo.jpg';
import MadoboLogoUrlAvif from './../assets/images/logos/madobo.avif';
import MadoboLogoUrlWebp from './../assets/images/logos/madobo.webp';

import ManiaChomikujeLogoUrl from './../assets/images/logos/Mania.jpg';
import ManiaChomikujeLogoUrlAvif from './../assets/images/logos/Mania.avif';
import ManiaChomikujeLogoUrlWebp from './../assets/images/logos/Mania.webp';

import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.jpg';
import MissKnitskiLogoUrlAvif from './../assets/images/logos/missknitski.avif';
import MissKnitskiLogoUrlWebp from './../assets/images/logos/missknitski.webp';

import MokoszaLogoUrl from './../assets/images/logos/mokosza.jpg';
import MokoszaLogoUrlAvif from './../assets/images/logos/mokosza.avif';
import MokoszaLogoUrlWebp from './../assets/images/logos/mokosza.webp';

import MotkomaniaLogoUrl from './../assets/images/logos/motkomania.jpg';
import MotkomaniaLogoUrlAvif from './../assets/images/logos/motkomania.avif';
import MotkomaniaLogoUrlWebp from './../assets/images/logos/motkomania.webp';

import naSztukiStudioLogoUrl from './../assets/images/minifiedLogos/nasztukistudio.png';

import siedemOczekLogoUrl from './../assets/images/minifiedLogos/7oczek.jpg';
import siedemOczekLogoUrlAvif from './../assets/images/minifiedLogos/7oczek.avif';
import siedemOczekLogoUrlWebp from './../assets/images/minifiedLogos/7oczek.webp';

import StrikkeLogoUrl from './../assets/images/logos/strikke.png';

import PimotkiLogoUrl from './../assets/images/logos/pimotki.jpg';
import PimotkiLogoUrlAvif from './../assets/images/logos/pimotki.avif';
import PimotkiLogoUrlWebp from './../assets/images/logos/pimotki.webp';

import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
import TimeToKnitLogoUrlAvif from './../assets/images/logos/timetoknit.avif';
import TimeToKnitLogoUrlWebp from './../assets/images/logos/timetoknit.webp';

import TheKnittingBoxLogoUrl from './../assets/images/logos/theknittingbox.png';

import WelnaBawelnaLogoUrl from './../assets/images/logos/WelnaBawelna.jpg';
import WelnaBawelnaLogoUrlAvif from './../assets/images/logos/WelnaBawelna.avif';
import WelnaBawelnaLogoUrlWebp from './../assets/images/logos/WelnaBawelna.webp';

import WloczykijkiLogoUrl from './../assets/images/logos/wloczykijki_logo.png';

import WoollalaLogoUrl from './../assets/images/minifiedLogos/woollala.png';
import WoollalaLogoUrlWebp from './../assets/images/minifiedLogos/woollala.webp';

import WoolloopLogoUrl from './../assets/images/logos/woolloop.jpg';
import WoolloopLogoUrlAvif from './../assets/images/logos/woolloop.avif';
import WoolloopLogoUrlWebp from './../assets/images/logos/woolloop.webp';

import WooloveLogoUrl from './../assets/images/logos/woolove.jpg';
import WooloveLogoUrlAvif from './../assets/images/logos/woolove.avif';
import WooloveLogoUrlWebp from './../assets/images/logos/woolove.webp';

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
          width={160}
          alt="animotki"
          picture={{
            fallbackUrl: AnimotkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: AnimotkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: AnimotkiLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://www.facebook.com/bawelnianyfilament/" target="_blank" rel="noreferrer">
        <Picture
          width={160}
          alt="bawelnianyfilament"
          picture={{
            fallbackUrl: BawelnianyFilamentLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: BawelnianyFilamentLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: BawelnianyFilamentLogoUrlAvif
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

      <Link to="https://brioszka.com.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          alt="brioszka"
          picture={{
            fallbackUrl: BrioszkaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: BrioszkaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: BrioszkaLogoUrlAvif
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
        <img width={120} src={KokonkiLogoUrl} alt="kokonki_logo" />
      </Link>

      <Link to="https://madobo.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="madobo"
          picture={{
            fallbackUrl: MadoboLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: MadoboLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: MadoboLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://www.facebook.com/groups/1020511551665421/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
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

      <Link to="https://motkomania.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={160}
          alt="motkomania"
          picture={{
            fallbackUrl: MotkomaniaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: MotkomaniaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: MotkomaniaLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://nasztukistudio.pl/" target="_blank" rel="noreferrer">
        <img width={100} src={naSztukiStudioLogoUrl} alt="nasztukistudio_logo" />
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

      <Link to="https://welnabawelna.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={180}
          alt="welnabawelna"
          picture={{
            fallbackUrl: WelnaBawelnaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WelnaBawelnaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: WelnaBawelnaLogoUrlAvif
              }
            ]
          }}
        />
      </Link>

      <Link to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <img width={150} src={WloczykijkiLogoUrl} alt="wloczykijki" />
      </Link>

      <Link to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          alt="woollala"
          picture={{
            fallbackUrl: WoollalaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WoollalaLogoUrlWebp
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
