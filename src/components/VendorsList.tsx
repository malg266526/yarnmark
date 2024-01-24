import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Link } from './Link';
import { ScreenSize } from '../styles/screeen-size';

import BifernoLogoUrlAvif from './../assets/images/logos/biferno.avif';
import BifernoLogoUrlWebp from './../assets/images/logos/biferno.webp';
import BifernoLogoUrlJpg from './../assets/images/logos/biferno.jpg';

import DyeDyeDoneLogoUrlAvif from './../assets/images/logos/dyedyedone.avif';
import DyeDyeDoneLogoUrlWebp from './../assets/images/logos/dyedyedone.webp';
import DyeDyeDoneLogoUrlJpg from './../assets/images/logos/dyedyedone.jpg';

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
import WloczykijkiLogoUrl from './../assets/images/wloczykijki_logo.png';

import WoollalaLogoUrl from './../assets/images/logos/woollala.jpg';
import WoollalaLogoUrlAvif from './../assets/images/logos/woollala.avif';
import WoollalaLogoUrlWebp from './../assets/images/logos/woollala.webp';

import WoolloopLogoUrl from './../assets/images/logos/woolloop.jpg';
import WoolloopLogoUrlAvif from './../assets/images/logos/woolloop.avif';
import WoolloopLogoUrlWebp from './../assets/images/logos/woolloop.webp';

import { MinifiedLogo } from './MinifiedLogo';

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
        <MinifiedLogo
          width={140}
          alt="biferno"
          jpgUrl={BifernoLogoUrlJpg}
          webpUrl={BifernoLogoUrlWebp}
          avifUrl={BifernoLogoUrlAvif}
        />
      </Link>

      <Link to="https://www.dyedyedone.com/" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={120}
          alt="dyedyedone"
          jpgUrl={DyeDyeDoneLogoUrlJpg}
          webpUrl={DyeDyeDoneLogoUrlWebp}
          avifUrl={DyeDyeDoneLogoUrlAvif}
        />
      </Link>

      <Link to="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={120}
          alt="hankamizrobila"
          jpgUrl={HankaMiZrobilaLogoUrl}
          webpUrl={HankaMiZrobilaLogoUrlWebp}
          avifUrl={HankaMiZrobilaLogoUrlAvif}
        />
      </Link>

      <Link to="https://knitpl.com/" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={120}
          alt="knitpl"
          jpgUrl={KnitPlLogoUrl}
          webpUrl={KnitPlLogoUrlWebp}
          avifUrl={KnitPlLogoUrlAvif}
        />
      </Link>

      <Link to="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={200}
          alt="kokonki"
          jpgUrl={KokonkiLogoUrl}
          webpUrl={KokonkiLogoUrlWebp}
          avifUrl={KokonkiLogoUrlAvif}
        />
      </Link>

      <Link to="https://www.missknitski.com/sklep/" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={120}
          alt="missknitski"
          jpgUrl={MissKnitskiLogoUrl}
          webpUrl={MissKnitskiLogoUrlWebp}
          avifUrl={MissKnitskiLogoUrlAvif}
        />
      </Link>

      <Link to="https://nasztukistudio.pl/" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={100}
          alt="nasztukistudio"
          jpgUrl={NaSztukiStudioLogoUrl}
          webpUrl={NaSztukiStudioLogoUrlWebp}
          avifUrl={NaSztukiStudioLogoUrlAvif}
        />
      </Link>

      <Link to="https://strikke.pl/" target="_blank" rel="noreferrer">
        <img width={180} src={StrikkeLogoUrl} alt="Strikke" />
      </Link>

      <Link to="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={120}
          alt="timetoknit"
          jpgUrl={TimeToKnitLogoUrl}
          webpUrl={TimeToKnitLogoUrlWebp}
          avifUrl={TimeToKnitLogoUrlAvif}
        />
      </Link>

      <Link to="https://theknittingbox.pl" target="_blank" rel="noreferrer">
        <img width={120} src={TheKnittingBoxLogoUrl} alt="theknittingbox" />
      </Link>

      <Link to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <img width={180} src={WloczykijkiLogoUrl} alt="wloczykijki" />
      </Link>

      <Link to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={180}
          alt="woollala"
          jpgUrl={WoollalaLogoUrl}
          webpUrl={WoollalaLogoUrlWebp}
          avifUrl={WoollalaLogoUrlAvif}
        />
      </Link>

      <Link to="https://woolloop.pl" target="_blank" rel="noreferrer">
        <MinifiedLogo
          width={120}
          alt="woolloop"
          jpgUrl={WoolloopLogoUrl}
          webpUrl={WoolloopLogoUrlWebp}
          avifUrl={WoolloopLogoUrlAvif}
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
