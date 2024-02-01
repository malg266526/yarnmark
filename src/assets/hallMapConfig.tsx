import { HallColors } from '../styles/theme';

import WloczykijkiLogoUrl from './../assets/images/logos/but.jpg';
import WloczykijkiLogoUrlAvif from './../assets/images/logos/but.avif';
import WloczykijkiLogoUrlWebp from './../assets/images/logos/but.webp';

import AnimotkiLogoUrl from './../assets/images/logos/animotki.jpg';
import AnimotkiLogoUrlAvif from './../assets/images/logos/animotki.avif';
import AnimotkiLogoUrlWebp from './../assets/images/logos/animotki.webp';

import BifernoLogoUrl from './../assets/images/logos/biferno.jpg';
import BifernoLogoUrlAvif from './../assets/images/logos/biferno.avif';
import BifernoLogoUrlWebp from './../assets/images/logos/biferno.webp';

import DyeDyeDoneLogoUrlAvif from './../assets/images/logos/dyedyedone.avif';
import DyeDyeDoneLogoUrl from './../assets/images/logos/dyedyedone.jpg';
import DyeDyeDoneLogoUrlWebp from './../assets/images/logos/dyedyedone.webp';

import GaboWoolLogoUrl from './../assets/images/logos/gabo.jpg';
import GaboWoolLogoUrlAvif from './../assets/images/logos/gabo.avif';
import GaboWoolLogoUrlWebp from './../assets/images/logos/gabo.webp';

import HankaMiZrobilaLogoUrlAvif from './../assets/images/logos/hankamizrobila.avif';
import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import HankaMiZrobilaLogoUrlWebp from './../assets/images/logos/hankamizrobila.webp';

import KnitPlLogoUrlAvif from './../assets/images/logos/knitpl.avif';
import KnitPlLogoUrl from './../assets/images/logos/knitpl.jpg';
import KnitPlLogoUrlWebp from './../assets/images/logos/knitpl.webp';

import KokonkiLogoUrlAvif from './../assets/images/logos/kokonki.avif';
import KokonkiLogoUrl from './../assets/images/logos/kokonki.jpg';
import KokonkiLogoUrlWebp from './../assets/images/logos/kokonki.webp';

import ManiaChomikujeLogoUrl from './../assets/images/logos/Mania.jpg';
import ManiaChomikujeLogoUrlAvif from './../assets/images/logos/Mania.avif';
import ManiaChomikujeLogoUrlWebp from './../assets/images/logos/Mania.webp';

import MissKnitskiLogoUrlAvif from './../assets/images/logos/missknitski.avif';
import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.jpg';
import MissKnitskiLogoUrlWebp from './../assets/images/logos/missknitski.webp';

import MokoszaLogoUrl from './../assets/images/logos/mokosza.jpg';
import MokoszaLogoUrlAvif from './../assets/images/logos/mokosza.avif';
import MokoszaLogoUrlWebp from './../assets/images/logos/mokosza.webp';

import NaSztukiStudioLogoUrlAvif from './../assets/images/logos/nasztukistudio.avif';
import NaSztukiStudioLogoUrl from './../assets/images/logos/nasztukistudio.jpg';
import NaSztukiStudioLogoUrlWebp from './../assets/images/logos/nasztukistudio.webp';

import PimotkiLogoUrl from './../assets/images/logos/pimotki.jpg';
import PimotkiLogoUrlAvif from './../assets/images/logos/pimotki.avif';
import PimotkiLogoUrlWebp from './../assets/images/logos/pimotki.webp';

import SiedemOczekLogoUrl from './../assets/images/logos/7oczek.png';
import StrikkeLogoUrl from './../assets/images/logos/strikke.png';

import TimeToKnitLogoUrlAvif from './../assets/images/logos/timetoknit.avif';
import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
import TimeToKnitLogoUrlWebp from './../assets/images/logos/timetoknit.webp';

import TheKnittingBoxLogoUrl from './../assets/images/logos/theknittingbox.png';

import WoollalaLogoUrlAvif from './../assets/images/logos/woollala.avif';
import WoollalaLogoUrl from './../assets/images/logos/woollala.jpg';
import WoollalaLogoUrlWebp from './../assets/images/logos/woollala.webp';

