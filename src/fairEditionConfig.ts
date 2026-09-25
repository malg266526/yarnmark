import { getEditionTitleOptions, type FairEditionMode } from './edition/editionTitleUtils.ts';

export const FairEdition: {
  mode: FairEditionMode;
  upcomingEditionYear: number;
  pastEditionYear: number;
} = {
  mode: 'dormant',
  upcomingEditionYear: 2027,
  pastEditionYear: 2026
};

export const EDITION_TITLE_OPTIONS = getEditionTitleOptions(FairEdition.mode, FairEdition.pastEditionYear);
