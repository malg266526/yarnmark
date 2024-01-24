import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Link } from './Link';
import { ScreenSize } from '../styles/screeen-size';

import BifernoLogoUrlAvif from './../assets/images/logos/biferno.avif';
import BifernoLogoUrlWebp from './../assets/images/logos/biferno.webp';
import BifernoLogoUrlJpg from './../assets/images/logos/biferno.jpg';

import DyeDyeDoneLogoUrl from './../assets/images/logos/dyedyedone.png';
import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import KnitPlLogoUrl from './../assets/images/logos/knitpl.jpg';
import KokonkiLogoUrl from './../assets/images/logos/kokonki.png';
import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.png';
import NaSztukiStudioLogoUrl from './../assets/images/logos/nasztukistudio.png';
import StrikkeLogoUrl from './../assets/images/logos/strikke.png';
import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
import TheKnittingBoxLogoUrl from './../assets/images/logos/theknittingbox.png';
import WloczykijkiLogoUrl from './../assets/images/wloczykijki_logo.png';
import WoollalaLogoUrl from './../assets/images/logos/woollala.png';
import WoolloopLogoUrl from './../assets/images/logos/woolloop.png';

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
        <picture>
          <source srcSet={BifernoLogoUrlAvif} type="image/avif" />
          <source srcSet={BifernoLogoUrlWebp} type="image/webp" />
          <img width={140} src={BifernoLogoUrlJpg} alt="biferno" />
        </picture>
      </Link>

      <Link to="https://www.dyedyedone.com/" target="_blank" rel="noreferrer">
        <img width={120} src={DyeDyeDoneLogoUrl} alt="dyedyedone" />
      </Link>

      <Link to="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <img width={120} src={HankaMiZrobilaLogoUrl} alt="hankamizrobila" />
      </Link>

      <Link to="https://knitpl.com/" target="_blank" rel="noreferrer">
        <img width={120} src={KnitPlLogoUrl} alt="knitpl" />
      </Link>

      <Link to="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <img width={200} src={KokonkiLogoUrl} alt="kokonki" />
      </Link>

      <Link to="https://www.missknitski.com/sklep/" target="_blank" rel="noreferrer">
        <img width={120} src={MissKnitskiLogoUrl} alt="missknitski" />
      </Link>

      <Link to="https://nasztukistudio.pl/" target="_blank" rel="noreferrer">
        <img width={100} src={NaSztukiStudioLogoUrl} alt="nasztukistudio" />
      </Link>

      <Link to="https://strikke.pl/" target="_blank" rel="noreferrer">
        <img width={180} src={StrikkeLogoUrl} alt="Strikke" />
      </Link>

      <Link to="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <img width={120} src={TimeToKnitLogoUrl} alt="timetoknit" />
      </Link>

      <Link to="https://theknittingbox.pl" target="_blank" rel="noreferrer">
        <img width={120} src={TheKnittingBoxLogoUrl} alt="theknittingbox" />
      </Link>

      <Link to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <img width={180} src={WloczykijkiLogoUrl} alt="wloczykijki" />
      </Link>

      <Link to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <img width={180} src={WoollalaLogoUrl} alt="woollala" />
      </Link>

      <Link to="https://woolloop.pl" target="_blank" rel="noreferrer">
        <img width={120} src={WoolloopLogoUrl} alt="woolloop" />
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