import WoolloopLogoUrlAvif from './../assets/images/logos/woolloop.avif';
import WoolloopLogoUrl from './../assets/images/logos/woolloop.jpg';
import WoolloopLogoUrlWebp from './../assets/images/logos/woolloop.webp';

import WooloveLogoUrl from './../assets/images/logos/woolove.jpg';
import WooloveLogoUrlAvif from './../assets/images/logos/woolove.avif';
import WooloveLogoUrlWebp from './../assets/images/logos/woolove.webp';

import { PictureType } from '../components/Picture';

export type HallStandType = {
  width: number;
  height?: number;

  text?: string;
  color: keyof typeof HallColors;
  index?: number | string;
  who?: string;

  picture?: PictureType;
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
          picture: {
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
          }
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S2',
          height: 4,
          who: 'Biferno',
          picture: {
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
          }
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
          picture: {
            fallbackUrl: KnitPlLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: KnitPlLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: KnitPlLogoUrlAvif
              }
            ]
          }
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S4',
          height: 4,
          who: 'Mokosza',
          picture: {
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
          }
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S5',
          height: 4
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S6',
          height: 4,
          who: 'Brioszka'
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S7',
          height: 4,
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
          picture: {
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S8',
          who: 'Pimotki',
          picture: {
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S9',
          who: 'Pimotki',
          picture: {
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S10',
          who: 'Kokonki',
          picture: {
            fallbackUrl: KokonkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: KokonkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: KokonkiLogoUrlAvif
              }
            ]
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S11',
          who: 'Kokonki',
          picture: {
            fallbackUrl: KokonkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: KokonkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: KokonkiLogoUrlAvif
              }
            ]
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S12',
          who: 'TimeToKnit',
          picture: {
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S13',
          who: 'Strikke',
          picture: {
            fallbackUrl: StrikkeLogoUrl
          }
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
          who: 'DyeDyeDone',
          picture: {
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
          }
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
          who: 'Woolove',
          picture: {
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
          }
        },
        {
          width: 3,
          height: 2,
          color: 'taken2',
          index: 'M2',
          who: 'PaciorkowceIWisielce'
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
          who: 'NaSztukiStudio',
          picture: {
            fallbackUrl: NaSztukiStudioLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: NaSztukiStudioLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: NaSztukiStudioLogoUrlAvif
              }
            ]
          }
        },
        {
          width: 3,
          height: 2,
          color: 'taken2',
          index: 'M4',
          who: 'TheKnittingBox',
          picture: {
            fallbackUrl: TheKnittingBoxLogoUrl
          }
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
          who: 'Rencami'
        },
        {
          width: 3,
          height: 2,
          color: 'taken',
          index: 'M6',
          who: 'HankaMiZrobiła',
          picture: {
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
          }
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
          who: 'Włóczykijki',
          picture: {
            fallbackUrl: WloczykijkiLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WloczykijkiLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: WloczykijkiLogoUrlAvif
              }
            ]
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S16',
          who: 'Woollala',
          picture: {
            fallbackUrl: WoollalaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WoollalaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: WoollalaLogoUrlAvif
              }
            ]
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S17',
          who: 'Woollala',
          picture: {
            fallbackUrl: WoollalaLogoUrl,
            sources: [
              {
                type: 'image/webp',
                url: WoollalaLogoUrlWebp
              },
              {
                type: 'image/avif',
                url: WoollalaLogoUrlAvif
              }
            ]
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S18',
          who: '7oczek',
          picture: {
            fallbackUrl: SiedemOczekLogoUrl
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S19',
          who: '7Oczek',
          picture: {
            fallbackUrl: SiedemOczekLogoUrl
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S20',
          who: 'MissKnitski',
          picture: {
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S21',
          who: 'Woolloop',
          picture: {
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S22',
          who: 'Liloppi'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S23',
          who: 'Liloppi'
        },
        {
          width: 5,
          height: 3,
          color: 'taken',
          index: 'P5',
          who: 'Motkomania'
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
          picture: {
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
          }
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
          color: 'taken',
          height: 4,
          index: 'S29',
          who: 'Animotki',
          picture: {
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
          }
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
