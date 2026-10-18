import { useEffect, useState } from 'react';
import {
  isVendorFormAvailable,
  VENDOR_FORM_OPENS_AT_TIMESTAMP
} from '../../../../domain/vendorApplications/vendorFormAvailabilityUtils.ts';
import { VENDOR_FORM_SERVER_CLOCK_RETRY_MS } from '../../../../domain/vendorApplications/vendorFormConstants.ts';
import {
  getVendorFormServerNow,
  isVendorFormOpenByServerClock,
  syncVendorFormServerClock
} from '../../../../domain/vendorApplications/vendorFormServerClock.ts';
import { hasVerifiedVendorFormAdminAccess, verifyVendorFormAdminAccess } from '../vendorFormAdminAccess';

const MAX_TIMEOUT_DELAY_MS = 2_147_483_647;

export const useVendorFormAvailability = (): boolean => {
  const [isAvailable, setIsAvailable] = useState(
    () => hasVerifiedVendorFormAdminAccess() || isVendorFormOpenByServerClock()
  );

  useEffect(() => {
    let timeoutId: number | undefined;
    let isOpen = false;
    let isDisposed = false;

    const updateAvailability = () => {
      window.clearTimeout(timeoutId);
      const serverNow = getVendorFormServerNow();

      if (serverNow === undefined) {
        timeoutId = window.setTimeout(resyncAndUpdate, VENDOR_FORM_SERVER_CLOCK_RETRY_MS);
        return;
      }

      isOpen = isVendorFormAvailable(serverNow);
      setIsAvailable(isOpen);

      if (!isOpen) {
        timeoutId = window.setTimeout(
          updateAvailability,
          Math.min(VENDOR_FORM_OPENS_AT_TIMESTAMP - serverNow, MAX_TIMEOUT_DELAY_MS)
        );
      }
    };

    const unlockForAdmin = (isAdmin: boolean) => {
      if (isAdmin && !isDisposed) {
        isOpen = true;
        window.clearTimeout(timeoutId);
        setIsAvailable(true);
      }
    };

    const resyncAndUpdate = () => {
      if (isOpen) {
        return;
      }

      void verifyVendorFormAdminAccess().then(unlockForAdmin);
      syncVendorFormServerClock()
        .catch(() => undefined)
        .finally(() => {
          if (!isDisposed && !isOpen) {
            updateAvailability();
          }
        });
    };

    resyncAndUpdate();
    window.addEventListener('focus', resyncAndUpdate);
    document.addEventListener('visibilitychange', resyncAndUpdate);

    return () => {
      isDisposed = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener('focus', resyncAndUpdate);
      document.removeEventListener('visibilitychange', resyncAndUpdate);
    };
  }, []);

  return isAvailable;
};
