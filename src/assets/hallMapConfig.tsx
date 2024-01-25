import { ReactNode } from 'react';
import { HallColors } from '../styles/theme';
import WloczykijkiLogoUrl from './../assets/images/but.png';
import WoollalaLogoUrl from './../assets/images/logos/woollala.png';
import NaSztukiStudioLogoUrl from './../assets/images/logos/nasztukistudio.png';
import StrikkeLogoUrl from './../assets/images/logos/strikke.png';
import DyeDyeDoneLogoUrl from './../assets/images/logos/dyedyedone.png';
import KnitPlLogoUrl from './../assets/images/logos/knitpl.jpg';
import KokonkiLogoUrl from './../assets/images/logos/kokonki.png';
import TheKnittingBoxLogoUrl from './../assets/images/logos/theknittingbox.png';
import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
import WoolloopLogoUrl from './../assets/images/logos/woolloop.png';
import BifernoLogoUrl from './../assets/images/logos/biferno.png';
import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.png';

export type HallStandType = {
  width: number;
  height?: number;

  text?: string;
  color: keyof typeof HallColors;
  logo?: ReactNode;
  logoSrc?: string;
  index?: number | string;
  taken?: boolean;
  who?: string;
};

type HallLineType = {
  width?: number;
  height?: number;

  stands: HallStandType[];
};

type HallMapType = {
  topRows: HallLineType[];
  middleColumns: HallLineType[];
  bottomRows: HallLineType[];
};

export const hallMapConfig: HallMapType = {
  topRows: [
    {
      height: 5,
      stands: [
        {
          width: 2,
          color: 'empty',
          text: 'Wejście'
        },
        {
          width: 3,
          color: 'premium',
          index: 'P1',
          height: 5
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S1',
          height: 4,
          taken: true,
          who: 'Biferno',
          logoSrc: BifernoLogoUrl
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S2',
          height: 4,
          taken: true,
          who: 'Biferno',
          logoSrc: BifernoLogoUrl
        },

        {
          width: 3.5,
          color: 'empty',
          text: 'Przejście do toalet',
          height: 4
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S3',
          height: 4,
          taken: true,
          who: 'KnitPl',
          logoSrc: KnitPlLogoUrl
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S4',
          height: 4
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S5',
          height: 4
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S6',
          height: 4
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S7',
          height: 4,
          taken: true,
          who: 'Madobo'
        }
      ]
    },
    {
      height: 4,
      stands: [
        {
          width: 26,
          color: 'empty'
        }
      ]
    }
  ],
  middleColumns: [
    {
      stands: [
        {
          width: 0.5,
          height: 26,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 5,
          height: 3,
          color: 'taken',
          index: 'P2',
          who: 'GaboWool',
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S8',
          who: 'Pimotki',
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S9',
          who: 'Pimotki',
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S10',
          who: 'Kokonki',
          taken: true,
          logoSrc: KokonkiLogoUrl
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S11',
          who: 'Kokonki',
          taken: true,
          logoSrc: KokonkiLogoUrl
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S12',
          taken: true,
          who: 'TimeToKnit',
          logoSrc: TimeToKnitLogoUrl
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S13',
          taken: true,
          who: 'Strikke',
          logoSrc: StrikkeLogoUrl
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S14',
          who: 'WełnaBawełna'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S15',
          who: 'WełnaBawełna'
        },
        {
          width: 5,
          height: 3,
          color: 'taken',
          index: 'P3',
          taken: true,
          who: 'DyeDyeDone',
          logoSrc: DyeDyeDoneLogoUrl
        }
      ]
    },
    {
      stands: [
        {
          width: 5,
          height: 26,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 4,
          height: 5,
          color: 'empty'
        },
        {
          width: 3,
          height: 2,
          color: 'taken',
          index: 'M1',
          taken: true,
          who: 'Woolove'
        },
        {
          width: 3,
          height: 2,
          color: 'taken2',
          index: 'M2',
          who: 'PaciorkowceIWisielce',
          taken: true
        },
        {
          width: 3,
          height: 2,
          color: 'empty'
        },
        {
          width: 3,
          height: 2,
          color: 'taken',
          index: 'M3',
          taken: true,
          who: 'NaSztukiStudio',
          logoSrc: NaSztukiStudioLogoUrl
        },
        {
          width: 3,
          height: 2,
          color: 'taken2',
          index: 'M4',
          taken: true,
          who: 'TheKnittingBox',
          logoSrc: TheKnittingBoxLogoUrl
        },
        {
          width: 3,
          height: 2,
          color: 'empty'
        },
        {
          width: 3,
          height: 2,
          color: 'taken2',
          index: 'M5',
          who: 'Animotki',
          taken: true
        },
        {
          width: 3,
          height: 2,
          color: 'taken',
          index: 'M6',
          taken: true,
          who: 'HankaMiZrobiła',
          logoSrc: HankaMiZrobilaLogoUrl
        },
        {
          width: 4,
          height: 2,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 5.5,
          height: 26,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 5,
          height: 3,
          color: 'taken',
          index: 'P4',
          logoSrc: WloczykijkiLogoUrl,
          taken: true,
          who: 'Włóczykijki'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S16',
          logoSrc: WoollalaLogoUrl,
          who: 'Woollala',
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S17',
          logoSrc: WoollalaLogoUrl,
          who: 'Woollala',
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S18',
          who: '7oczek',
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S19',
          who: '7Oczek',
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S20',
          who: 'MissKnitski',
          taken: true,
          logoSrc: MissKnitskiLogoUrl
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S21',
          who: 'Woolloop',
          taken: true,
          logoSrc: WoolloopLogoUrl
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S22'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S23'
        },
        {
          width: 5,
          height: 3,
          color: 'taken',
          index: 'P5',
          who: 'Motkomania',
          taken: true
        }
      ]
    },
    {
      stands: [
        {
          width: 1,
          height: 26,
          color: 'empty'
        }
      ]
    }
  ],
  bottomRows: [
    {
      height: 4,
      stands: [
        {
          width: 26,
          color: 'empty'
        }
      ]
    },
    {
      height: 5,
      stands: [
        {
          width: 3,
          color: 'premium',
          index: 'P6'
        },
        {
          width: 2.5,
          color: 'taken',
          height: 4,
          index: 'S24',
          who: 'Mania Chomikuje',
          taken: true
        },
        {
          width: 2.5,
          color: 'normal1',
          height: 4,
          index: 'S25'
        },
        {
          width: 2.5,
          color: 'normal2',
          height: 4,
          index: 'S26'
        },
        {
          width: 2.5,
          color: 'normal1',
          height: 4,
          index: 'S27'
        },
        {
          width: 2.5,
          color: 'normal2',
          height: 4,
          index: 'S28'
        },
        {
          width: 2.5,
          color: 'normal1',
          height: 4,
          index: 'S29'
        },
        {
          width: 3,
          color: 'premium',
          index: 'P7'
        },
        {
          width: 5,
          color: 'empty',
          text: 'Wejście dla wystawców'
        }
      ]
    },
    {
      height: 0.5,
      stands: [
        {
          width: 26,
          color: 'empty'
        }
      ]
    }
  ]
};
