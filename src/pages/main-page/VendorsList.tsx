import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Link } from '../../components/Link';
import { ScreenSize } from '../../styles/screeen-size';

import agnawool from '../../assets/images/minifiedLogos/agnawool.jpg';
import agnawoolAvif from '../../assets/images/minifiedLogos/agnawool.avif';
import agnawoolWebp from '../../assets/images/minifiedLogos/agnawool.webp';

import siedemOczekLogoUrl from '../../assets/images/minifiedLogos/7oczek.png';
import siedemOczekLogoUrlAvif from '../../assets/images/minifiedLogos/7oczek.avif';
import siedemOczekLogoUrlWebp from '../../assets/images/minifiedLogos/7oczek.webp';

import alemasztocudneLogoUrl from '../../assets/images/minifiedLogos/alemasztocudne.png';
import alemasztocudneLogoUrlAvif from '../../assets/images/minifiedLogos/alemasztocudne.avif';
import alemasztocudneLogoUrlWebp from '../../assets/images/minifiedLogos/alemasztocudne.webp';

import animotkiLogoUrl from '../../assets/images/minifiedLogos/animotki.png';
import animotkiLogoUrlAvif from '../../assets/images/minifiedLogos/animotki.avif';
import animotkiLogoUrlWebp from '../../assets/images/minifiedLogos/animotki.webp';

import bifernoLogoUrl from '../../assets/images/minifiedLogos/biferno.png';
import bifernoLogoUrlAvif from '../../assets/images/minifiedLogos/biferno.avif';
import bifernoLogoUrlWebp from '../../assets/images/minifiedLogos/biferno.webp';

import centrumWloczekLogoUrl from '../../assets/images/minifiedLogos/centrumwloczek.jpg';
import centrumWloczekLogoUrlAvif from '../../assets/images/minifiedLogos/centrumwloczek.avif';
import centrumWloczekLogoUrlWebp from '../../assets/images/minifiedLogos/centrumwloczek.webp';

import dyeDyeDoneLogoUrlAvif from '../../assets/images/minifiedLogos/dyedyedone.avif';
import dyeDyeDoneLogoUrl from '../../assets/images/minifiedLogos/dyedyedone.png';
import dyeDyeDoneLogoUrlWebp from '../../assets/images/minifiedLogos/dyedyedone.webp';

import floralFiberLogoUrlAvif from '../../assets/images/minifiedLogos/floralfiber.avif';
import floralFiberLogoUrl from '../../assets/images/minifiedLogos/floralfiber.jpg';
import floralFiberLogoUrlWebp from '../../assets/images/minifiedLogos/floralfiber.webp';

import furoraLogoUrlAvif from '../../assets/images/minifiedLogos/furora.avif';
import furoraLogoUrl from '../../assets/images/minifiedLogos/furora.jpg';
import furoraLogoUrlWebp from '../../assets/images/minifiedLogos/furora.webp';

import gaboWoolLogoUrl from '../../assets/images/minifiedLogos/gabo-wool.jfif';
import gaboWoolLogoUrlAvif from '../../assets/images/minifiedLogos/gabo-wool.avif';
import gaboWoolLogoUrlWebp from '../../assets/images/minifiedLogos/gabo-wool.webp';

import hankaMiZrobilaLogoUrl from '../../assets/images/minifiedLogos/hankamizrobila.png';
import hankaMiZrobilaLogoUrlAvif from '../../assets/images/minifiedLogos/hankamizrobila.avif';
import hankaMiZrobilaLogoUrlWebp from '../../assets/images/minifiedLogos/hankamizrobila.webp';

import kokonkiLogoUrl from '../../assets/images/minifiedLogos/kokonki.svg';

import lukaceramika from '../../assets/images/minifiedLogos/lukaceramika.png';
import lukaceramikaAvif from '../../assets/images/minifiedLogos/lukaceramika.avif';
import lukaceramikaWebp from '../../assets/images/minifiedLogos/lukaceramika.webp';

import lusiaLogoUrl from '../../assets/images/minifiedLogos/lusia.png';
import lusiaLogoUrlAvif from '../../assets/images/minifiedLogos/lusia.avif';
import lusiaLogoUrlWebp from '../../assets/images/minifiedLogos/lusia.webp';

