import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Link } from '../../components/Link';
import { ScreenSize } from '../../styles/screeen-size';

import alemasztocudneLogoUrl from '../../assets/images/minifiedLogos/alemasztocudne.jpg';
import alemasztocudneLogoUrlAvif from '../../assets/images/minifiedLogos/alemasztocudne.avif';
import alemasztocudneLogoUrlWebp from '../../assets/images/minifiedLogos/alemasztocudne.webp';

import animotkiLogoUrl from '../../assets/images/minifiedLogos/animotki.png';
import animotkiLogoUrlAvif from '../../assets/images/minifiedLogos/animotki.avif';
import animotkiLogoUrlWebp from '../../assets/images/minifiedLogos/animotki.webp';

import bifernoLogoUrl from '../../assets/images/minifiedLogos/biferno.png';
import bifernoLogoUrlAvif from '../../assets/images/minifiedLogos/biferno.avif';
import bifernoLogoUrlWebp from '../../assets/images/minifiedLogos/biferno.webp';

import centrumWloczekLogoUrl from '../../assets/images/minifiedLogos/centrumwloczek.png';
import centrumWloczekLogoUrlAvif from '../../assets/images/minifiedLogos/centrumwloczek.avif';

import dyeDyeDoneLogoUrlAvif from '../../assets/images/minifiedLogos/dyedyedone.avif';
import dyeDyeDoneLogoUrl from '../../assets/images/minifiedLogos/dyedyedone.png';
import dyeDyeDoneLogoUrlWebp from '../../assets/images/minifiedLogos/dyedyedone.webp';

import farbyarniaLogoUrlAvif from '../../assets/images/minifiedLogos/farbyarnia.avif';
import farbyarniaLogoUrl from '../../assets/images/minifiedLogos/farbyarnia.jfif';
import farbyarniaLogoUrlWebp from '../../assets/images/minifiedLogos/farbyarnia.webp';

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

import kaniaLogoUrl from '../../assets/images/minifiedLogos/kaniakania.jfif';
import kaniaLogoUrlAvif from '../../assets/images/minifiedLogos/kaniakania.avif';
import kaniaLogoUrlWebp from '../../assets/images/minifiedLogos/kaniakania.webp';

import kokonkiLogoUrl from '../../assets/images/minifiedLogos/kokonki.png';

import lusiaLogoUrl from '../../assets/images/minifiedLogos/lusiaknits.jpg';
import lusiaLogoUrlAvif from '../../assets/images/minifiedLogos/lusiaknits.avif';
import lusiaLogoUrlWebp from '../../assets/images/minifiedLogos/lusiaknits.webp';

import madoboLogoUrl from '../../assets/images/minifiedLogos/madobo.png';
import madoboLogoUrlAvif from '../../assets/images/minifiedLogos/madobo.avif';
import madoboLogoUrlWebp from '../../assets/images/minifiedLogos/madobo.webp';

import malinowyKosLogoUrl from '../../assets/images/minifiedLogos/malinowyKos.png';
import malinowyKosLogoUrlAvif from '../../assets/images/minifiedLogos/malinowyKos.avif';
import malinowyKosLogoUrlWebp from '../../assets/images/minifiedLogos/malinowyKos.webp';

import maniaChomikujeLogoUrl from '../../assets/images/minifiedLogos/mania.png';
import maniaChomikujeLogoUrlAvif from '../../assets/images/minifiedLogos/mania.avif';
import maniaChomikujeLogoUrlWebp from '../../assets/images/minifiedLogos/mania.webp';

import martinslabLogoUrl from '../../assets/images/minifiedLogos/martinslab_long.jpg';
import martinslabLogoUrlAvif from '../../assets/images/minifiedLogos/martinslab_long.avif';
import martinslabLogoUrlWebp from '../../assets/images/minifiedLogos/martinslab_long.webp';

import milaDruciarniaLogoUrl from '../../assets/images/minifiedLogos/Mila-logo.jfif';
import milaDruciarniaLogoUrlAvif from '../../assets/images/minifiedLogos/Mila-logo.avif';
import milaDruciarniaLogoUrlWebp from '../../assets/images/minifiedLogos/Mila-logo.webp';

