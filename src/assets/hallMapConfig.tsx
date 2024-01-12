import { ReactNode } from 'react';
import { HallColors } from '../styles/theme';
import WloczykijkiLogoUrl from './../assets/images/but.png';

export type HallStand = {
  width: number;
  height?: number;

  text?: string;
  color: keyof typeof HallColors;
  logo?: ReactNode;
  logoSrc?: string;
  index?: number | string;
  taken?: boolean;
};

type HallLine = {
  width?: number;
  height?: number;

  stands: HallStand[];
};

type HallMap = {
  topRows: HallLine[];
  middleColumns: HallLine[];
  bottomRows: HallLine[];
};

export const hallMapConfig: HallMap = {
  topRows: [
    {
      height: 0.5,
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
          color: 'normal1',
          index: 'S1',
          height: 4
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S2',
          height: 4
        },

        {
          width: 3.5,
          color: 'empty',
          text: 'Przejście do toalet',
          height: 4
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S3',
          height: 4
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
          color: 'normal1',
          index: 'S7',
          height: 4
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
          width: 5,
          height: 3,
          color: 'taken',
          index: 'P2',
          logoSrc: WloczykijkiLogoUrl,
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S8'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S9'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S10'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S11'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S12'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S13'
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
          color: 'premium',
          index: 'P3'
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
          width: 4,
          height: 5,
          color: 'empty'
        },
        {
          width: 3,
          height: 2,
          color: 'small1',
          index: 'M1'
        },
        {
          width: 3,
          height: 2,
          color: 'small2',
          index: 'M2'
        },
        {
          width: 3,
          height: 2,
          color: 'empty'
        },
        {
          width: 3,
          height: 2,
          color: 'small1',
          index: 'M3'
        },
        {
          width: 3,
          height: 2,
          color: 'small2',
          index: 'M4'
        },
        {
          width: 3,
          height: 2,
          color: 'empty'
        },
        {
          width: 3,
          height: 2,
          color: 'small1',
          index: 'M5'
        },
        {
          width: 3,
          height: 2,
          color: 'small2',
          index: 'M6'
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
          color: 'premium',
          index: 'P4'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S16'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S17'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S18'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S19'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S20'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S21'
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
          color: 'premium',
          index: 'P5'
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
          index: 'P6'
        },
        {
          width: 5,
          color: 'empty',
          text: 'Wejście dla wystawców'
        }
      ]
    }
  ]
};