import maniaChomikujeLogoUrl from '../../assets/images/minifiedLogos/mania.png';
import maniaChomikujeLogoUrlAvif from '../../assets/images/minifiedLogos/mania.avif';
import maniaChomikujeLogoUrlWebp from '../../assets/images/minifiedLogos/mania.webp';

import martinslabLogoUrl from '../../assets/images/minifiedLogos/martinslab.png';
import martinslabLogoUrlAvif from '../../assets/images/minifiedLogos/martinslab.avif';
import martinslabLogoUrlWebp from '../../assets/images/minifiedLogos/martinslab.webp';

import milaDruciarniaLogoUrl from '../../assets/images/minifiedLogos/Mila-logo.jfif';
import milaDruciarniaLogoUrlAvif from '../../assets/images/minifiedLogos/Mila-logo.avif';
import milaDruciarniaLogoUrlWebp from '../../assets/images/minifiedLogos/Mila-logo.webp';

// Miss Knitski (PRZYWRÓCONE DANE Z ZESZŁEGO ROKU)
import missKnitskiLogoUrl from '../../assets/images/minifiedLogos/missknitski.png';
import missKnitskiLogoUrlAvif from '../../assets/images/minifiedLogos/missknitski.avif';
import missKnitskiLogoUrlWebp from '../../assets/images/minifiedLogos/missknitski.webp';

import motkomaniaLogoUrl from '../../assets/images/minifiedLogos/motkomania.jpg';
import motkomaniaLogoUrlAvif from '../../assets/images/minifiedLogos/motkomania.avif';
import motkomaniaLogoUrlWebp from '../../assets/images/minifiedLogos/motkomania.webp';

import okkiLogoUrl from '../../assets/images/minifiedLogos/okki.jfif';
import okkiLogoUrlAvif from '../../assets/images/minifiedLogos/okki.avif';
import okkiLogoUrlWebp from '../../assets/images/minifiedLogos/okki.webp';

import paciorkowceLogoUrl from '../../assets/images/minifiedLogos/paciorkowce.png';
import paciorkowceLogoUrlAvif from '../../assets/images/minifiedLogos/paciorkowce.avif';
import paciorkowceLogoUrlWebp from '../../assets/images/minifiedLogos/paciorkowce.webp';

import strikkeLogoUrl from '../../assets/images/minifiedLogos/strikke.png';

import theKnittingBoxLogoUrl from '../../assets/images/minifiedLogos/TheKnittingBox-update.jfif';
import theKnittingBoxLogoUrlAvif from '../../assets/images/minifiedLogos/TheKnittingBox-update.avif';
import theKnittingBoxLogoUrlWebp from '../../assets/images/minifiedLogos/TheKnittingBox-update.webp';

import timeToKnitLogoUrl from '../../assets/images/minifiedLogos/timetoknit.png';
import timeToKnitLogoUrlAvif from '../../assets/images/minifiedLogos/timetoknit.avif';
import timeToKnitLogoUrlWebp from '../../assets/images/minifiedLogos/timetoknit.webp';

import welnaBawelnaLogoUrl from '../../assets/images/minifiedLogos/WelnaBawelna.jpg';
import welnaBawelnaLogoUrlAvif from '../../assets/images/minifiedLogos/WelnaBawelna.avif';
import welnaBawelnaLogoUrlWebp from '../../assets/images/minifiedLogos/WelnaBawelna.webp';

import wloczykijkiLogoUrl from '../../assets/images/minifiedLogos/wloczykijki.png';
import wloczykijkiLogoUrlAvif from '../../assets/images/minifiedLogos/wloczykijki.avif';
import wloczykijkiLogoUrlWebp from '../../assets/images/minifiedLogos/wloczykijki.webp';

import wloczkotki from '../../assets/images/minifiedLogos/wloczkotki.jpg';
import wloczkotkiAvif from '../../assets/images/minifiedLogos/wloczkotki.avif';
import wloczkotkiWebp from '../../assets/images/minifiedLogos/wloczkotki.webp';