import missKnitskiLogoUrl from '../../assets/images/minifiedLogos/missknitski.png';
import missKnitskiLogoUrlAvif from '../../assets/images/minifiedLogos/missknitski.avif';
import missKnitskiLogoUrlWebp from '../../assets/images/minifiedLogos/missknitski.webp';

import motkomaniaLogoUrl from '../../assets/images/minifiedLogos/motkomania.jpg';
import motkomaniaLogoUrlAvif from '../../assets/images/minifiedLogos/motkomania.avif';
import motkomaniaLogoUrlWebp from '../../assets/images/minifiedLogos/motkomania.webp';

import okkiLogoUrl from '../../assets/images/minifiedLogos/okki.jfif';
import okkiLogoUrlAvif from '../../assets/images/minifiedLogos/okki.avif';
import okkiLogoUrlWebp from '../../assets/images/minifiedLogos/okki.webp';

import paciorkowceLogoUrl from '../../assets/images/minifiedLogos/paciorkowce.jpg';
import paciorkowceLogoUrlAvif from '../../assets/images/minifiedLogos/paciorkowce.avif';
import paciorkowceLogoUrlWebp from '../../assets/images/minifiedLogos/paciorkowce.webp';

import siedemOczekLogoUrl from '../../assets/images/minifiedLogos/7oczek.jpg';
import siedemOczekLogoUrlAvif from '../../assets/images/minifiedLogos/7oczek.avif';
import siedemOczekLogoUrlWebp from '../../assets/images/minifiedLogos/7oczek.webp';

import strikkeLogoUrl from '../../assets/images/minifiedLogos/strikke.png';

import timeToKnitLogoUrl from '../../assets/images/minifiedLogos/timetoknit.png';
import timeToKnitLogoUrlAvif from '../../assets/images/minifiedLogos/timetoknit.avif';
import timeToKnitLogoUrlWebp from '../../assets/images/minifiedLogos/timetoknit.webp';

import theKnittingBoxLogoUrl from '../../assets/images/minifiedLogos/theknittingbox.png';

import welnaBawelnaLogoUrl from '../../assets/images/minifiedLogos/WelnaBawelna.jpg';
import welnaBawelnaLogoUrlAvif from '../../assets/images/minifiedLogos/WelnaBawelna.avif';
import welnaBawelnaLogoUrlWebp from '../../assets/images/minifiedLogos/WelnaBawelna.webp';

import wloczkiWarmiiLogoUrl from '../../assets/images/minifiedLogos/wloczkiwarmii.jfif';
import wloczkiWarmiiLogoUrlAvif from '../../assets/images/minifiedLogos/wloczkiwarmii.avif';
import wloczkiWarmiiLogoUrlWebp from '../../assets/images/minifiedLogos/wloczkiwarmii.webp';

import wloczykijkiLogoUrl from '../../assets/images/minifiedLogos/wloczykijki.png';
import wloczykijkiLogoUrlAvif from '../../assets/images/minifiedLogos/wloczykijki.avif';
import wloczykijkiLogoUrlWebp from '../../assets/images/minifiedLogos/wloczykijki.webp';

import woollalaLogoUrl from '../../assets/images/minifiedLogos/woollala.png';
import woollalaLogoUrlWebp from '../../assets/images/minifiedLogos/woollala.webp';

import woolloopLogoUrl from '../../assets/images/minifiedLogos/woolloop.png';
import woolloopLogoUrlAvif from '../../assets/images/minifiedLogos/woolloop.avif';
import woolloopLogoUrlWebp from '../../assets/images/minifiedLogos/woolloop.webp';

import wooloveLogoUrl from '../../assets/images/minifiedLogos/woolove.png';
import wooloveLogoUrlAvif from '../../assets/images/minifiedLogos/woolove.avif';
import wooloveLogoUrlWebp from '../../assets/images/minifiedLogos/woolove.webp';

