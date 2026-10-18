import { VENDOR_FORM_OPENS_AT } from './vendorFormConstants.ts';

export const VENDOR_FORM_OPENS_AT_TIMESTAMP = Date.parse(VENDOR_FORM_OPENS_AT);

export interface ServerClockSync {
  serverDateMs: number;
  syncedAtMonotonicMs: number;
}

export const isVendorFormAvailable = (now: number): boolean => now >= VENDOR_FORM_OPENS_AT_TIMESTAMP;

export const parseServerDateHeader = (header: string | null): number | undefined => {
  const timestamp = header ? Date.parse(header) : Number.NaN;

  return Number.isNaN(timestamp) ? undefined : timestamp;
};

export const estimateServerNow = (sync: ServerClockSync, nowMonotonicMs: number): number =>
  sync.serverDateMs + Math.max(0, nowMonotonicMs - sync.syncedAtMonotonicMs);
