import type { PictureType } from '../../../../components/Picture';
import type { UnprefixedTranslationKeys } from '../../../../translations/useTypedTranslation';

import grupoweAvifSrc from '../../../../assets/napole/grupowe.avif';
import grupoweWebpSrc from '../../../../assets/napole/grupowe.webp';
import grupoweJpgSrc from '../../../../assets/napole/grupowe.jpeg';
import laGruGruJpgSrc from '../../../../assets/images/lagrugru/DSC04493.jpg';
import laGruGruWebpSrc from '../../../../assets/images/lagrugru/DSC04493.webp';
import laGruGruAvifSrc from '../../../../assets/images/lagrugru/DSC04493.avif';

export type EditionPhoto = {
  picture: PictureType;
  ratio: number;
  altKey: UnprefixedTranslationKeys;
};

const toPicture = (jpg: string, webp: string, avif: string): PictureType => ({
  fallbackUrl: jpg,
  sources: [
    { type: 'image/avif', url: avif },
    { type: 'image/webp', url: webp }
  ]
});

export const EDITION_PHOTOS: Record<number, EditionPhoto> = {
  2025: {
    picture: toPicture(grupoweJpgSrc, grupoweWebpSrc, grupoweAvifSrc),
    ratio: 2016 / 908,
    altKey: 'patternsBand.groupPhotoAlt'
  },
  2026: {
    picture: toPicture(laGruGruJpgSrc, laGruGruWebpSrc, laGruGruAvifSrc),
    ratio: 5748 / 3114,
    altKey: 'patternsBand.laGruGruAlt'
  }
};
