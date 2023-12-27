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
  index?: number;
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
      height: 4,
      stands: [
        {
          width: 3.5,
          color: 'empty',
          text: 'entrance'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 1
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 2
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 3
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 4
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 5
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 6
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 7
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 8
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 9
        }
      ]
    },
    {
      height: 3,
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
          height: 1.5,
          color: 'empty'
        },
        {
          width: 5,
          height: 3,
          color: 'taken',
          index: 10,
          logoSrc: WloczykijkiLogoUrl,
          taken: true
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 11
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 12
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 13
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 14
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 15
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 16
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 17
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 18
        },
        {
          width: 5,
          height: 3,
          color: 'premium',
          index: 19
        }
      ]
    },
    {
      stands: [
        {
          width: 6,
          height: 29.5,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 4,
          height: 6,
          color: 'empty'
        },
        {
          width: 4,
          height: 2,
          color: 'small1'
        },
        {
          width: 4,
          height: 2,
          color: 'small2'
        },
        {
          width: 4,
          height: 2,
          color: 'empty'
        },
        {
          width: 4,
          height: 2,
          color: 'small1'
        },
        {
          width: 4,
          height: 2,
          color: 'small2'
        },
        {
          width: 4,
          height: 2,
          color: 'empty'
        },
        {
          width: 4,
          height: 2,
          color: 'small1'
        },
        {
          width: 4,
          height: 2,
          color: 'small2'
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
          width: 6,
          height: 29.5,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 5,
          height: 1.5,
          color: 'empty'
        },
        {
          width: 5,
          height: 3,
          color: 'premium',
          index: 20
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 21
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 22
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 23
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 24
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 25
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 26
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 27
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 28
        },
        {
          width: 5,
          height: 3,
          color: 'premium',
          index: 29
        }
      ]
    }
  ],
  bottomRows: [
    {
      height: 2.5,
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
          index: 30
        },
        {
          width: 2.5,
          color: 'normal2',
          height: 4,
          index: 31
        },
        {
          width: 2.5,
          color: 'normal1',
          height: 4,
          index: 32
        },
        {
          width: 2.5,
          color: 'normal2',
          height: 4,
          index: 33
        },
        {
          width: 2.5,
          color: 'normal1',
          height: 4,
          index: 34
        },
        {
          width: 2.5,
          color: 'normal2',
          height: 4,
          index: 35
        },
        {
          width: 2.5,
          color: 'normal1',
          height: 4,
          index: 36
        },
        {
          width: 2.5,
          color: 'normal2',
          height: 4,
          index: 37
        },
        {
          width: 2.5,
          color: 'normal1',
          height: 4,
          index: 38
        },
        {
          width: 3,
          color: 'premium',
          index: 39
        }
      ]
    }
  ]
};
