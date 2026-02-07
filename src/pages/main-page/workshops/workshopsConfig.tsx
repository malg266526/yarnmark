import knitologUrlWebp from '../../../assets/images/workshops/Knitolog.webp';
import knitologUrl from '../../../assets/images/workshops/Knitolog.jfif';

import edknittedUrl from '../../../assets/images/workshops/edknitted.jfif';
import edknittedUrlWebp from '../../../assets/images/workshops/edkknitted.webp';

import kroopaUrl from '../../../assets/images/workshops/Kroopa.jfif';
import kroopaUrlAvif from '../../../assets/images/workshops/Kroopa.avif';

import iwonaUrl from '../../../assets/images/workshops/iwona.jfif';
import iwonaUrlWebp from '../../../assets/images/workshops/iwona.webp';

import magdaUrl from '../../../assets/images/workshops/magda.jfif';
import magdaUrlWebp from '../../../assets/images/workshops/magda.webp';

import skeinUrl from '../../../assets/images/workshops/skein2.jfif';
import skeinUrlWebp from '../../../assets/images/workshops/skein2.webp';

import { UnprefixedTranslationKeys } from '../../../translations/useTypedTranslation';
import { yarnmarkLogoPictureConfig } from '../../../assets/yarnmarkLogoPictureConfig';

type Room = 'conference' | 'library' | 'bursa1' | 'bursa2' | 'skein' | 'forum' | 'reading_room';

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
  weekDay?: 'saturday' | 'sunday';
};

