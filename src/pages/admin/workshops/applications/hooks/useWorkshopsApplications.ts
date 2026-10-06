import { useState, useEffect } from 'react';
import { useAdminSession } from '../../../useAdminSession';
import {
  deleteWorkshopApplication,
  listWorkshopApplications,
  updateWorkshopApplicationSchedule,
  updateWorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopsApplicationsApi.ts';
import type {
  WorkshopApplication,
  WorkshopApplicationStatus,
  WorkshopSchedule
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export const useWorkshopsApplications = () => {
  const { token, handleAdminApiError } = useAdminSession();
  const [applications, setApplications] = useState<WorkshopApplication[]>([]);
  const [deletingApplicationId, setDeletingApplicationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingScheduleApplicationId, setSavingScheduleApplicationId] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    listWorkshopApplications(token)
      .then((fetchedApplications) => {
        if (isActive) {
          setApplications(fetchedApplications);
        }
      })
      .catch((error: unknown) => {
        console.error('Workshop applications could not be loaded', error);
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

  const setApplicationStatus = async (applicationId: string, status: WorkshopApplicationStatus) => {
    try {
      await updateWorkshopApplicationStatus(token, applicationId, status);
      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === applicationId ? { ...application, status } : application
        )
      );
    } catch (error) {
      console.error('Workshop application status could not be updated', error);
      handleAdminApiError(error);
    }
  };

  const deleteApplication = async (applicationId: string) => {
    setDeletingApplicationId(applicationId);

    try {
      await deleteWorkshopApplication(token, applicationId);
      setApplications((currentApplications) =>
        currentApplications.filter((application) => application.id !== applicationId)
      );
    } catch (error) {
      console.error('Workshop application could not be deleted', error);
      handleAdminApiError(error);
    } finally {
      setDeletingApplicationId(null);
    }
  };

  const setApplicationSchedule = async (applicationId: string, schedule: WorkshopSchedule | null) => {
    setSavingScheduleApplicationId(applicationId);

    try {
      await updateWorkshopApplicationSchedule(token, applicationId, schedule);
      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === applicationId ? { ...application, schedule } : application
        )
      );
    } catch (error) {
      console.error('Workshop application schedule could not be updated', error);
      handleAdminApiError(error);
    } finally {
      setSavingScheduleApplicationId(null);
    }
  };

  return {
    applications,
    deleteApplication,
    deletingApplicationId,
    loading,
    savingScheduleApplicationId,
    setApplicationSchedule,
    setApplicationStatus
  };
};
