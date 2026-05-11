import { useState, useEffect } from 'react';
import { listVendorApplications } from '../vendors-form/vendorsApplicationsStorage';
import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';

export const useVendorsApplications = () => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    void listVendorApplications().then((response) => {
      setApplications(response.applications);
      setLoading(false);
    });
  }, []);

  return { applications, loading };
};
