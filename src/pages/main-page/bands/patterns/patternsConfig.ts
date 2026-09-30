import type { UnprefixedTranslationKeys } from '../../../../translations/useTypedTranslation';

type PatternAuthor = {
  labelKey: UnprefixedTranslationKeys;
  instagram?: { handle: string; url: string };
};

export type YarnmarkPattern = {
  id: string;
  editionYear: number;
  titleKey: UnprefixedTranslationKeys;
  ravelryUrl?: string;
  author: PatternAuthor;
};

export const YARNMARK_PATTERNS: YarnmarkPattern[] = [
  {
    id: 'naPoleTee',
    editionYear: 2025,
    titleKey: 'patternsBand.patterns.naPoleTee.title',
    ravelryUrl: 'https://www.ravelry.com/patterns/library/na-pole-tee',
    author: {
      labelKey: 'patternsBand.authorship.monikaPrefix',
      instagram: { handle: '@made_me_knit', url: 'https://www.instagram.com/made_me_knit/' }
    }
  },
  {
    id: 'atropa',
    editionYear: 2025,
    titleKey: 'patternsBand.patterns.atropa.title',
    ravelryUrl: 'https://www.ravelry.com/patterns/library/atropa-2',
    author: {
      labelKey: 'patternsBand.authorship.annaPrefix',
      instagram: { handle: '@moracraft.handmade', url: 'https://www.instagram.com/moracraft.handmade/' }
    }
  },
  {
    id: 'laGruGru',
    editionYear: 2026,
    titleKey: 'patternsBand.patterns.laGruGru.title',
    author: {
      labelKey: 'patternsBand.authorship.sisHomemade',
      instagram: { handle: '@sishomemd', url: 'https://www.instagram.com/sishomemd/' }
    }
  }
];
