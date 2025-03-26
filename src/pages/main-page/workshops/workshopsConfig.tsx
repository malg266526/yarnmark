import knitologUrlWebp from '../../../assets/images/workshops/Knitolog.webp';
import knitologUrlAvif from '../../../assets/images/workshops/Knitolog.avif';
import knitologUrl from '../../../assets/images/workshops/Knitolog.jfif';

import ludartUrl from '../../../assets/images/workshops/ludart.jpg';
import ludartUrlWebp from '../../../assets/images/workshops/ludart.webp';
import ludartUrlAvif from '../../../assets/images/workshops/ludart.avif';

import edknittedUrl from '../../../assets/images/workshops/edknitted.jfif';
import edknittedUrlWebp from '../../../assets/images/workshops/edkknitted.webp';
import edknittedUrlAvif from '../../../assets/images/workshops/edknitted.avif';

import kroopaUrl from '../../../assets/images/workshops/Kroopa.jfif';
import kroopaUrlAvif from '../../../assets/images/workshops/Kroopa.avif';

import haftowaBabaUrl from '../../../assets/images/workshops/haftowa.jfif';
import haftowaBabaUrlWebp from '../../../assets/images/workshops/haftowa.webp';
import haftowaBabaUrlAvif from '../../../assets/images/workshops/haftowa.avif';

import heartOfCottonUrl from '../../../assets/images/workshops/Heart_of_Cotton.png';
import heartOfCottonUrlWebp from '../../../assets/images/workshops/Heart_of_Cotton.webp';
import heartOfCottonUrlAvif from '../../../assets/images/workshops/Heart_of_Cotton.avif';

import iwonaUrl from '../../../assets/images/workshops/iwona.jfif';
import iwonaUrlWebp from '../../../assets/images/workshops/iwona.webp';
import iwonaUrlAvif from '../../../assets/images/workshops/iwona.avif';

import magdaUrl from '../../../assets/images/workshops/magda.jfif';
import magdaUrlWebp from '../../../assets/images/workshops/magda.webp';
import magdaUrlAvif from '../../../assets/images/workshops/magda.avif';

import skeinUrl from '../../../assets/images/workshops/skein2.jfif';
import skeinUrlWebp from '../../../assets/images/workshops/skein2.webp';
import skeinUrlAvif from '../../../assets/images/workshops/skein2.avif';

import { UnprefixedTranslationKeys } from '../../../translations/useTypedTranslation';

type Room = 'conference' | 'library' | 'bursa1' | 'bursa2';

export type WorkshopsEntry = {
  topicKey: UnprefixedTranslationKeys;
  time: string;
  picture: {
    fallback: string;
    sources?: { type: string; url: string }[];
  };
  room: Room;
  price: number;
  description?: UnprefixedTranslationKeys;
  ticketUrl: string;
  isSoldOut: boolean;
  materials?: UnprefixedTranslationKeys;
  leading: string;
  links?: {
    raverly?: string;
    facebook?: string;
    instagram?: string;
    other?: string;
  };
  aboutMe?: UnprefixedTranslationKeys;
};

