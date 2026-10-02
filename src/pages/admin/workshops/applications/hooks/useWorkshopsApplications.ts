import { useState, useEffect } from 'react';
import { useAdminSession } from '../../../useAdminSession';
import {
  listWorkshopApplications,
  updateWorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopsApplicationsApi.ts';
import type {
  WorkshopApplication,
  WorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export const useWorkshopsApplications = () => {
  const { token, handleAdminApiError } = useAdminSession();
  const [applications, setApplications] = useState<WorkshopApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [token]);

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

  return { applications, loading, setApplicationStatus };
};