import yarnPowerLogoUrl from '../../assets/images/minifiedLogos/yarn_power.jfif';
import yarnPowerLogoUrlAvif from '../../assets/images/minifiedLogos/yarn_power.avif';
import yarnPowerLogoUrlWebp from '../../assets/images/minifiedLogos/yarn_power.webp';

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
      <LogoLink to="https://animotki.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={52}
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
      </LogoLink>

      <LogoLink to="https://judytamarcol.pl/alemasztocudne/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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

      {/*
      <LogoLink to="https://www.instagram.com/ani_sploty/" target="_blank" rel="noreferrer">
        <Picture
          width={75}
          height={100}
          alt="anisploty_logo"
          picture={{
            fallbackUrl: anisplotyLogoUrl,
            sources: [
              {
                type: 'image/avif',
                url: anisplotyLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>
*/}

      {/*
      <LogoLink to="https://www.facebook.com/bawelnianyfilament/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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
      </LogoLink>
*/}

      <LogoLink to="https://biferno.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={83}
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
          width={100}
          height={100}
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

      {/*
      <LogoLink to="https://colorido.sklep.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
          alt="colorido"
          picture={{
            fallbackUrl: coloridoLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: coloridoLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: coloridoLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>
*/}

      <LogoLink to="https://www.dyedyedone.com/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
          alt="dyedyedone_logo"
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

      <LogoLink to="https://farbyarnia.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={140}
          height={50}
          alt="farbyarnia_logo"
          picture={{
            fallbackUrl: farbyarniaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: farbyarniaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: farbyarniaLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://www.instagram.com/floralfiber_fusion/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
          alt="floralfiberfusion_logo"
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
          width={100}
          height={47}
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
          width={100}
          height={46.5}
          alt="gabowool_logo"
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

      <LogoLink to="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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

      <LogoLink to="https://www.instagram.com/kania.kania.ceramika/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
          alt="hankamizrobila_logo"
          picture={{
            fallbackUrl: kaniaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: kaniaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: kaniaLogoUrlAvif
              }
            ]
          }}
        />
      </LogoLink>

      <LogoLink to="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <img width={100} height={100} src={kokonkiLogoUrl} alt="kokonki_logo" />
      </LogoLink>

      <LogoLink to="https://www.lusiaknits.com/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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

      <LogoLink to="https://madobo.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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
      </LogoLink>

      <LogoLink to="https://malinowykos.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={95}
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
      </LogoLink>

      <LogoLink to="https://www.facebook.com/groups/1020511551665421/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={62}
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
      </LogoLink>

      <LogoLink to="https://www.martinslab.com/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={50}
          alt="martinslab_logo"
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
          width={100}
          height={66.5}
          alt="miladruciarnia_logo"
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
          width={100}
          height={100}
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
      </LogoLink>

      <LogoLink to="https://motkomania.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={43}
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
      </LogoLink>

      <LogoLink to="https://www.instagram.com/okki_handmade/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          height={100}
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
          width={87}
          height={100}
          alt="paciorkowceiwisielce"
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
      <LogoLink to="https://strikke.pl/" target="_blank" rel="noreferrer">
        <img width={150} height={60} src={strikkeLogoUrl} alt="Strikke_logo" />
      </LogoLink>

      <LogoLink to="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <Picture
          width={87}
          height={100}
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

      <LogoLink to="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={90}
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
      </LogoLink>

      <LogoLink to="https://theknittingbox.pl" target="_blank" rel="noreferrer">
        <img width={100} height={100} src={theKnittingBoxLogoUrl} alt="theknittingbox" />
      </LogoLink>

      <LogoLink to="https://welnabawelna.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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

      <LogoLink to="https://wloczkiwarmii.pl/pl/" target="_blank" rel="noreferrer">
        <Picture
          width={120}
          height={40}
          alt="wloczkiwarmii_logo"
          picture={{
            fallbackUrl: wloczkiWarmiiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: wloczkiWarmiiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: wloczkiWarmiiLogoUrlAvif
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

      <LogoLink to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={71}
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
      </LogoLink>

      <LogoLink to="https://woolloop.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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
      </LogoLink>

      <LogoLink to="https://www.woolove.pl" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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
      </LogoLink>

      <LogoLink to="https://yarnpower.pl/" target="_blank" rel="noreferrer">
        <Picture
          width={100}
          height={100}
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
