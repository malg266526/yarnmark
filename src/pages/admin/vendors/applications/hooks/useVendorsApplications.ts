import { useState, useEffect, useRef } from 'react';
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
import {
  VENDOR_APPLICATION_STATUS_UNDO_TIMEOUT_MS,
  VENDOR_APPLICATIONS_POLL_INTERVAL_MS
} from '../vendorsApplicationsConstants';
import { normalizeStandIds } from '../../../../../domain/vendorApplications/vendorFormStandIds.ts';
import { findNewVendorApplicationIds } from '../utils/newVendorApplicationsUtils';
import { useNewVendorSoundSetting } from '../../../settings/hooks/useNewVendorSoundSetting';
import { useNewVendorSoundVariantSetting } from '../../../settings/hooks/useNewVendorSoundVariantSetting';
import { playNewVendorSound } from '../../../settings/newVendorSoundPlayer';

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
  const [savingStandApplicationId, setSavingStandApplicationId] = useState<string | null>(null);
  const [lastStatusChange, setLastStatusChange] = useState<VendorApplicationStatusChange | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const knownApplicationIdsRef = useRef<ReadonlySet<string> | null>(null);
  const [isNewVendorSoundEnabled] = useNewVendorSoundSetting();
  const [newVendorSoundVariant] = useNewVendorSoundVariantSetting();
  const isNewVendorSoundEnabledRef = useRef(isNewVendorSoundEnabled);
  const newVendorSoundVariantRef = useRef(newVendorSoundVariant);

  useEffect(() => {
    isNewVendorSoundEnabledRef.current = isNewVendorSoundEnabled;
    newVendorSoundVariantRef.current = newVendorSoundVariant;
  }, [isNewVendorSoundEnabled, newVendorSoundVariant]);

  useEffect(() => {
    let isActive = true;

    const loadApplications = () =>
      listVendorApplications(token)
        .then((fetchedApplications) => {
          if (!isActive) {
            return;
          }

          const knownApplicationIds = knownApplicationIdsRef.current;

          if (
            isNewVendorSoundEnabledRef.current &&
            knownApplicationIds &&
            findNewVendorApplicationIds(knownApplicationIds, fetchedApplications).length > 0
          ) {
            void playNewVendorSound(newVendorSoundVariantRef.current);
          }

          knownApplicationIdsRef.current = new Set(fetchedApplications.map(({ id }) => id));
          setApplications(fetchedApplications);
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

    void loadApplications();

    const intervalId = window.setInterval(loadApplications, VENDOR_APPLICATIONS_POLL_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
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
    setSavingStatusApplicationId(application.id);

    try {
      await updateVendorApplicationStatus(
        token,
        application.id,
        application.assignedStands,
        status,
        application.preferredStandGroups
      );
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

  const assignStands = async (applicationId: string, standIds: string[]) => {
    const application = applications.find(({ id }) => id === applicationId);

    if (!application) {
      return;
    }

    const assignedStands = normalizeStandIds(standIds);

    setSavingStandApplicationId(applicationId);

    try {
      await updateVendorApplicationStatus(
        token,
        applicationId,
        assignedStands,
        application.status,
        application.preferredStandGroups
      );
      setApplications((currentApplications) =>
        currentApplications.map((currentApplication) =>
          currentApplication.id === applicationId ? { ...currentApplication, assignedStands } : currentApplication
        )
      );
    } catch (error) {
      console.error('Vendor application stand could not be assigned', error);
      handleAdminApiError(error);
    } finally {
      setSavingStandApplicationId(null);
    }
  };

  const acceptStand = async (applicationId: string, standId: string) => {
    const application = applications.find(({ id }) => id === applicationId);

    if (!application) {
      return;
    }

    const assignedStands = normalizeStandIds([...application.assignedStands, standId]);
    const status: VendorApplicationStatus = 'stand-assigned';

    setSavingStandApplicationId(applicationId);

    try {
      await updateVendorApplicationStatus(
        token,
        applicationId,
        assignedStands,
        status,
        application.preferredStandGroups
      );
      setApplications((currentApplications) =>
        currentApplications.map((currentApplication) =>
          currentApplication.id === applicationId
            ? { ...currentApplication, assignedStands, status }
            : currentApplication
        )
      );

      if (application.status !== status) {
        setLastStatusChange({
          applicationId,
          previousStatus: application.status,
          status,
          storeName: application.storeName
        });
      }
    } catch (error) {
      console.error('Vendor application stand could not be accepted', error);
      handleAdminApiError(error);
    } finally {
      setSavingStandApplicationId(null);
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
    acceptStand,
    applications,
    assignStands,
    deleteApplication,
    deletingApplicationId,
    dismissStatusChange,
    lastStatusChange,
    loading,
    savingStandApplicationId,
    savingStatusApplicationId,
    setApplicationStatus,
    undoStatusChange
  };
};
