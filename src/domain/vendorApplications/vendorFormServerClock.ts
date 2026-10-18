import {
  estimateServerNow,
  isVendorFormAvailable,
  parseServerDateHeader,
  type ServerClockSync
} from './vendorFormAvailabilityUtils.ts';
import { VENDOR_FORM_SERVER_CLOCK_URL } from './vendorFormConstants.ts';

let serverClockSync: ServerClockSync | undefined;

export const syncVendorFormServerClock = async (): Promise<void> => {
  const response = await fetch(`${VENDOR_FORM_SERVER_CLOCK_URL}?t=${Date.now()}`, { cache: 'no-store' });
  const syncedAtMonotonicMs = performance.now();
  const serverDateMs = parseServerDateHeader(response.headers.get('Date'));

  if (serverDateMs === undefined) {
    throw new Error('Missing server Date header');
  }

  serverClockSync = { serverDateMs, syncedAtMonotonicMs };
};

export const getVendorFormServerNow = (): number | undefined =>
  serverClockSync ? estimateServerNow(serverClockSync, performance.now()) : undefined;

export const isVendorFormOpenByServerClock = (): boolean => {
  const serverNow = getVendorFormServerNow();

  return serverNow !== undefined && isVendorFormAvailable(serverNow);
};