export const WorkshopsConfig: WorkshopsEntry[] = [
  {
    topicKey: 'workshops.skein.title',
    time: '12:30 - 15:30',
    leading: 'Skein x @pixeldzierga',
    picture: {
      fallback: skeinUrl,
      sources: [
        {
          type: 'image/webp',
          url: skeinUrlWebp
        },
        {
          type: 'image/avif',
          url: skeinUrlAvif
        }
      ]
    },
    isSoldOut: true,
    room: 'library',
    price: 250,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Punch-Needle/3457',
    description: 'workshops.skein.description',
    materials: 'workshops.skein.materials',
    aboutMe: 'workshops.skein.aboutMe'
  },
  {
    topicKey: 'workshops.drutututu.title',
    time: '9:00 - 11:00',
    leading: 'Magdalena @Drutu.tutu',
    picture: {
      fallback: magdaUrl,
      sources: [
        {
          type: 'image/webp',
          url: magdaUrlWebp
        },
        {
          type: 'image/avif',
          url: magdaUrlAvif
        }
      ]
    },
    isSoldOut: false,
    room: 'bursa2',
    price: 90,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Druty-podstawy/3455',
    description: 'workshops.drutututu.description',
    materials: 'workshops.drutututu.materials',
    aboutMe: 'workshops.drutututu.aboutMe'
  },
  {
    topicKey: 'workshops.heartofcotton.title',
    time: '11:30 - 13:30',
    leading: 'Ewa Heart Of Cotton',
    picture: {
      fallback: heartOfCottonUrl,
      sources: [
        {
          type: 'image/webp',
          url: heartOfCottonUrlWebp
        },
        {
          type: 'image/avif',
          url: heartOfCottonUrlAvif
        }
      ]
    },
    isSoldOut: false,
    room: 'bursa2',
    price: 90,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Podstawy-szydelka/3456',
    description: 'workshops.heartofcotton.description',
    materials: 'workshops.heartofcotton.materials',
    aboutMe: 'workshops.heartofcotton.aboutMe'
  },
  {
    topicKey: 'workshops.edknitted.title',
    time: '9:00 - 12:00',
    leading: 'Asia EDKNITTED',
    picture: {
      fallback: edknittedUrl,
      sources: [
        {
          type: 'image/webp',
          url: edknittedUrlWebp
        },
        {
          type: 'image/avif',
          url: edknittedUrlAvif
        }
      ]
    },
    room: 'library',
    isSoldOut: true,
    price: 175,
    description: 'workshops.edknitted.description',
    ticketUrl:
      'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Polish-Your-Pattern%2C-czyli-jak-odpicowac-swoj-wzor/3454',
    aboutMe: 'workshops.edknitted.aboutMe'
  },
  {
    topicKey: 'workshops.knitolog.title',
    time: '9:00 - 12:00',
    leading: 'Dorota Morawiak-Lichota (KNITOLOG)',
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
    room: 'bursa1',
    isSoldOut: true,
    price: 170,
    ticketUrl: 'Yarnmark-2025-Warsztaty-Zakard-dla-mniej-lub-bardziej-zaawansowanych/2839',
    description: 'workshops.knitolog.description',
    materials: 'workshops.knitolog.materials',
    links: {
      raverly: 'https://www.ravelry.com/designers/dorota-morawiak-lichota',
      facebook: 'https://www.instagram.com/knitolog/',
      instagram: 'https://www.facebook.com/knitologwpodrozy',
      other: 'www.knitologwpodrozy.pl'
    },
    aboutMe: 'workshops.knitolog.aboutMe'
  },
  {
    topicKey: 'workshops.haftowaBaba.title',
    leading: 'Kamila Haftowa Baba',
    time: '14:00 - 17:00',
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
    isSoldOut: false,
    room: 'bursa2',
    price: 160,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Haft-na-welnie/2837',
    description: 'workshops.haftowaBaba.description',
    materials: 'workshops.haftowaBaba.materials',
    links: {
      instagram: 'https://www.instagram.com/haftowababa/',
      other: 'https://haftowababa.pl/'
    },
    aboutMe: 'workshops.haftowaBaba.aboutMe'
  },
  {
    topicKey: 'workshops.ludart.title',
    leading: 'LudArt',
    time: '9:00 - 12:00',
    picture: {
      fallback: ludartUrl,
      sources: [
        {
          type: 'image/webp',
          url: ludartUrlWebp
        },
        {
          type: 'image/avif',
          url: ludartUrlAvif
        }
      ]
    },
    room: 'conference',
    price: 90,
    isSoldOut: true,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Haft-ludowy/2836',
    description: 'workshops.ludart.description',
    materials: 'workshops.ludart.materials',
    aboutMe: 'workshops.ludart.aboutMe'
  },
  {
    topicKey: 'workshops.iwona.title',
    time: '12:30 - 15:30',
    leading: 'Iwona Eriksson',
    picture: {
      fallback: iwonaUrl,
      sources: [
        {
          type: 'image/webp',
          url: iwonaUrlWebp
        },
        {
          type: 'image/avif',
          url: iwonaUrlAvif
        }
      ]
    },
    isSoldOut: false,
    room: 'bursa1',
    price: 170,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Rzedy-skrocone/3452',
    description: 'workshops.iwona.description',
    materials: 'workshops.iwona.materials',
    aboutMe: 'workshops.iwona.aboutMe',
    links: {
      instagram: 'https://www.instagram.com/iwonaeriksson/',
      other: 'https://www.iwonaerikssondesign.eu/'
    }
  },
  {
    topicKey: 'workshops.kroopa.title',
    time: '12:30 - 16:30',
    leading: 'Karolina Kroopa Knits',
    picture: {
      fallback: kroopaUrl,
      sources: [
        {
          type: 'image/avif',
          url: kroopaUrlAvif
        }
      ]
    },
    isSoldOut: true,
    room: 'conference',
    price: 175,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Podstawy-zakardu/3453',
    description: 'workshops.kroopa.description',
    materials: 'workshops.kroopa.materials',
    aboutMe: 'workshops.kroopa.aboutMe'
  }
];
