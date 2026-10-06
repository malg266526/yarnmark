import React from 'react';
import type {
  WorkshopApplication,
  WorkshopScheduleDay
} from '../../../../../domain/workshopApplications/workshopFormSubmission';
import {
  ScheduleCard,
  ScheduleCardMeta,
  ScheduleCell,
  ScheduleDaySection,
  ScheduleDayTitle,
  ScheduleGrid,
  ScheduleGridHeader,
  ScheduleTimeCell
} from '../WorkshopsApplicationsPage.styled';
import {
  buildWorkshopScheduleGrid,
  formatWorkshopScheduleEndTime,
  type WorkshopApplicationWarning
} from '../utils/workshopScheduleUtils';

interface WorkshopsScheduleViewProps {
  applications: WorkshopApplication[];
  openApplication: (applicationId: string) => void;
  translate: (translationKey: string, options?: Record<string, unknown>) => string;
  warningsByApplicationId: Map<string, WorkshopApplicationWarning[]>;
}

const DAYS: WorkshopScheduleDay[] = ['saturday', 'sunday'];

export const WorkshopsScheduleView = ({
  applications,
  openApplication,
  translate,
  warningsByApplicationId
}: WorkshopsScheduleViewProps) => {
  const scheduledApplications = applications.filter(({ schedule }) => schedule !== null);

  if (scheduledApplications.length === 0) {
    return <ScheduleDaySection>{translate('workshopsApplicationsPage.schedule.empty')}</ScheduleDaySection>;
  }

  return (
    <>
      {DAYS.map((day) => {
        const dayApplications = scheduledApplications.filter(({ schedule }) => schedule?.day === day);
        const grid = buildWorkshopScheduleGrid(dayApplications, day);

        if (dayApplications.length === 0) {
          return null;
        }

        return (
          <ScheduleDaySection key={day}>
            <ScheduleDayTitle>{translate(`workshopsApplicationsPage.schedule.days.${day}`)}</ScheduleDayTitle>
            <ScheduleGrid $columns={grid.rooms.length + 1}>
              <ScheduleGridHeader />
              {grid.rooms.map((room) => (
                <ScheduleGridHeader key={room}>{room}</ScheduleGridHeader>
              ))}
              {grid.startTimes.flatMap((startTime) => [
                <ScheduleTimeCell key={`${startTime}-time`}>{startTime}</ScheduleTimeCell>,
                ...grid.rooms.map((room) => {
                  const cellApplications = dayApplications.filter(
                    (application) => application.schedule?.startTime === startTime && application.schedule.room === room
                  );

                  return (
                    <ScheduleCell key={`${startTime}-${room}`}>
                      {cellApplications.map((application) => {
                        const schedule = application.schedule!;
                        const hasCollision = (warningsByApplicationId.get(application.id) ?? []).some((warning) =>
                          ['roomCollision', 'tutorCollision'].includes(warning)
                        );

                        return (
                          <ScheduleCard
                            key={application.id}
                            type="button"
                            $hasCollision={hasCollision}
                            onClick={() => openApplication(application.id)}
                          >
                            {application.workshopTitle}
                            <ScheduleCardMeta>{application.tutorName}</ScheduleCardMeta>
                            <ScheduleCardMeta>
                              {schedule.startTime}–
                              {formatWorkshopScheduleEndTime(schedule.startTime, schedule.durationMinutes)} ·{' '}
                              {schedule.roomCapacity}
                            </ScheduleCardMeta>
                          </ScheduleCard>
                        );
                      })}
                    </ScheduleCell>
                  );
                })
              ])}
            </ScheduleGrid>
          </ScheduleDaySection>
        );
      })}
    </>
  );
};
