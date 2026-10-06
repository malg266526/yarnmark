import type { WorkshopApplication } from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export type WorkshopApplicationWarning = 'missingContract' | 'roomCapacity' | 'roomCollision' | 'tutorCollision';

export interface WorkshopScheduleGrid {
  rooms: string[];
  startTimes: string[];
}

const normalizeComparableValue = (value: string) => value.trim().toLocaleLowerCase();

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const schedulesOverlap = (left: WorkshopApplication, right: WorkshopApplication) => {
  if (!left.schedule || !right.schedule || left.schedule.day !== right.schedule.day) {
    return false;
  }

  const leftStart = toMinutes(left.schedule.startTime);
  const rightStart = toMinutes(right.schedule.startTime);

  return (
    leftStart < rightStart + right.schedule.durationMinutes && rightStart < leftStart + left.schedule.durationMinutes
  );
};

export const buildWorkshopApplicationWarnings = (applications: WorkshopApplication[]) => {
  const warnings = new Map<string, WorkshopApplicationWarning[]>();

  for (const application of applications) {
    const applicationWarnings: WorkshopApplicationWarning[] = [];

    if (application.contractType === null) {
      applicationWarnings.push('missingContract');
    }

    if (
      application.schedule &&
      application.maxParticipants !== null &&
      application.maxParticipants > application.schedule.roomCapacity
    ) {
      applicationWarnings.push('roomCapacity');
    }

    const overlappingApplications = applications.filter(
      (candidate) => candidate.id !== application.id && schedulesOverlap(application, candidate)
    );

    if (
      application.schedule &&
      overlappingApplications.some(
        (candidate) =>
          candidate.schedule &&
          normalizeComparableValue(candidate.schedule.room) === normalizeComparableValue(application.schedule!.room)
      )
    ) {
      applicationWarnings.push('roomCollision');
    }

    if (
      overlappingApplications.some(
        (candidate) => normalizeComparableValue(candidate.tutorName) === normalizeComparableValue(application.tutorName)
      )
    ) {
      applicationWarnings.push('tutorCollision');
    }

    warnings.set(application.id, applicationWarnings);
  }

  return warnings;
};

export const buildWorkshopScheduleGrid = (
  applications: WorkshopApplication[],
  day: NonNullable<WorkshopApplication['schedule']>['day']
): WorkshopScheduleGrid => {
  const schedules = applications.flatMap((application) =>
    application.schedule?.day === day ? [application.schedule] : []
  );

  return {
    rooms: [...new Set(schedules.map(({ room }) => room))].sort((left, right) => left.localeCompare(right)),
    startTimes: [...new Set(schedules.map(({ startTime }) => startTime))].sort()
  };
};

export const formatWorkshopScheduleEndTime = (startTime: string, durationMinutes: number) => {
  const endMinutes = toMinutes(startTime) + durationMinutes;
  const hours = Math.floor(endMinutes / 60) % 24;
  const minutes = endMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
