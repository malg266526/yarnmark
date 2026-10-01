import { getEditionTitleOptions, type FairEditionMode } from './edition/editionTitleUtils.ts';

export const FairEdition: {
  mode: FairEditionMode;
  upcomingEditionYear: number;
  upcomingEditionDate: Date;
  pastEditionYear: number;
} = {
  mode: 'dormant',
  upcomingEditionYear: 2027,
  upcomingEditionDate: new Date(2027, 3, 17),
  pastEditionYear: 2026
};

export const EDITION_TITLE_OPTIONS = getEditionTitleOptions(FairEdition.mode, FairEdition.pastEditionYear);
