import ewaUrlAvif from '../../../assets/images/workshops/ewa.avif';
import ewaUrl from '../../../assets/images/workshops/ewa.jpg';
import pierwszaPomocUrl from '../../../assets/images/workshops/pierwszapomoc.jpg';
import pierwszaPomocUrlAvif from '../../../assets/images/workshops/pierwszapomoc.avif';
import pierwszaPomocUrlWebp from '../../../assets/images/workshops/pierwszapomoc.webp';
import ludArtUrl from '../../../assets/images/workshops/ludart.jpg';
import ludArtUrlWebp from '../../../assets/images/workshops/ludart.webp';
import ludArtUrlAvif from '../../../assets/images/workshops/ludart.avif';
import knitologUrlWebp from '../../../assets/images/workshops/knitolog.webp';
import knitologUrlAvif from '../../../assets/images/workshops/knitolog.avif';
import knitologUrl from '../../../assets/images/workshops/knitolog.jpg';
import uwolnijPomyslyUrlAvif from '../../../assets/images/workshops/uwolnijpomysly.avif';
import uwolnijPomyslyWebp from '../../../assets/images/workshops/uwolnijpomysly.webp';
import uwolnijPomyslyUrl from '../../../assets/images/workshops/uwolnijpomysly.jpg';
import labolensUrlWebp from '../../../assets/images/workshops/labolens.webp';
import labolensUrlAvif from '../../../assets/images/workshops/labolens.avif';
import labolensUrl from '../../../assets/images/workshops/labolens.jpg';
import woolankaUrlWebp from '../../../assets/images/workshops/woolanka.webp';
import woolankaUrlAvif from '../../../assets/images/workshops/woolanka.avif';
import woolankaUrl from '../../../assets/images/workshops/woolanka.jpg';
import haftowaBabaUrl from '../../../assets/images/workshops/haftowa.jpg';
import haftowaBabaUrlWebp from '../../../assets/images/workshops/haftowa.webp';
import haftowaBabaUrlAvif from '../../../assets/images/workshops/haftowa.avif';
import raffiaUrl from '../../../assets/images/workshops/rafia.jpg';
import raffiaUrlAvif from '../../../assets/images/workshops/rafia.avif';
import { UnprefixedTranslationKeys } from '../../../translations/useTypedTranslation';
import raffiaUrlWebp from '../../../assets/images/workshops/rafia.webp';

type EntryPricing =
  | { price: number; ticketUrl: string; isSoldOut?: false }
  | {
      isSoldOut: true;
    };

export type ScheduleEntry = {
  topicKey: UnprefixedTranslationKeys;
  time: string;
  picture: {
    fallback: string;
    sources?: { type: string; url: string }[];
  };
} & EntryPricing;

const MirrorsRoomConfig: ScheduleEntry[] = [
  {
    topicKey: 'workshops.ewa.title',
    time: '9:00 - 10:30',
    picture: {
      fallback: ewaUrl,
      sources: [
        {
          type: 'image/avif',
          url: ewaUrlAvif
        }
      ]
    },
    isSoldOut: true
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '10:30 - 12:00',
    picture: {
      fallback: ewaUrl,
      sources: [
        {
          type: 'image/avif',
          url: ewaUrlAvif
        }
      ]
    },
    isSoldOut: true
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '12:00 - 13:00',
    picture: {
      fallback: pierwszaPomocUrl,
      sources: [
        {
          type: 'image/webp',
          url: pierwszaPomocUrlWebp
        },
        {
          type: 'image/avif',
          url: pierwszaPomocUrlAvif
        }
      ]
    },
    isSoldOut: true
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '13:15 - 14:15',
    picture: {
      fallback: pierwszaPomocUrl,
      sources: [
        {
          type: 'image/webp',
          url: pierwszaPomocUrlWebp
        },
        {
          type: 'image/avif',
          url: pierwszaPomocUrlAvif
        }
      ]
    },
    price: 10,
    ticketUrl: 'https://wloczykijki.pl/pl/p/Warsztaty-Pierwsza-pomoc-/2834'
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '14:30 - 15:30',
    picture: {
      fallback: pierwszaPomocUrl,
      sources: [
        {
          type: 'image/webp',
          url: pierwszaPomocUrlWebp
        },
        {
          type: 'image/avif',
          url: pierwszaPomocUrlAvif
        }
      ]
    },
    price: 10,
    ticketUrl: 'https://wloczykijki.pl/pl/p/Warsztaty-Pierwsza-pomoc-/2834'
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '15:40 - 18:40',
    picture: {
      fallback: ludArtUrl,
      sources: [
        {
          type: 'image/webp',
          url: ludArtUrlWebp
        },
        {
          type: 'image/avif',
          url: ludArtUrlAvif
        }
      ]
    },
    isSoldOut: true
  }
];