import woolloopLogoUrl from '../../assets/images/minifiedLogos/woolloop_round.jfif';
import woolloopLogoUrlAvif from '../../assets/images/minifiedLogos/woolloop_round.avif';
import woolloopLogoUrlWebp from '../../assets/images/minifiedLogos/woolloop_round.webp';

import yarnPowerLogoUrl from '../../assets/images/minifiedLogos/yarn_power.jfif';
import yarnPowerLogoUrlAvif from '../../assets/images/minifiedLogos/yarn_power.avif';
import yarnPowerLogoUrlWebp from '../../assets/images/minifiedLogos/yarn_power.webp';

import brioszka from '../../assets/images/minifiedLogos/brioszka.png';
import brioszkaAvif from '../../assets/images/minifiedLogos/brioszka.avif';
import brioszkaWebp from '../../assets/images/minifiedLogos/brioszka.webp';

import halbanka from '../../assets/images/minifiedLogos/Halbanka.jpg';
import halbankaAvif from '../../assets/images/minifiedLogos/Halbanka.avif';
import halbankaWebp from '../../assets/images/minifiedLogos/Halbanka.webp';

import wydawnictwoRn from '../../assets/images/minifiedLogos/wydawnictworn.jpg';
import wydawnictwoRnAvif from '../../assets/images/minifiedLogos/wydawnictworn.avif';
import wydawnictwoRnWebp from '../../assets/images/minifiedLogos/wydawnictworn.webp';

import woolmorning from '../../assets/images/minifiedLogos/woolmorning.jpg';
import woolmorningAvif from '../../assets/images/minifiedLogos/woolmorning.avif';
import woolmorningWebp from '../../assets/images/minifiedLogos/woolmorning.webp';

import liloppi from '../../assets/images/minifiedLogos/liloppi.jpg';
import liloppiAvif from '../../assets/images/minifiedLogos/liloppi.avif';
import liloppiWebp from '../../assets/images/minifiedLogos/liloppi.webp';

import koloKniei from '../../assets/images/minifiedLogos/kolokniei.png';
import koloKnieiAvif from '../../assets/images/minifiedLogos/kolokniei.avif';
import koloKnieiWebp from '../../assets/images/minifiedLogos/kolokniei.webp';

import dziergaweczki from '../../assets/images/minifiedLogos/dziergaweczki.jpg';
import dziergaweczkiAvif from '../../assets/images/minifiedLogos/dziergaweczki.avif';
import dziergaweczkiWebp from '../../assets/images/minifiedLogos/dziergaweczki.webp';

import mokosza from '../../assets/images/minifiedLogos/mokosza.png';
import mokoszaAvif from '../../assets/images/minifiedLogos/mokosza.avif';
import mokoszaWebp from '../../assets/images/minifiedLogos/mokosza.webp';

import winterbee from '../../assets/images/minifiedLogos/winterbee.jpg';
import winterbeeAvif from '../../assets/images/minifiedLogos/winterbee.avif';
import winterbeeWebp from '../../assets/images/minifiedLogos/winterbee.webp';

import pimotki from '../../assets/images/minifiedLogos/pimotki.png';
import pimotkiAvif from '../../assets/images/minifiedLogos/pimotki.avif';
import pimotkiWebp from '../../assets/images/minifiedLogos/pimotki.webp';

import samaseuszyj from '../../assets/images/minifiedLogos/samaseuszyj.jpg';
import samaseuszyjAvif from '../../assets/images/minifiedLogos/samaseuszyj.avif';
import samaseuszyjWebp from '../../assets/images/minifiedLogos/samaseuszyj.webp';

