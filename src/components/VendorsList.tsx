import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Link } from './Link';
import { ScreenSize } from '../styles/screeen-size';

// import SiedemOczekLogoUrl from './../assets/images/7oczek.svg';
// import AnimotkiLogoUrl from './../assets/images/animotki.png';
// import BifernoLogoUrl from './../assets/images/biferno.png';
import DyeDyeDoneLogoUrl from './../assets/images/logos/dyedyedone.png';
// import GaboWoolLogoUrl from './../assets/images/gabowool.png';
// import HankaLogoUrl from './../assets/images/hankamizrobila.png';
// import KnitPlLogoUrl from './../assets/images/knitpl.png';
// import KokonkiLogoUrl from './../assets/images/kokonki.png';
// import LovieczkaLogoUrl from './../assets/images/lovieczka.png';
// import MadoboLogoUrl from './../assets/images/madobo.png';
// import MiedzyDrutamiLogoUrl from './../assets/images/miedzydrutami.png';
// import MilaDruciarniaLogoUrl from './../assets/images/miladruciarnia.png';
// import RencamiLogoUrl from './../assets/images/rencami.png';
// import SamaSeUszyjLogoUrl from './../assets/images/samaseuszyj.png';
// import StyloveWloczkiLogoUrl from './../assets/images/stylovewloczki.jpg';
// import WloczkomaniaczkaLogoUrl from './../assets/images/wloczkomaniaczka.png';
import NaSztukiStudioLogoUrl from './../assets/images/logos/nasztukistudio.png';
import StrikkeLogoUrl from './../assets/images/logos/strikke.png';
import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
// import WoollalaLogoUrl from './../assets/images/woollala.jpg';
// import WoolloopLogoUrl from './../assets/images/woolloop.png';
// import WoolniejLogoUrl from './../assets/images/woolniej.png';
//import WooloveLogoUrl from './../assets/images/woolove.png';
// i port YarnWithLoveLogoUrl from './../assets/images/yarnwithlove.png';

import WloczykijkiLogoUrl from './../assets/images/wloczykijki_logo.png';
import WoollalaLogoUrl from './../assets/images/logos/woollala.png';

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
      <Link to="https://www.dyedyedone.com/" target="_blank" rel="noreferrer">
        <img width={140} src={DyeDyeDoneLogoUrl} alt="dyedyedone" />
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

      <Link to="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <img width={180} src={WloczykijkiLogoUrl} alt="wloczykijki" />
      </Link>

      <Link to="https://www.woollala.com" target="_blank" rel="noreferrer">
        <img width={180} src={WoollalaLogoUrl} alt="woollala" />
      </Link>

      {/*  <Link href="https://biferno.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={BifernoLogoUrl} alt="biferno" />
      </Link> */}

      {/*  <Link href="woolove.pl" target="_blank" rel="noreferrer">
        <img width={120} src={WooloveLogoUrl} alt="woolove" />
      </Link> */}

      {/* <Link href="https://lovieczka.pl/" target="_blank" rel="noreferrer">
        <img width={100} src={LovieczkaLogoUrl} alt="lovieczka" />
      </Link> */}

      {/* <Link href="https://madobo.pl" target="_blank" rel="noreferrer">
        <img width={140} src={MadoboLogoUrl} alt="madobo" />
      </Link> */}

      {/*  <Link href="https://miedzydrutami.pl" target="_blank" rel="noreferrer">
        <img width={140} src={MiedzyDrutamiLogoUrl} alt="miedzydrutami" />
      </Link> */}

      {/* <Link href="https://woolloop.pl" target="_blank" rel="noreferrer">
        <img width={160} src={WoolloopLogoUrl} alt="woolloop" />
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

      {/* <Link href="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={HankaLogoUrl} alt="hankamizrobila" />
      </Link> */}

      {/* <Link href="https://stylovewloczki.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={StyloveWloczkiLogoUrl} alt="stylovewloczki" />
      </Link> */}

      {/* <Link href="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={KokonkiLogoUrl} alt="kokonki" />
      </Link> */}

      {/*       <Link href="https://www.gabowool.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={GaboWoolLogoUrl} alt="gabowool" />
      </Link> */}

      {/*       <Link href="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <img width={140} src={SiedemOczekLogoUrl} alt="7oczek" />
      </Link> */}

      {/*  <Link href="https://knitpl.com/" target="_blank" rel="noreferrer">
        <img width={140} src={KnitPlLogoUrl} alt="knitpl" />
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