export const WorkshopsConfig: WorkshopsEntry[] = [
  {
    topicKey: 'workshops.kroopa.title_beginner',
    time: '9:00 - 12:30',
    weekDay: 'saturday',
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
    isSoldOut: false,
    room: 'conference', // Sala konferencyjna
    price: 200,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Podstawy-zakardu/3453',
    description: 'workshops.kroopa.description',
    materials: 'workshops.kroopa.materials_sat', // Gabo Wool
    aboutMe: 'workshops.kroopa.aboutMe',
    links: {
      facebook: 'https://www.facebook.com/kroopaknits/',
      instagram: 'https://www.instagram.com/kroopa.knits/',
      raverly: 'https://www.ravelry.com/patterns/sources/kroopa-knits/patterns',
      other: 'https://kroopaknits.pl/'
    }
  },
  {
    topicKey: 'workshops.kroopa.title_beginner_sun',
    time: '9:00 - 12:30',
    weekDay: 'sunday',
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
    isSoldOut: false,
    room: 'library', // Biblioteka
    price: 200,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Podstawy-zakardu/3453',
    description: 'workshops.kroopa.description',
    materials: 'workshops.kroopa.materials_sun', // Sponsor XXX
    aboutMe: 'workshops.kroopa.aboutMe',
    links: {
      facebook: 'https://www.facebook.com/kroopaknits/',
      instagram: 'https://www.instagram.com/kroopa.knits/',
      raverly: 'https://www.ravelry.com/patterns/sources/kroopa-knits/patterns',
      other: 'https://kroopaknits.pl/'
    }
  },

  // --- IWONA ERIKSSON ---
  {
    topicKey: 'workshops.iwona.title_socks',
    time: '12:30 - 15:30',
    weekDay: 'saturday',
    leading: 'Iwona Eriksson',
    picture: { fallback: iwonaUrl, sources: [{ type: 'image/webp', url: iwonaUrlWebp }] },
    isSoldOut: false,
    room: 'bursa1',
    price: 200,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Rzedy-skrocone/3452',
    description: 'workshops.iwona.description_socks',
    materials: 'workshops.iwona.materials_socks',
    aboutMe: 'workshops.iwona.aboutMe'
  },
  {
    topicKey: 'workshops.iwona.title_heels',
    time: '9:00 - 12:00',
    weekDay: 'sunday',
    leading: 'Iwona Eriksson',
    picture: { fallback: iwonaUrl, sources: [{ type: 'image/webp', url: iwonaUrlWebp }] },
    isSoldOut: false,
    room: 'forum',
    price: 200,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Rzedy-skrocone/3452',
    description: 'workshops.iwona.description_heels',
    materials: 'workshops.iwona.materials_heels',
    aboutMe: 'workshops.iwona.aboutMe'
  },

  // --- KNITOLOG ---
  {
    topicKey: 'workshops.knitolog.title_tricks',
    time: '9:00 - 12:00',
    weekDay: 'saturday',
    leading: 'Dorota Morawiak-Lichota (KNITOLOG)',
    picture: { fallback: knitologUrl, sources: [{ type: 'image/webp', url: knitologUrlWebp }] },
    isSoldOut: false,
    room: 'bursa1',
    price: 200,
    ticketUrl: 'Yarnmark-2025-Warsztaty-Zakard-dla-mniej-lub-bardziej-zaawansowanych/2839',
    description: 'workshops.knitolog.description_tricks',
    materials: 'workshops.knitolog.materials_tricks',
    aboutMe: 'workshops.knitolog.aboutMe'
  },
  {
    topicKey: 'workshops.knitolog.title_jacquard',
    time: '9:00 - 12:00',
    weekDay: 'sunday',
    leading: 'Dorota Morawiak-Lichota (KNITOLOG)',
    picture: { fallback: knitologUrl, sources: [{ type: 'image/webp', url: knitologUrlWebp }] },
    isSoldOut: false,
    room: 'reading_room',
    price: 200,
    ticketUrl: 'Yarnmark-2025-Warsztaty-Zakard-dla-mniej-lub-bardziej-zaawansowanych/2839',
    description: 'workshops.knitolog.description_jacquard',
    materials: 'workshops.knitolog.materials_jacquard',
    aboutMe: 'workshops.knitolog.aboutMe'
  },

  // --- SKEIN ---
  {
    topicKey: 'workshops.skein.title',
    time: '12:00 - 15:00',
    weekDay: 'saturday',
    leading: 'Skein x @pixeldzierga',
    picture: { fallback: skeinUrl, sources: [{ type: 'image/webp', url: skeinUrlWebp }] },
    isSoldOut: false,
    room: 'conference',
    price: 310,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Punch-Needle/3457',
    description: 'workshops.skein.description',
    materials: 'workshops.skein.materials',
    aboutMe: 'workshops.skein.aboutMe'
  },
  {
    topicKey: 'workshops.skein.title',
    time: '10:00 - 13:00',
    weekDay: 'sunday',
    leading: 'Skein x @pixeldzierga',
    picture: { fallback: skeinUrl, sources: [{ type: 'image/webp', url: skeinUrlWebp }] },
    isSoldOut: false,
    room: 'skein' as any,
    price: 310,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Punch-Needle/3457',
    description: 'workshops.skein.description',
    materials: 'workshops.skein.materials',
    aboutMe: 'workshops.skein.aboutMe'
  },
  // --- SPLOTKA ---
  {
    topicKey: 'workshops.splotka.title',
    time: '15:00 - 18:00', // Przykładowy czas
    leading: 'Monika Splotka',
    picture: yarnmarkLogoPictureConfig, // Zmień na właściwy import zdjęcia
    isSoldOut: false,
    room: 'bursa2',
    price: 310,
    ticketUrl: 'workshops.splotka.url',
    description: 'workshops.splotka.description',
    materials: 'workshops.splotka.materials',
    aboutMe: 'workshops.splotka.aboutMe'
  },

  // --- EDKNITTED ---
  {
    topicKey: 'workshops.edknitted.title',
    time: '9:00 - 12:00',
    leading: 'Asia EDKNITTED',
    picture: { fallback: edknittedUrl, sources: [{ type: 'image/webp', url: edknittedUrlWebp }] },
    room: 'library',
    isSoldOut: false,
    materials: 'workshops.edknitted.materials',
    price: 180,
    description: 'workshops.edknitted.description',
    ticketUrl:
      'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Polish-Your-Pattern%2C-czyli-jak-odpicowac-swoj-wzor/3454',
    aboutMe: 'workshops.edknitted.aboutMe'
  },

  // --- NOWE HAFTY ---
  {
    topicKey: 'workshops.nowehafty.title',
    time: '14:00 - 16:00',
    leading: 'Katarzyna Kępka (Nowe Hafty)',
    picture: yarnmarkLogoPictureConfig,
    isSoldOut: false,
    room: 'bursa2',
    price: 150,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Haft-na-welnie/2837',
    description: 'workshops.nowehafty.description',
    materials: 'workshops.nowehafty.materials',
    aboutMe: 'workshops.nowehafty.aboutMe'
  },

  // --- SIS HOMEMADE ---
  {
    topicKey: 'workshops.sishomemade.title',
    time: '10:00 - 13:00',
    leading: 'Sis Homemade',
    picture: yarnmarkLogoPictureConfig,
    isSoldOut: false,
    room: 'bursa2',
    price: 200,
    ticketUrl: 'workshops.sishomemade.url',
    description: 'workshops.sishomemade.description',
    materials: 'workshops.sishomemade.materials',
    aboutMe: 'workshops.sishomemade.aboutMe'
  },

  // --- DRUTUTU ---
  {
    topicKey: 'workshops.drutututu.title',
    time: '9:00 - 12:00',
    leading: 'Magdalena @Drutu.tutu',
    picture: { fallback: magdaUrl, sources: [{ type: 'image/webp', url: magdaUrlWebp }] },
    isSoldOut: false,
    room: 'bursa2',
    price: 120,
    ticketUrl: 'https://wloczykijki.pl/pl_PL/p/Yarnmark-2025-Warsztaty-Druty-podstawy/3455',
    description: 'workshops.drutututu.description',
    materials: 'workshops.drutututu.materials',
    aboutMe: 'workshops.drutututu.aboutMe'
  },

  // --- INKA ---
  {
    topicKey: 'workshops.inka.title',
    time: '13:00 - 15:30',
    leading: 'Dagmara (Inka)',
    picture: yarnmarkLogoPictureConfig,
    isSoldOut: false,
    room: 'bursa2',
    price: 120,
    ticketUrl: 'workshops.inka.url',
    description: 'workshops.inka.description',
    materials: 'workshops.inka.materials',
    aboutMe: 'workshops.inka.aboutMe'
  }
];
