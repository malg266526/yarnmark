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

export const VENDOR_APPLICATIONS_VIEW_MODES = ['cards', 'cascade', 'stands'] as const;

export type ApplicationsViewMode = (typeof VENDOR_APPLICATIONS_VIEW_MODES)[number];

export const DEFAULT_VENDOR_APPLICATIONS_VIEW_MODE: ApplicationsViewMode = 'cards';

export const VENDOR_APPLICATIONS_SORT_ORDERS = ['oldest', 'newest', 'name', 'demand'] as const;

export type VendorApplicationsSortOrder = (typeof VENDOR_APPLICATIONS_SORT_ORDERS)[number];

export const VENDOR_APPLICATIONS_FILTER_ALL = 'all';