import szklarka from '../../assets/images/minifiedLogos/szklarka.png';
import szklarkaAvif from '../../assets/images/minifiedLogos/szklarka.avif';
import szklarkaWebp from '../../assets/images/minifiedLogos/szklarka.webp';

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
      <LogoLink to="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <Picture
          width={71 / divider}
          height={100 / divider}
          alt="7oczek_logo"
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

      <LogoLink to="https://agnawool.art/" target="_blank" rel="noreferrer">
        <Picture
          width={85 / divider}
          height={120 / divider}
          alt="agna_wool_art_logo"
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

      <LogoLink to="https://judytamarcol.pl/alemasztocudne/" target="_blank" rel="noreferrer">
        <Picture
          width={130 / divider}
          height={86 / divider}
          alt="alemasztocudne_logo"
          picture={{
            fallbackUrl: alemasztocudneLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: alemasztocudneLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: alemasztocudneLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://animotki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={52 / divider}
          alt="animotki_logo"
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
      </LogoLink>

      <LogoLink to="https://biferno.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={83 / divider}
          alt="biferno_logo"
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

      <LogoLink to="https://brioszka.com.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="brioszka_logo"
          picture={{
            fallbackUrl: brioszka,
            sources: [
              {
                type: 'image/webp',
                url: brioszkaWebp
              },
              {
                type: 'image/avif',
                url: brioszkaAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://centrumwloczek.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="centrum_włóczek_bafpol_logo"
          picture={{
            fallbackUrl: centrumWloczekLogoUrl,
            sources: [
              {
                type: 'image/avif',
                url: centrumWloczekLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: centrumWloczekLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.dyedyedone.com/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="dye_dye_done_logo"
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
      </LogoLink>

      <LogoLink to="https://dziergaweczki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={140 / divider}
          height={42 / divider}
          alt="dziergaweczki_logo"
          picture={{
            fallbackUrl: dziergaweczki,
            sources: [
              {
                type: 'image/webp',
                url: dziergaweczkiWebp
              },
              {
                type: 'image/avif',
                url: dziergaweczkiAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.instagram.com/floralfiber_fusion/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="floral_fiber_fusion_logo"
          picture={{
            fallbackUrl: floralFiberLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: floralFiberLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: floralFiberLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://frra.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={140 / divider}
          height={37 / divider}
          alt="furora_yarns_logo"
          picture={{
            fallbackUrl: furoraLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: furoraLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: furoraLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.gabowool.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={46.5 / divider}
          alt="gabo_wool_logo"
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
      </LogoLink>

      <LogoLink to="https://www.instagram.com/halbanka_rekodzielo/" target="_blank" rel="noreferrer">
        <Picture
          width={120 / divider}
          height={58 / divider}
          alt="halbanka_logo"
          picture={{
            fallbackUrl: halbanka,
            sources: [
              {
                type: 'image/webp',
                url: halbankaWebp
              },
              {
                type: 'image/avif',
                url: halbankaAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="hanka_mi_zrobiła_logo"
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

      <LogoLink to="https://kolokniei.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={67 / divider}
          alt="koło_kniei_logo"
          picture={{
            fallbackUrl: koloKniei,
            sources: [
              {
                type: 'image/webp',
                url: koloKnieiWebp
              },
              {
                type: 'image/avif',
                url: koloKnieiAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="kokonki_logo"
          picture={{
            fallbackUrl: kokonkiLogoUrl
          }}
        />
      </LogoLink>

      <LogoLink to="https://liloppi.pl/pl/" target="_blank" rel="noreferrer">
        <Picture
          width={120 / divider}
          height={71 / divider}
          alt="liloppi_logo"
          picture={{
            fallbackUrl: liloppi,
            sources: [
              {
                type: 'image/webp',
                url: liloppiWebp
              },
              {
                type: 'image/avif',
                url: liloppiAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.facebook.com/lukaceramika/?locale=pl_PL" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={65 / divider}
          alt="luka_ceramika_logo"
          picture={{
            fallbackUrl: lukaceramika,
            sources: [
              {
                type: 'image/webp',
                url: lukaceramikaWebp
              },
              {
                type: 'image/avif',
                url: lukaceramikaAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.lusiaknits.com/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="lusia_knits_logo"
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

      <LogoLink to="https://www.facebook.com/groups/1020511551665421/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={62 / divider}
          alt="mania_chomikuje_logo"
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
      </LogoLink>

      <LogoLink to="https://www.martinslab.com/" target="_blank" rel="noreferrer">
        <Picture
          width={81 / divider}
          height={100 / divider}
          alt="martin's_lab_logo"
          picture={{
            fallbackUrl: martinslabLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: martinslabLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: martinslabLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://miladruciarnia.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={66.5 / divider}
          alt="mila_druciarnia_logo"
          picture={{
            fallbackUrl: milaDruciarniaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: milaDruciarniaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: milaDruciarniaLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.missknitski.com/sklep/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="miss_knitski_logo"
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
      </LogoLink>

      <LogoLink to="https://mokosza.com/" target="_blank" rel="noreferrer">
        <Picture
          width={120 / divider}
          height={47 / divider}
          alt="mokosza_logo"
          picture={{
            fallbackUrl: mokosza,
            sources: [
              {
                type: 'image/webp',
                url: mokoszaWebp
              },
              {
                type: 'image/avif',
                url: mokoszaAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://motkomania.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={43 / divider}
          alt="motkomania_logo"
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

      <LogoLink to="https://paciorkowceiwisielce.carrd.co/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="paciorkowce_i_wisielce_logo"
          picture={{
            fallbackUrl: paciorkowceLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: paciorkowceLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: paciorkowceLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://pimotki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="pimotki_logo"
          picture={{
            fallbackUrl: pimotki,
            sources: [
              {
                type: 'image/webp',
                url: pimotkiWebp
              },
              {
                type: 'image/avif',
                url: pimotkiAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://noiklawo.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={80 / divider}
          height={100 / divider}
          alt="sama_se_uszyj_logo"
          picture={{
            fallbackUrl: samaseuszyj,
            sources: [
              {
                type: 'image/webp',
                url: samaseuszyjWebp
              },
              {
                type: 'image/avif',
                url: samaseuszyjAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://strikke.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={150 / divider}
          height={60 / divider}
          alt="strikke_logo"
          picture={{
            fallbackUrl: strikkeLogoUrl
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.instagram.com/szklarka_/" target="_blank" rel="noreferrer">
        <Picture
          width={120 / divider}
          height={27 / divider}
          alt="szklarka_logo"
          picture={{
            fallbackUrl: szklarka,
            sources: [
              {
                type: 'image/webp',
                url: szklarkaWebp
              },
              {
                type: 'image/avif',
                url: szklarkaAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://theknittingbox.pl" target="_blank" rel="noreferrer">
        <Picture
          width={92 / divider}
          height={100 / divider}
          alt="the_knitting_box_logo"
          picture={{
            fallbackUrl: theKnittingBoxLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: theKnittingBoxLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: theKnittingBoxLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={90 / divider}
          alt="time_to_knit_logo"
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
      </LogoLink>

      <LogoLink to="https://welnabawelna.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="wełna_bawełna_logo"
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

      <LogoLink to="https://winterbee.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="winter_bee_candle_logo"
          picture={{
            fallbackUrl: winterbee,
            sources: [
              {
                type: 'image/webp',
                url: winterbeeWebp
              },
              {
                type: 'image/avif',
                url: winterbeeAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={130 / divider}
          height={45 / divider}
          alt="włóczykijki_logo"
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

      <LogoLink to="https://wloczkotki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="włóczkotki_logo"
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

      <LogoLink to="https://woolloop.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="woolloop_logo"
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
      </LogoLink>

      <LogoLink to="https://woolmorning.pl/sklep" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="woolmorning_logo"
          picture={{
            fallbackUrl: woolmorning,
            sources: [
              {
                type: 'image/webp',
                url: woolmorningWebp
              },
              {
                type: 'image/avif',
                url: woolmorningAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.rm.com.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={65 / divider}
          height={100 / divider}
          alt="wydawnictwo_rm_logo"
          picture={{
            fallbackUrl: wydawnictwoRn,
            sources: [
              {
                type: 'image/webp',
                url: wydawnictwoRnWebp
              },
              {
                type: 'image/avif',
                url: wydawnictwoRnAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://yarnpower.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100 / divider}
          height={100 / divider}
          alt="yarnpower_logo"
          picture={{
            fallbackUrl: yarnPowerLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: yarnPowerLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: yarnPowerLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>
    </Grid>
  );
};
