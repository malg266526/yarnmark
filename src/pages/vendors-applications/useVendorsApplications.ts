import { useState, useEffect } from 'react';
import { listVendorApplications } from '../vendors-form/vendorsApplicationsStorage';
import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';

export const useVendorsApplications = () => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await listVendorApplications();
        setApplications(response.applications);
      } catch (err) {
        setError('Failed to load applications.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return { applications, loading, error };
};