const FencingRoomConfig: ScheduleEntry[] = [
  {
    topicKey: 'workshops.ewa.title',
    time: '9:00 - 10:30',
    picture: {
      fallback: knitologUrl,
      sources: [
        {
          type: 'image/webp',
          url: knitologUrlWebp
        },
        {
          type: 'image/avif',
          url: knitologUrlAvif
        }
      ]
    },
    isSoldOut: true
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '12:10 - 15:10',
    picture: {
      fallback: uwolnijPomyslyUrl,
      sources: [
        {
          type: 'image/webp',
          url: uwolnijPomyslyWebp
        },
        {
          type: 'image/avif',
          url: uwolnijPomyslyUrlAvif
        }
      ]
    },
    price: 150,
    ticketUrl: 'https://wloczykijki.pl/pl/p/Warsztaty-Uwolnij-pomysly-/2840'
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '15:20 - 18:20',
    picture: {
      fallback: labolensUrl,
      sources: [
        {
          type: 'image/webp',
          url: labolensUrlWebp
        },
        {
          type: 'image/avif',
          url: labolensUrlAvif
        }
      ]
    },
    price: 130,
    ticketUrl:
      'https://wloczykijki.pl/pl_PL/p/Warsztaty-Uchwyc-piekno-rekodziela-w-obiektywie-warsztaty-z-fotografii-produktowej/2838?preview=true'
  }
];

const ConferenceRoomConfig: ScheduleEntry[] = [
  {
    topicKey: 'workshops.woolanka.title',
    time: '9:15 - 12:15',
    picture: {
      fallback: woolankaUrl,
      sources: [
        {
          type: 'image/webp',
          url: woolankaUrlWebp
        },
        {
          type: 'image/avif',
          url: woolankaUrlAvif
        }
      ]
    },
    price: 100,
    ticketUrl: 'https://wloczykijki.pl/pl/p/Warsztaty-Dzianiny-ozdobne/2842'
  },
  {
    topicKey: 'workshops.haftowaBaba.title',
    time: '12:25 - 15:25',
    picture: {
      fallback: haftowaBabaUrl,
      sources: [
        {
          type: 'image/webp',
          url: haftowaBabaUrlWebp
        },
        {
          type: 'image/avif',
          url: haftowaBabaUrlAvif
        }
      ]
    },
    isSoldOut: true
  },
  {
    topicKey: 'workshops.ewa.title',
    time: '15:35 - 18:45',
    picture: {
      fallback: raffiaUrl,
      sources: [
        {
          type: 'image/webp',
          url: raffiaUrlWebp
        },
        {
          type: 'image/avif',
          url: raffiaUrlAvif
        }
      ]
    },
    ticketUrl: 'https://wloczykijki.pl/pl/p/Warsztaty-Szydelkowanie-z-rafii-/2841',
    price: 150
  }
];

export const ScheduleConfig = {
  mirrorsRoom: MirrorsRoomConfig,
  fencingRoom: FencingRoomConfig,
  conferenceRoom: ConferenceRoomConfig
};
