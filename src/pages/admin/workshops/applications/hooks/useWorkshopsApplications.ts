import { useState, useEffect } from 'react';
import {
  listWorkshopApplications,
  updateWorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopsApplicationsStorage';
import type {
  WorkshopApplication,
  WorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export const useWorkshopsApplications = () => {
  const [applications, setApplications] = useState<WorkshopApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    void listWorkshopApplications().then((response) => {
      setApplications(response.applications);
      setLoading(false);
    });
  }, []);

  const setApplicationStatus = async (applicationId: string, status: WorkshopApplicationStatus) => {
    const response = await updateWorkshopApplicationStatus(applicationId, status);
    setApplications(response.applications);
  };

  return { applications, loading, setApplicationStatus };
};
