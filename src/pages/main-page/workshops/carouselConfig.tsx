import woolankaUrl from '../../../assets/images/workshops/woolanka.jpg';
import woolankaUrlWebp from '../../../assets/images/workshops/woolanka.webp';
import woolankaUrlAvif from '../../../assets/images/workshops/woolanka.avif';
import { UnprefixedTranslationKeys } from '../../../translations/useTypedTranslation';
import ewaUrl from '../../../assets/images/workshops/ewa.jpg';
import ewaUrlAvif from '../../../assets/images/workshops/ewa.avif';
import haftowaBabaUrlAvif from '../../../assets/images/workshops/haftowa.avif';
import haftowaBabaUrl from '../../../assets/images/workshops/haftowa.jpg';
import haftowaBabaUrlWebp from '../../../assets/images/workshops/haftowa.webp';

export type CarouselEntry = {
  title: UnprefixedTranslationKeys;
  tutor: string;
  instagramUrl: string;
  picture: {
    fallback: string;
    sources?: { type: string; url: string }[];
  };
  description: UnprefixedTranslationKeys;
};

export const CarouselConfig: CarouselEntry[] = [
  {
    title: 'workshops.woolanka.title',
    tutor: 'WOOLANKA Anna Kaleta',
    instagramUrl: 'https://www.instagram.com/woolanka',
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
    description: 'workshops.woolanka.description'
  },
  {
    title: 'workshops.ewa.title',
    tutor: 'Ewa Głazek',
    instagramUrl: 'https://www.instagram.com/evvoola',
    picture: {
      fallback: ewaUrl,
      sources: [
        {
          type: 'image/avif',
          url: ewaUrlAvif
        }
      ]
    },
    description: 'workshops.ewa.description'
  },
  {
    title: 'workshops.haftowaBaba.title',
    tutor: 'Haftowa Baba',
    instagramUrl: 'https://www.instagram.com/haftowababa/',
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
    description: 'workshops.haftowaBaba.description'
  }
];
