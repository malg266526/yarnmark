import { useState, useEffect } from 'react';
import { useAdminSession } from '../../../useAdminSession';
import {
  listVendorApplications,
  updateVendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorsApplicationsApi.ts';
import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const useVendorsApplications = () => {
  const { token } = useAdminSession();
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isActive = true;

    listVendorApplications(token)
      .then((fetchedApplications) => {
        if (isActive) {
          setApplications(fetchedApplications);
        }
      })
      .catch((error: unknown) => {
        console.error('Vendor applications could not be loaded', error);
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [token]);

  const setApplicationStatus = async (applicationId: string, status: VendorApplicationStatus) => {
    try {
      await updateVendorApplicationStatus(token, applicationId, status);
      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === applicationId ? { ...application, status } : application
        )
      );
    } catch (error) {
      console.error('Vendor application status could not be updated', error);
    }
  };

  return { applications, loading, setApplicationStatus };
};
