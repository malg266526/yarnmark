import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import SiedemOczekLogoUrl from './../assets/images/7oczek.svg';
import AnimotkiLogoUrl from './../assets/images/animotki.png';
import BifernoLogoUrl from './../assets/images/biferno.png';
import DyeDyeDoneLogoUrl from './../assets/images/dyedyedone.jpg';
import GaboWoolLogoUrl from './../assets/images/gabowool.png';
import HankaLogoUrl from './../assets/images/hankamizrobila.png';
import KnitPlLogoUrl from './../assets/images/knitpl.png';
import KokonkiLogoUrl from './../assets/images/kokonki.png';
import LovieczkaLogoUrl from './../assets/images/lovieczka.png';
import MadoboLogoUrl from './../assets/images/madobo.png';
import MiedzyDrutamiLogoUrl from './../assets/images/miedzydrutami.png';
import MilaDruciarniaLogoUrl from './../assets/images/miladruciarnia.png';
import RencamiLogoUrl from './../assets/images/rencami.png';
import SamaSeUszyjLogoUrl from './../assets/images/samaseuszyj.png';
import StyloveWloczkiLogoUrl from './../assets/images/stylovewloczki.jpg';
import TimeToKnitLogoUrl from './../assets/images/timetoknit.jpg';
import WloczkomaniaczkaLogoUrl from './../assets/images/wloczkomaniaczka.png';
import WloczykijkiLogoUrl from './../assets/images/wloczykijki_logo.png';
import WoollalaLogoUrl from './../assets/images/woollala.jpg';
import WoolloopLogoUrl from './../assets/images/woolloop.png';
import WoolniejLogoUrl from './../assets/images/woolniej.png';
import WooloveLogoUrl from './../assets/images/woolove.png';
import YarnWithLoveLogoUrl from './../assets/images/yarnwithlove.png';
import { Link } from './Link';

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: center;
  gap: ${Spacings.sm};
`;

export const VendorsList = () => {
  return (
    <Grid>
      <Link href="https://wloczykijki.pl/" target="_blank" rel="noreferrer">
        <img width={160} src={WloczykijkiLogoUrl} alt="wloczykijki" />
      </Link>

      <Link href="https://biferno.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={BifernoLogoUrl} alt="biferno" />
      </Link>

      <Link href="woolove.pl" target="_blank" rel="noreferrer">
        <img width={120} src={WooloveLogoUrl} alt="woolove" />
      </Link>

      <Link href="https://lovieczka.pl/" target="_blank" rel="noreferrer">
        <img width={100} src={LovieczkaLogoUrl} alt="lovieczka" />
      </Link>

      <Link href="https://madobo.pl" target="_blank" rel="noreferrer">
        <img width={140} src={MadoboLogoUrl} alt="madobo" />
      </Link>

      <Link href="https://miedzydrutami.pl" target="_blank" rel="noreferrer">
        <img width={140} src={MiedzyDrutamiLogoUrl} alt="miedzydrutami" />
      </Link>

      <Link href="https://www.woollala.com" target="_blank" rel="noreferrer">
        <img width={120} src={WoollalaLogoUrl} alt="woollala" />
      </Link>

      <Link href="https://woolloop.pl" target="_blank" rel="noreferrer">
        <img width={160} src={WoolloopLogoUrl} alt="woolloop" />
      </Link>

      <Link href="https://www.instagram.com/woolniej.pl" target="_blank" rel="noreferrer">
        <img width={160} src={WoolniejLogoUrl} alt="woolniej" />
      </Link>

      <Link href="https://www.timetoknit.pl" target="_blank" rel="noreferrer">
        <img width={220} src={TimeToKnitLogoUrl} alt="timetoknit" />
      </Link>

      <Link href="https://yarnwithlove.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={YarnWithLoveLogoUrl} alt="yarnwithlove" />
      </Link>

      <Link href="https://animotki.pl/" target="_blank" rel="noreferrer">
        <img width={160} src={AnimotkiLogoUrl} alt="animotki" />
      </Link>

      <Link href="https://www.dyedyedone.com/" target="_blank" rel="noreferrer">
        <img width={160} src={DyeDyeDoneLogoUrl} alt="dyedyedone" />
      </Link>

      <Link href="https://hankamizrobila.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={HankaLogoUrl} alt="hankamizrobila" />
      </Link>

      <Link href="https://stylovewloczki.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={StyloveWloczkiLogoUrl} alt="stylovewloczki" />
      </Link>

      <Link href="https://kokonki.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={KokonkiLogoUrl} alt="kokonki" />
      </Link>

      <Link href="https://www.gabowool.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={GaboWoolLogoUrl} alt="gabowool" />
      </Link>

      {/*           <Link href="https://nasztukistudio.pl/" target="_blank" rel="noreferrer">
              <img width={140} src={GaboWoolLogoUrl} alt="nasztukistudio" />
            </Link> */}

      <Link href="https://7oczek.pl/pl/" target="_blank" rel="noreferrer">
        <img width={140} src={SiedemOczekLogoUrl} alt="7oczek" />
      </Link>

      <Link href="https://knitpl.com/" target="_blank" rel="noreferrer">
        <img width={140} src={KnitPlLogoUrl} alt="knitpl" />
      </Link>

      <Link href="https://rencami.pl/" target="_blank" rel="noreferrer">
        <img width={140} src={RencamiLogoUrl} alt="rencami" />
      </Link>

      <Link href="https://wloczkomaniaczka.pl" target="_blank" rel="noreferrer">
        <img width={140} src={WloczkomaniaczkaLogoUrl} alt="wloczkomaniaczka" />
      </Link>

      <Link href="https://noiklawo.pl/" target="_blank" rel="noreferrer">
        <img width={220} src={SamaSeUszyjLogoUrl} alt="samaseuszyj" />
      </Link>

      <Link href="https://miladruciarnia.pl/" target="_blank" rel="noreferrer">
        <img width={160} src={MilaDruciarniaLogoUrl} alt="miladruciarnia" />
      </Link>
    </Grid>
  );
};
