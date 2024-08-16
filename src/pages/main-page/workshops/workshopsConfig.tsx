import ewaUrlAvif from '../../../assets/images/workshops/ewa.avif';
import ewaUrl from '../../../assets/images/workshops/ewa.jpg';
import pierwszaPomocUrl from '../../../assets/images/workshops/pierwszapomoc.jpg';
import pierwszaPomocUrlAvif from '../../../assets/images/workshops/pierwszapomoc.avif';
import pierwszaPomocUrlWebp from '../../../assets/images/workshops/pierwszapomoc.webp';
import knitologUrlWebp from '../../../assets/images/workshops/knitolog.webp';
import knitologUrlAvif from '../../../assets/images/workshops/knitolog.avif';
import knitologUrl from '../../../assets/images/workshops/knitolog.jpg';
import uwolnijPomyslyUrlAvif from '../../../assets/images/workshops/uwolnijpomysly.avif';
import uwolnijPomyslyWebp from '../../../assets/images/workshops/uwolnijpomysly.webp';
import uwolnijPomyslyUrl from '../../../assets/images/workshops/uwolnijpomysly.jpg';
import woolankaUrlWebp from '../../../assets/images/workshops/woolanka.webp';
import woolankaUrlAvif from '../../../assets/images/workshops/woolanka.avif';
import woolankaUrl from '../../../assets/images/workshops/woolanka.jpg';
import haftowaBabaUrl from '../../../assets/images/workshops/haftowa.jpg';
import haftowaBabaUrlWebp from '../../../assets/images/workshops/haftowa.webp';
import haftowaBabaUrlAvif from '../../../assets/images/workshops/haftowa.avif';
import { UnprefixedTranslationKeys } from '../../../translations/useTypedTranslation';

type EntryPricing =
  | { ticketUrl: string; isSoldOut?: false }
  | {
      isSoldOut: true;
    };

type Room = 'mirrors' | 'fencing' | 'conference';

export type WorkshopsEntry = {
  topicKey: UnprefixedTranslationKeys;
  time: string;
  picture: {
    fallback: string;
    sources?: { type: string; url: string }[];
  };
  room: Room;
  price: number;
} & EntryPricing;

export const WorkshopsConfig: WorkshopsEntry[] = [
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
    room: 'mirrors',
    isSoldOut: true,
    price: 30
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
    room: 'mirrors',
    price: 30,
    isSoldOut: true
  },
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
    room: 'fencing',
    isSoldOut: true,
    price: 30
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
    room: 'fencing',
    price: 150,
    ticketUrl: 'https://wloczykijki.pl/pl/p/Warsztaty-Uwolnij-pomysly-/2840'
  },
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
    ticketUrl: 'https://wloczykijki.pl/pl/p/Warsztaty-Dzianiny-ozdobne/2842',
    room: 'conference'
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
    isSoldOut: true,
    room: 'conference',
    price: 30
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
    isSoldOut: true,
    room: 'conference',
    price: 30
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
    isSoldOut: true,
    room: 'conference',
    price: 30
  }
];
