import knitologUrlWebp from '../../../assets/images/workshops/knitolog.webp';
import knitologUrlAvif from '../../../assets/images/workshops/knitolog.avif';
import knitologUrl from '../../../assets/images/workshops/knitolog.jpg';

import ludartUrl from '../../../assets/images/workshops/ludart.jpg';
import ludartUrlWebp from '../../../assets/images/workshops/ludart.webp';
import ludartUrlAvif from '../../../assets/images/workshops/ludart.avif';

import haftowaBabaUrl from '../../../assets/images/workshops/haftowa.jpg';
import haftowaBabaUrlWebp from '../../../assets/images/workshops/haftowa.webp';
import haftowaBabaUrlAvif from '../../../assets/images/workshops/haftowa.avif';
import mock from '../../../assets/iconify/bigpretzel.svg';
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
};

export const WorkshopsConfig: WorkshopsEntry[] = [
  {
    topicKey: 'workshops.skein.title',
    time: 'XX:00 - XX:00',
    picture: {
      fallback: mock
      /*      sources: [
                                      {
                                        type: 'image/webp',
                                        url: haftowaBabaUrlWebp
                                      },
                                      {
                                        type: 'image/avif',
                                        url: haftowaBabaUrlAvif
                                      }
                                    ]*/
    },
    isSoldOut: false,
    room: 'conference',
    price: 250,
    ticketUrl: 'www.todo.com',
    description: 'workshops.skein.description',
    materials: 'workshops.skein.materials'
  },
  {
    topicKey: 'workshops.drutututu.title',
    time: 'XX:00 - XX:00',
    picture: {
      fallback: mock
      /*      sources: [
                          {
                            type: 'image/webp',
                            url: haftowaBabaUrlWebp
                          },
                          {
                            type: 'image/avif',
                            url: haftowaBabaUrlAvif
                          }
                        ]*/
    },
    isSoldOut: false,
    room: 'conference',
    price: 90,
    ticketUrl: 'www.todo.com',
    description: 'workshops.drutututu.description'
  },
  {
    topicKey: 'workshops.heartofcotton.title',
    time: 'XX:00 - XX:00',
    picture: {
      fallback: mock
      /*      sources: [
                                {
                                  type: 'image/webp',
                                  url: haftowaBabaUrlWebp
                                },
                                {
                                  type: 'image/avif',
                                  url: haftowaBabaUrlAvif
                                }
                              ]*/
    },
    isSoldOut: false,
    room: 'conference',
    price: 90,
    ticketUrl: 'www.todo.com',
    description: 'workshops.heartofcotton.description',
    materials: 'workshops.heartofcotton.materials'
  },
  {
    topicKey: 'workshops.edknitted.title',
    time: 'X:00 - X:00',
    picture: {
      fallback: mock
    },
    room: 'library',
    isSoldOut: false,
    price: 175,
    description: 'workshops.edknitted.description',
    ticketUrl: 'www.todo.com'
  },
  {
    topicKey: 'workshops.ludart.title',
    time: 'XX:00 - XX:00',
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
    room: 'bursa1',
    price: 100,
    isSoldOut: false,
    ticketUrl: 'www.todo.com',
    description: 'workshops.ludart.description',
    materials: 'workshops.ludart.materials'
  },
  {
    topicKey: 'workshops.haftowaBaba.title',
    time: 'XX:00 - XX:00',
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
    room: 'conference',
    price: 160,
    ticketUrl: 'www.todo.com',
    description: 'workshops.haftowaBaba.description',
    materials: 'workshops.haftowaBaba.materials'
  },
  {
    topicKey: 'workshops.knitolog.title',
    time: 'XX:00 - XX:30',
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
    isSoldOut: false,
    price: 170,
    ticketUrl: 'www.todo.com',
    description: 'workshops.knitolog.description',
    materials: 'workshops.knitolog.materials'
  },
  {
    topicKey: 'workshops.iwona.title',
    time: 'XX:00 - XX:00',
    picture: {
      fallback: mock
      /*      sources: [
        {
          type: 'image/webp',
          url: haftowaBabaUrlWebp
        },
        {
          type: 'image/avif',
          url: haftowaBabaUrlAvif
        }
      ]*/
    },
    isSoldOut: false,
    room: 'conference',
    price: 170,
    ticketUrl: 'www.todo.com',
    description: 'workshops.iwona.description',
    materials: 'workshops.iwona.materials'
  },
  {
    topicKey: 'workshops.kroopa.title',
    time: 'XX:00 - XX:00',
    picture: {
      fallback: mock
      /*      sources: [
              {
                type: 'image/webp',
                url: haftowaBabaUrlWebp
              },
              {
                type: 'image/avif',
                url: haftowaBabaUrlAvif
              }
            ]*/
    },
    isSoldOut: false,
    room: 'conference',
    price: 175,
    ticketUrl: 'www.todo.com',
    description: 'workshops.kroopa.description',
    materials: 'workshops.kroopa.materials'
  }
];
