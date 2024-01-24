import { HallColors } from '../styles/theme';

import WloczykijkiLogoUrl from './../assets/images/but.png';
import BifernoLogoUrlAvif from './../assets/images/logos/biferno.avif';
import BifernoLogoUrlJpg from './../assets/images/logos/biferno.jpg';
import BifernoLogoUrlWebp from './../assets/images/logos/biferno.webp';

import DyeDyeDoneLogoUrlAvif from './../assets/images/logos/dyedyedone.avif';
import DyeDyeDoneLogoUrlJpg from './../assets/images/logos/dyedyedone.jpg';
import DyeDyeDoneLogoUrlWebp from './../assets/images/logos/dyedyedone.webp';

import HankaMiZrobilaLogoUrlAvif from './../assets/images/logos/hankamizrobila.avif';
import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import HankaMiZrobilaLogoUrlWebp from './../assets/images/logos/hankamizrobila.webp';

import KnitPlLogoUrlAvif from './../assets/images/logos/knitpl.avif';
import KnitPlLogoUrl from './../assets/images/logos/knitpl.jpg';
import KnitPlLogoUrlWebp from './../assets/images/logos/knitpl.webp';

import KokonkiLogoUrlAvif from './../assets/images/logos/kokonki.avif';
import KokonkiLogoUrl from './../assets/images/logos/kokonki.jpg';
import KokonkiLogoUrlWebp from './../assets/images/logos/kokonki.webp';

import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.png';
import NaSztukiStudioLogoUrl from './../assets/images/logos/nasztukistudio.png';
import StrikkeLogoUrl from './../assets/images/logos/strikke.png';
import TheKnittingBoxLogoUrl from './../assets/images/logos/theknittingbox.png';
import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
import WoollalaLogoUrl from './../assets/images/logos/woollala.png';
import WoolloopLogoUrl from './../assets/images/logos/woolloop.png';

export type HallStandType = {
  width: number;
  height?: number;

  text?: string;
  color: keyof typeof HallColors;
  logoSrc?: string;
  index?: number | string;
  taken?: boolean;
  who?: string;

  avifUrl?: string;
  webpUrl?: string;
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
          who: 'Biferno',
          logoSrc: BifernoLogoUrlJpg,
          avifUrl: BifernoLogoUrlAvif,
          webpUrl: BifernoLogoUrlWebp
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S2',
          height: 4,
          who: 'Biferno',
          logoSrc: BifernoLogoUrlJpg,
          avifUrl: BifernoLogoUrlAvif,
          webpUrl: BifernoLogoUrlWebp
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
          who: 'KnitPl',
          logoSrc: KnitPlLogoUrl,
          webpUrl: KnitPlLogoUrlWebp,
          avifUrl: KnitPlLogoUrlAvif
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
          logoSrc: KokonkiLogoUrl,
          avifUrl: KokonkiLogoUrlAvif,
          webpUrl: KokonkiLogoUrlWebp
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S11',
          who: 'Kokonki',
          logoSrc: KokonkiLogoUrl,
          avifUrl: KokonkiLogoUrlAvif,
          webpUrl: KokonkiLogoUrlWebp
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
          color: 'normal2',
          index: 'S14'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S15'
        },
        {
          width: 5,
          height: 3,
          color: 'taken',
          index: 'P3',
          who: 'DyeDyeDone',
          logoSrc: DyeDyeDoneLogoUrlJpg,
          avifUrl: DyeDyeDoneLogoUrlAvif,
          webpUrl: DyeDyeDoneLogoUrlWebp
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
          who: 'HankaMiZrobiła',
          logoSrc: HankaMiZrobilaLogoUrl,
          avifUrl: HankaMiZrobilaLogoUrlAvif,
          webpUrl: HankaMiZrobilaLogoUrlWebp
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
          who: 'Wlóczykijki'
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
          color: 'normal2',
          height: 4,
          index: 'S24'
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
