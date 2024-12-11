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
          index: 'S34',
          who: 'Lusia Knits'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S33',
          who: 'Mania Chomikuje'
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S32',
          who: 'Włóczki Warmii'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S31'
          // who: 'Furora Yarns'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S30'
          // who: 'Furora Yarns'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S29'
          // who: 'Furora Yarns'
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S28',
          who: 'Ale masz to cudne!'
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
          index: 'P4',
          who: 'Mila Druciarnia'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S26',
          who: 'Mila Druciarnia'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S25'
          // who: 'Liloppi'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S24'
          // who: 'Liloppi'
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
          color: 'taken',
          index: 'S21',
          who: 'The Knitting Box'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S20',
          who: 'Woollala'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S19',
          who: 'Woollala'
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
          color: 'taken',
          index: 'S18',
          who: 'Motkomania'
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
              color: 'taken',
              index: 'M9',
              who: 'Dye dye done'
            },
            {
              width: 2,
              height: 3,
              color: 'taken2',
              index: 'M10',
              who: 'Malinowy Kos'
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
              index: 'M7',
              who: 'Dye dye done'
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
              color: 'taken2',
              index: 'M5'
              // who: 'Mokosza'
            },
            {
              width: 2,
              height: 3,
              color: 'taken',
              index: 'M6',
              who: 'Okki Hand made'
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
              color: 'taken2',
              index: 'M3',
              who: 'Woolove'
            },
            {
              width: 2,
              height: 3,
              color: 'taken',
              index: 'M4'
              // who: 'Floral Fiber Fusion'
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
          color: 'taken2',
          index: 'P2'
          // who: 'Strikke'
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
          index: 'S13',
          who: 'Kokonki'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S12',
          who: 'Kokonki'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S11',
          who: 'Kokonki'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S10',
          who: 'Motek'
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S9',
          who: 'Woolloop'
        },
        {
          width: 4,
          height: 4,
          color: 'taken2',
          index: 'P1',
          who: 'GaboWool'
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
          color: 'taken',
          index: 'S8',
          who: 'Madobo'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S7',
          who: 'Centrum włóczek'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S6',
          who: 'Centrum włóczek'
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S5',
          who: 'Zakrę cone motki'
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S4',
          who: 'Zakrę cone motki'
        },
        {
          width: 3.5,
          color: 'empty',
          text: 'Przejście do toalet'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S3'
          //who: '7oczek'
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
