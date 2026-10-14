import { useEffect, useState } from 'react';
import {
  isVendorFormAvailable,
  VENDOR_FORM_OPENS_AT_TIMESTAMP
} from '../../../../domain/vendorApplications/vendorFormAvailabilityUtils.ts';

const MAX_TIMEOUT_DELAY_MS = 2_147_483_647;

export const useVendorFormAvailability = (): boolean => {
  const [isAvailable, setIsAvailable] = useState(() => isVendorFormAvailable(Date.now()));

  useEffect(() => {
    let timeoutId: number | undefined;

    const updateAvailability = () => {
      window.clearTimeout(timeoutId);
      const now = Date.now();
      const available = isVendorFormAvailable(now);
      setIsAvailable(available);

      if (!available) {
        timeoutId = window.setTimeout(
          updateAvailability,
          Math.min(VENDOR_FORM_OPENS_AT_TIMESTAMP - now, MAX_TIMEOUT_DELAY_MS)
        );
      }
    };

    updateAvailability();
    window.addEventListener('focus', updateAvailability);
    document.addEventListener('visibilitychange', updateAvailability);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('focus', updateAvailability);
      document.removeEventListener('visibilitychange', updateAvailability);
    };
  }, []);

  return isAvailable;
};
