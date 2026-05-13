import { useState, useEffect } from 'react';
import { listVendorApplications, updateVendorApplicationStatus } from './vendorsApplicationsStorage';
import type { VendorApplication, VendorApplicationStatus } from '../vendors-form/vendorsFormSubmission';

export const useVendorsApplications = () => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    void listVendorApplications().then((response) => {
      setApplications(response.applications);
      setLoading(false);
    });
  }, []);

  const setApplicationStatus = async (applicationId: string, status: VendorApplicationStatus) => {
    const response = await updateVendorApplicationStatus(applicationId, status);
    setApplications(response.applications);
  };

  return { applications, loading, setApplicationStatus };
};
