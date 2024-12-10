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
          color: 'taken',
          index: 'S34'
          // who: 'LusiaKnits'
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
          color: 'taken',
          index: 'S28',
          who: 'Judyta Marcol'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S27',
          who: 'Animotki'
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
          color: 'taken',
          index: 'P4'
          // who: 'Mila Druciarnia'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S26'
          // who: 'Mila Druciarnia'
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
          color: 'taken',
          index: 'S23',
          who: 'Miss Knitski'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S22',
          who: 'YarnPower'
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
          color: 'taken2',
          index: 'S20'
          // who: 'Woollala'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S19'
          // who: 'Woollala'
        },
        {
          width: 4,
          height: 4,
          color: 'taken',
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
              color: 'taken',
              index: 'M1',
              who: 'Kania Kania Ceramika'
            },
            {
              width: 2,
              height: 3,
              color: 'taken2',
              index: 'M2',
              who: 'Hanka mi zrobiła'
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
          color: 'taken',
          index: 'S17',
          who: "Martin's lab"
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
          color: 'taken',
          index: 'S16',
          who: 'WełnaBawełna'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S15',
          who: 'WełnaBawełna'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S14',
          who: 'Time to knit'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S13'
          // who: 'Kokonki'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S12'
          // who: 'Kokonki'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S11'
          // who: 'Kokonki'
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
          color: 'taken',
          index: 'S9'
          // who: 'Woolloop'
        },
        {
          width: 4,
          height: 4,
          color: 'taken2',
          index: 'P1'
          // who: 'GaboWool'
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
          color: 'taken',
          index: 'S2',
          who: 'Biferno'
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S1',
          who: 'Biferno'
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
