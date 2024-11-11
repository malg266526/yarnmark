import { BrownScale, HallColors } from '../styles/theme';

export type HallStandType = {
  width: number;
  height?: number;

  text?: string;
  color: keyof typeof HallColors;
  index?: number | string;
  who?: string;
  pair?: HallStandType[];
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

export const HallLightColors = {
  even: BrownScale[100],
  uneven: '#FFD3D9',
  empty: BrownScale[50]
};

export const hallMapConfig: HallMapType = {
  topRows: [
    {
      height: 4,
      stands: [
        {
          width: 4.5,
          color: 'empty',
          text: 'Wejście dla wystawców'
        },
        {
          width: 1.5,
          color: 'empty'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S34'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S33'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S32'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S31'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S30'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S29'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S28'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S27'
        }
      ]
    },
    {
      height: 3.5,
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
      width: 4,
      stands: [
        {
          width: 4,
          height: 4,
          color: 'premium',
          index: 'P4'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S26'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S25'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S24'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S23'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S22'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S21'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S20'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S19'
        },
        {
          width: 4,
          height: 4,
          color: 'premium',
          index: 'P3',
          who: 'Włóczykijki'
        }
      ]
    },
    {
      stands: [
        {
          width: 7,
          height: 26,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 4,
          height: 0.5,
          color: 'empty'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S18'
        },
        {
          width: 4,
          height: 2,
          color: 'empty'
        },
        {
          pair: [
            {
              width: 2,
              height: 3,
              color: 'small1',
              index: 'M9'
            },
            {
              width: 2,
              height: 3,
              color: 'small2',
              index: 'M10'
            }
          ],
          width: 4,
          height: 3,
          color: 'small1'
        },
        {
          pair: [
            {
              width: 2,
              height: 3,
              color: 'small2',
              index: 'M7'
            },
            {
              width: 2,
              height: 3,
              color: 'small1',
              index: 'M8'
            }
          ],
          width: 4,
          height: 3,
          color: 'small1'
        },
        {
          pair: [
            {
              width: 2,
              height: 3,
              color: 'small1',
              index: 'M5'
            },
            {
              width: 2,
              height: 3,
              color: 'small2',
              index: 'M6'
            }
          ],
          width: 4,
          height: 3,
          color: 'small1'
        },
        {
          width: 4,
          height: 3,
          color: 'empty'
        },
        {
          pair: [
            {
              width: 2,
              height: 3,
              color: 'small1',
              index: 'M3'
            },
            {
              width: 2,
              height: 3,
              color: 'small2',
              index: 'M4'
            }
          ],
          width: 4,
          height: 3,
          color: 'small1'
        },
        {
          pair: [
            {
              width: 2,
              height: 3,
              color: 'small2',
              index: 'M1'
            },
            {
              width: 2,
              height: 3,
              color: 'small1',
              index: 'M2'
            }
          ],
          width: 4,
          height: 3,
          color: 'small1'
        },
        {
          width: 4,
          height: 2,
          color: 'empty'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S17'
        }
      ]
    },
    {
      stands: [
        {
          width: 6.5,
          height: 26,
          color: 'empty'
        }
      ]
    },
    {
      stands: [
        {
          width: 4,
          height: 4,
          color: 'premium',
          index: 'P2'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S16'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S15'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S14'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S13'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S12'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S11'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal1',
          index: 'S10'
        },
        {
          width: 4,
          height: 2.5,
          color: 'normal2',
          index: 'S9'
        },
        {
          width: 4,
          height: 4,
          color: 'premium',
          index: 'P1'
        }
      ]
    }
  ],
  bottomRows: [
    {
      height: 4.5,
      stands: [
        {
          width: 26,
          color: 'empty'
        }
      ]
    },
    {
      height: 4,
      stands: [
        {
          width: 2.5,
          color: 'normal1',
          index: 'S8'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S7'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S6'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S5'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S4'
        },
        {
          width: 3.5,
          color: 'empty',
          text: 'Przejście do toalet'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S3'
        },
        {
          width: 2.5,
          color: 'normal1',
          index: 'S2'
        },
        {
          width: 2.5,
          color: 'normal2',
          index: 'S1'
        },
        {
          width: 2.5,
          color: 'empty',
          text: 'Wejście główne'
        }
      ]
    }
  ]
};
