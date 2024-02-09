import { HallColors } from '../styles/theme';

import WloczykijkiLogoUrl from './../assets/images/logos/but.jpg';
import WloczykijkiLogoUrlAvif from './../assets/images/logos/but.avif';
import WloczykijkiLogoUrlWebp from './../assets/images/logos/but.webp';

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

import DyeDyeDoneLogoUrlAvif from './../assets/images/logos/dyedyedone.avif';
import DyeDyeDoneLogoUrl from './../assets/images/logos/dyedyedone.jpg';
import DyeDyeDoneLogoUrlWebp from './../assets/images/logos/dyedyedone.webp';

import GaboWoolLogoUrl from './../assets/images/logos/gabo.jpg';
import GaboWoolLogoUrlAvif from './../assets/images/logos/gabo.avif';
import GaboWoolLogoUrlWebp from './../assets/images/logos/gabo.webp';

import HankaMiZrobilaLogoUrlAvif from './../assets/images/logos/hankamizrobila.avif';
import HankaMiZrobilaLogoUrl from './../assets/images/logos/hankamizrobila.jpg';
import HankaMiZrobilaLogoUrlWebp from './../assets/images/logos/hankamizrobila.webp';

import KnitPlLogoUrl from './../assets/images/minifiedLogos/knitpl.png';
import KnitPlLogoUrlAvif from './../assets/images/minifiedLogos/knitpl.avif';
import KnitPlLogoUrlWebp from './../assets/images/minifiedLogos/knitpl.webp';

import KokonkiLogoUrl from './../assets/images/minifiedLogos/kokonki.png';

import MadoboLogoUrl from './../assets/images/logos/madobo.jpg';
import MadoboLogoUrlAvif from './../assets/images/logos/madobo.avif';
import MadoboLogoUrlWebp from './../assets/images/logos/madobo.webp';

import ManiaChomikujeLogoUrl from './../assets/images/logos/Mania.jpg';
import ManiaChomikujeLogoUrlAvif from './../assets/images/logos/Mania.avif';
import ManiaChomikujeLogoUrlWebp from './../assets/images/logos/Mania.webp';

import MissKnitskiLogoUrlAvif from './../assets/images/logos/missknitski.avif';
import MissKnitskiLogoUrl from './../assets/images/logos/missknitski.jpg';
import MissKnitskiLogoUrlWebp from './../assets/images/logos/missknitski.webp';

import MokoszaLogoUrl from './../assets/images/logos/mokosza.jpg';
import MokoszaLogoUrlAvif from './../assets/images/logos/mokosza.avif';
import MokoszaLogoUrlWebp from './../assets/images/logos/mokosza.webp';

import MotkomaniaLogoUrl from './../assets/images/logos/motkomania.jpg';
import MotkomaniaLogoUrlAvif from './../assets/images/logos/motkomania.avif';
import MotkomaniaLogoUrlWebp from './../assets/images/logos/motkomania.webp';

import NaSztukiStudioLogoUrl from './../assets/images/minifiedLogos/nasztukistudio.png';

import PimotkiLogoUrl from './../assets/images/logos/pimotki.jpg';
import PimotkiLogoUrlAvif from './../assets/images/logos/pimotki.avif';
import PimotkiLogoUrlWebp from './../assets/images/logos/pimotki.webp';

import siedemOczekLogoUrl from './../assets/images/minifiedLogos/7oczek.jpg';
import siedemOczekLogoUrlAvif from './../assets/images/minifiedLogos/7oczek.avif';
import siedemOczekLogoUrlWebp from './../assets/images/minifiedLogos/7oczek.webp';

import StrikkeLogoUrl from './../assets/images/logos/strikke.png';

import TimeToKnitLogoUrlAvif from './../assets/images/logos/timetoknit.avif';
import TimeToKnitLogoUrl from './../assets/images/logos/timetoknit.jpg';
import TimeToKnitLogoUrlWebp from './../assets/images/logos/timetoknit.webp';

import TheKnittingBoxLogoUrl from './../assets/images/logos/theknittingbox.png';

import WelnaBawelnaLogoUrl from './../assets/images/logos/WelnaBawelna.jpg';
import WelnaBawelnaLogoUrlAvif from './../assets/images/logos/WelnaBawelna.avif';
import WelnaBawelnaLogoUrlWebp from './../assets/images/logos/WelnaBawelna.webp';

import WoollalaLogoUrl from './../assets/images/minifiedLogos/woollala.png';
import WoollalaLogoUrlWebp from './../assets/images/minifiedLogos/woollala.webp';

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
          color: 'taken',
          index: 'S5',
          height: 4,
          who: 'BawełnianyFilament & MalinowyKos',
          picture: {
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
          }
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S6',
          height: 4,
          who: 'Brioszka',
          picture: {
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
          }
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S7',
          height: 4,
          who: 'Madobo',
          picture: {
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
          }
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
            fallbackUrl: KokonkiLogoUrl
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S11',
          who: 'Kokonki',
          picture: {
            fallbackUrl: KokonkiLogoUrl
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
          who: 'WełnaBawełna',
          picture: {
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S15',
          who: 'WełnaBawełna',
          picture: {
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
          }
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
            fallbackUrl: NaSztukiStudioLogoUrl
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
          }
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S19',
          who: '7Oczek',
          picture: {
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
          who: 'Motkomania',
          picture: {
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
          }
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
          color: 'taken2',
          height: 4,
          index: 'S26',
          who: "Martin's Lab"
        },
        {
          width: 2.5,
          color: 'taken',
          height: 4,
          index: 'S27',
          who: 'FuroraYarns'
        },
        {
          width: 2.5,
          color: 'taken',
          height: 4,
          index: 'S28',
          who: 'FuroraYarns'
        },
        {
          width: 2.5,
          color: 'taken2',
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
