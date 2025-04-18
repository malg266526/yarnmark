import { BrownScale, HallColors } from '../styles/theme';

export type HallStandType = {
  width: number;
  height?: number;

  text?: string;
  color: keyof typeof HallColors;
  readyColor?: keyof typeof HallColors;
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
          who: 'Lusia Knits',
          readyColor: 200
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S33',
          who: 'Mania Chomikuje',
          readyColor: 300
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S32',
          who: 'Włóczki Warmii',
          readyColor: 200
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S31',
          who: 'Furora Yarns',
          readyColor: 300
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S30',
          who: 'Furora Yarns',
          readyColor: 300
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S29',
          who: 'Furora Yarns',
          readyColor: 300
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S28',
          who: 'Ale masz to cudne!',
          readyColor: 200
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S27',
          who: 'Animotki',
          readyColor: 300
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
          who: 'Mila Druciarnia',
          readyColor: 200
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S26',
          who: 'Mila Druciarnia',
          readyColor: 200
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S25',
          who: '7oczek',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S24',
          who: '7oczek',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S23',
          who: 'Miss Knitski',
          readyColor: 200
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S22',
          who: 'YarnPower',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S21',
          who: 'The Knitting Box',
          readyColor: 200
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S20',
          who: 'Woollala',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S19',
          who: 'Woollala',
          readyColor: 300
        },
        {
          width: 4,
          height: 4,
          color: 'taken',
          index: 'P3',
          who: 'Włóczykijki',
          readyColor: 200
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
          who: 'Motkomania',
          readyColor: 300
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
              who: 'Dye dye done',
              readyColor: 100
            },
            {
              width: 2,
              height: 3,
              color: 'taken2',
              index: 'M10',
              who: 'Malinowy Kos',
              readyColor: 200
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
              who: 'Dye dye done',
              readyColor: 100
            },
            {
              width: 2,
              height: 3,
              color: 'taken',
              index: 'M8',
              who: 'Cera miczne kubki',
              readyColor: 300
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
              index: 'M5',
              who: 'Pacior kowce i wisielce',
              readyColor: 200
            },
            {
              width: 2,
              height: 3,
              color: 'taken',
              index: 'M6',
              who: 'Okki Hand made',
              readyColor: 100
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
              who: 'Woolove',
              readyColor: 200
            },
            {
              width: 2,
              height: 3,
              color: 'taken',
              index: 'M4',
              who: 'Floral Fiber Fusion',
              readyColor: 300
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
              who: 'Kania Kania Ceramika',
              readyColor: 300
            },
            {
              width: 2,
              height: 3,
              color: 'taken2',
              index: 'M2',
              who: 'Hanka mi zrobiła',
              readyColor: 200
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
          who: "Martin's lab",
          readyColor: 200
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
          index: 'P2',
          who: 'Strikke',
          readyColor: 200
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S16',
          who: 'WełnaBawełna',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S15',
          who: 'WełnaBawełna',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S14',
          who: 'Time to knit',
          readyColor: 200
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S13',
          who: 'Kokonki',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S12',
          who: 'Kokonki',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S11',
          who: 'Kokonki',
          readyColor: 300
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken2',
          index: 'S10',
          who: 'Motek',
          readyColor: 200
        },
        {
          width: 4,
          height: 2.5,
          color: 'taken',
          index: 'S9',
          who: 'Woolloop',
          readyColor: 300
        },
        {
          width: 4,
          height: 4,
          color: 'taken2',
          index: 'P1',
          who: 'GaboWool',
          readyColor: 200
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
          who: 'Madobo',
          readyColor: 200
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S7',
          who: 'Centrum włóczek',
          readyColor: 300
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S6',
          who: 'Centrum włóczek',
          readyColor: 300
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S5',
          who: 'Zakrę cone motki',
          readyColor: 200
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S4',
          who: 'Zakrę cone motki',
          readyColor: 200
        },
        {
          width: 3.5,
          color: 'empty',
          text: 'Przejście do toalet'
        },
        {
          width: 2.5,
          color: 'taken2',
          index: 'S3',
          who: 'Farbya rnia',
          readyColor: 300
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S2',
          who: 'Biferno',
          readyColor: 200
        },
        {
          width: 2.5,
          color: 'taken',
          index: 'S1',
          who: 'Biferno',
          readyColor: 200
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
