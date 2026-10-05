import { useState, useEffect } from 'react';
import { useAdminSession } from '../../../useAdminSession';
import {
  deleteVendorApplication,
  listVendorApplications,
  updateVendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorsApplicationsApi.ts';
import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const useVendorsApplications = () => {
  const { token, handleAdminApiError } = useAdminSession();
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [deletingApplicationId, setDeletingApplicationId] = useState<string | null>(null);
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
        handleAdminApiError(error);
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [token, handleAdminApiError]);

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
      handleAdminApiError(error);
    }
  };

  const deleteApplication = async (applicationId: string) => {
    setDeletingApplicationId(applicationId);

    try {
      await deleteVendorApplication(token, applicationId);
      setApplications((currentApplications) =>
        currentApplications.filter((application) => application.id !== applicationId)
      );
    } catch (error) {
      console.error('Vendor application could not be deleted', error);
      handleAdminApiError(error);
    } finally {
      setDeletingApplicationId(null);
    }
  };

  return { applications, deleteApplication, deletingApplicationId, loading, setApplicationStatus };
};
