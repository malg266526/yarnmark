export type FairEditionMode = 'dormant' | 'active';

export const ARCHIVE_TITLE_CONTEXT = 'archive';

export type EditionTitleOptions = {
  context?: typeof ARCHIVE_TITLE_CONTEXT;
  year?: number;
};

export const getEditionTitleOptions = (mode: FairEditionMode, pastEditionYear: number): EditionTitleOptions =>
  mode === 'dormant' ? { context: ARCHIVE_TITLE_CONTEXT, year: pastEditionYear } : {};
