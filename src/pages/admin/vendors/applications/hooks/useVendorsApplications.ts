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
import { VENDOR_APPLICATION_STATUS_UNDO_TIMEOUT_MS } from '../vendorsApplicationsConstants';

export interface VendorApplicationStatusChange {
  applicationId: string;
  previousStatus: VendorApplicationStatus;
  status: VendorApplicationStatus;
  storeName: string;
}

export const useVendorsApplications = () => {
  const { token, handleAdminApiError } = useAdminSession();
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [deletingApplicationId, setDeletingApplicationId] = useState<string | null>(null);
  const [savingStatusApplicationId, setSavingStatusApplicationId] = useState<string | null>(null);
  const [lastStatusChange, setLastStatusChange] = useState<VendorApplicationStatusChange | null>(null);
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

  useEffect(() => {
    if (!lastStatusChange) {
      return;
    }

    const timeoutId = window.setTimeout(() => setLastStatusChange(null), VENDOR_APPLICATION_STATUS_UNDO_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [lastStatusChange]);

  const saveApplicationStatus = async (application: VendorApplication, status: VendorApplicationStatus) => {
    const assignedStands = application.allocatedStandId ? [application.allocatedStandId] : [];

    setSavingStatusApplicationId(application.id);

    try {
      await updateVendorApplicationStatus(token, application.id, assignedStands, status);
      setApplications((currentApplications) =>
        currentApplications.map((currentApplication) =>
          currentApplication.id === application.id ? { ...currentApplication, status } : currentApplication
        )
      );

      return true;
    } catch (error) {
      console.error('Vendor application status could not be updated', error);
      handleAdminApiError(error);

      return false;
    } finally {
      setSavingStatusApplicationId(null);
    }
  };

  const setApplicationStatus = async (applicationId: string, status: VendorApplicationStatus) => {
    const application = applications.find(({ id }) => id === applicationId);

    if (!application || application.status === status) {
      return;
    }

    const isSaved = await saveApplicationStatus(application, status);

    if (isSaved) {
      setLastStatusChange({
        applicationId,
        previousStatus: application.status,
        status,
        storeName: application.storeName
      });
    }
  };

  const undoStatusChange = async () => {
    if (!lastStatusChange) {
      return;
    }

    const application = applications.find(({ id }) => id === lastStatusChange.applicationId);

    setLastStatusChange(null);

    if (application) {
      await saveApplicationStatus(application, lastStatusChange.previousStatus);
    }
  };

  const dismissStatusChange = () => setLastStatusChange(null);

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

  return {
    applications,
    deleteApplication,
    deletingApplicationId,
    dismissStatusChange,
    lastStatusChange,
    loading,
    savingStatusApplicationId,
    setApplicationStatus,
    undoStatusChange
  };
};
