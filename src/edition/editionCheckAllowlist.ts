import type { EditionCheckAllowlistEntry } from './editionCheckUtils.ts';

export const EDITION_CHECK_ALLOWLIST: EditionCheckAllowlistEntry[] = [
  { filePath: 'src/translations/pl.tsx', contains: 'Tka od 2004 roku', reason: 'Biografia prowadzącej warsztaty' },
  { filePath: 'src/translations/en.tsx', contains: 'Tka od 2004 roku', reason: 'Biografia prowadzącej warsztaty' },
  { filePath: 'src/translations/pl.tsx', contains: 'Od 2016 roku', reason: 'Biografia prowadzącej warsztaty' },
  { filePath: 'src/translations/en.tsx', contains: 'Od 2016 roku', reason: 'Biografia prowadzącej warsztaty' }
];
