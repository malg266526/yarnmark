import type { VendorApplicationStatus } from '../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type { VendorFormMainCategory } from '../../../../domain/vendorApplications/vendorFormTypes.ts';

export const VENDOR_APPLICATION_STATUS_ORDER: VendorApplicationStatus[] = [
  'pending',
  'rejected',
  'reserve-list',
  'accepted',
  'stand-assigned'
];

export const VENDOR_APPLICATION_MAIN_CATEGORY_ORDER: NonNullable<VendorFormMainCategory>[] = [
  'yarns',
  'accessories',
  'ceramics',
  'candles',
  'other'
];

export const VENDOR_APPLICATIONS_VIEW_MODES = ['rows', 'split', 'cards', 'map', 'cascade', 'stands'] as const;

export type ApplicationsViewMode = (typeof VENDOR_APPLICATIONS_VIEW_MODES)[number];

export const DEFAULT_VENDOR_APPLICATIONS_VIEW_MODE: ApplicationsViewMode = 'rows';

export const VENDOR_APPLICATIONS_LIST_VIEW_MODES: ApplicationsViewMode[] = ['rows', 'split', 'cards'];

export const VENDOR_APPLICATIONS_MAP_MULTIPLIER = 10;

export const VENDOR_APPLICATIONS_MAP_PHONE_MULTIPLIER = 7;

export const VENDOR_APPLICATIONS_SPLIT_MAP_MULTIPLIER = 7;

export const VENDOR_APPLICATIONS_SORT_ORDERS = ['oldest', 'newest', 'name', 'demand'] as const;

export type VendorApplicationsSortOrder = (typeof VENDOR_APPLICATIONS_SORT_ORDERS)[number];

export const VENDOR_APPLICATIONS_FILTER_ALL = 'all';
