import type { PictureType } from '../components/Picture';

// Team faces assets
import ewaAvif from '../assets/team_and_partners/ewa_face.avif';
import ewaWebp from '../assets/team_and_partners/ewa_face.webp';
import ewaJpg from '../assets/team_and_partners/ewa_face.jpg';

import moniaAvif from '../assets/team_and_partners/monia_face.avif';
import moniaWebp from '../assets/team_and_partners/monia_face.webp';
import moniaJpg from '../assets/team_and_partners/monia_face.jpg';

import karoAvif from '../assets/team_and_partners/karo_face.avif';
import karoWebp from '../assets/team_and_partners/karo_face.webp';
import karoJpeg from '../assets/team_and_partners/karo_face.jpeg';

import malgoAvif from '../assets/team_and_partners/malgo_face.avif';
import malgoWebp from '../assets/team_and_partners/malgo_face.webp';
import malgoJpg from '../assets/team_and_partners/malgo_face.jpg';

import dagmaraAvif from '../assets/team_and_partners/dagmara_face.avif';
import dagmaraWebp from '../assets/team_and_partners/dagmara_face.webp';
import dagmaraJpg from '../assets/team_and_partners/dagmara_face.jpg';

import justynaAvif from '../assets/team_and_partners/justynka_face.avif';
import justynaWebp from '../assets/team_and_partners/justynka_face.webp';
import justynaJpg from '../assets/team_and_partners/justynka_face.jpg';

export type OrganizerSlug = 'ewa' | 'monia' | 'karo' | 'malgo' | 'dagmara' | 'justyna';

export const ORGANIZER_IMAGES: Record<OrganizerSlug, PictureType> = {
  ewa: {
    fallbackUrl: ewaJpg,
    sources: [
      { type: 'image/avif', url: ewaAvif },
      { type: 'image/webp', url: ewaWebp }
    ]
  },
  monia: {
    fallbackUrl: moniaJpg,
    sources: [
      { type: 'image/avif', url: moniaAvif },
      { type: 'image/webp', url: moniaWebp }
    ]
  },
  karo: {
    fallbackUrl: karoJpeg,
    sources: [
      { type: 'image/avif', url: karoAvif },
      { type: 'image/webp', url: karoWebp }
    ]
  },
  malgo: {
    fallbackUrl: malgoJpg,
    sources: [
      { type: 'image/avif', url: malgoAvif },
      { type: 'image/webp', url: malgoWebp }
    ]
  },
  dagmara: {
    fallbackUrl: dagmaraJpg,
    sources: [
      { type: 'image/avif', url: dagmaraAvif },
      { type: 'image/webp', url: dagmaraWebp }
    ]
  },
  justyna: {
    fallbackUrl: justynaJpg,
    sources: [
      { type: 'image/avif', url: justynaAvif },
      { type: 'image/webp', url: justynaWebp }
    ]
  }
};
