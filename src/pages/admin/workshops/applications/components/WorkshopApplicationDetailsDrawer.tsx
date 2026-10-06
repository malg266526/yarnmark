import React from 'react';
import {
  ApplicationDrawer,
  ApplicationDrawerBody,
  ApplicationDrawerCloseButton,
  ApplicationDrawerHeader,
  ApplicationsMeta,
  ApplicationTitle,
  DRAWER_OVERLAY_STYLE,
  ScheduleForm,
  ScheduleFormActions,
  ScheduleFormField,
  ScheduleFormInput,
  ScheduleFormLabel,
  ScheduleFormSelect,
  ScheduleFormTitle,
  ScheduleSaveButton
} from '../WorkshopsApplicationsPage.styled';
import { formatDateTime } from '../utils/workshopsApplicationsFormatters';
import { useWorkshopScheduleForm } from '../hooks/useWorkshopScheduleForm';
import { WorkshopApplicationDetailsView } from './WorkshopApplicationDetailsView';
import type { WorkshopApplicationDetailsDrawerProps } from './workshopsApplicationsViewContracts';

export const WorkshopApplicationDetailsDrawer = ({
  application,
  closeApplication,
  deleteApplication,
  deletingApplicationId,
  locale,
  savingSchedule,
  setApplicationSchedule,
  setApplicationStatus,
  translate,
  warnings
}: WorkshopApplicationDetailsDrawerProps) => {
  const scheduleForm = useWorkshopScheduleForm(application, setApplicationSchedule);

  return (
    <ApplicationDrawer
      isOpen={application !== null}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      contentLabel={translate('workshopsApplicationsPage.drawer.label', {
        name: application?.workshopTitle ?? ''
      })}
      style={DRAWER_OVERLAY_STYLE}
      onRequestClose={closeApplication}
    >
      {application ? (
        <>
          <ApplicationDrawerHeader>
            <div>
              <ApplicationTitle>{application.workshopTitle}</ApplicationTitle>
              <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
            </div>
            <ApplicationDrawerCloseButton type="button" onClick={closeApplication}>
              {translate('workshopsApplicationsPage.drawer.close')}
            </ApplicationDrawerCloseButton>
          </ApplicationDrawerHeader>
          <ApplicationDrawerBody>
            <ScheduleForm onSubmit={scheduleForm.submit}>
              <ScheduleFormTitle>{translate('workshopsApplicationsPage.schedule.formTitle')}</ScheduleFormTitle>
              <ScheduleFormField>
                <ScheduleFormLabel htmlFor="workshop-schedule-day">
                  {translate('workshopsApplicationsPage.schedule.day')}
                </ScheduleFormLabel>
                <ScheduleFormSelect
                  id="workshop-schedule-day"
                  value={scheduleForm.day}
                  onChange={(event) => scheduleForm.setDay(event.target.value as 'saturday' | 'sunday')}
                >
                  <option value="saturday">{translate('workshopsApplicationsPage.schedule.days.saturday')}</option>
                  <option value="sunday">{translate('workshopsApplicationsPage.schedule.days.sunday')}</option>
                </ScheduleFormSelect>
              </ScheduleFormField>
              <ScheduleFormField>
                <ScheduleFormLabel htmlFor="workshop-schedule-time">
                  {translate('workshopsApplicationsPage.schedule.startTime')}
                </ScheduleFormLabel>
                <ScheduleFormInput
                  id="workshop-schedule-time"
                  required
                  type="time"
                  value={scheduleForm.startTime}
                  onChange={(event) => scheduleForm.setStartTime(event.target.value)}
                />
              </ScheduleFormField>
              <ScheduleFormField>
                <ScheduleFormLabel htmlFor="workshop-schedule-duration">
                  {translate('workshopsApplicationsPage.schedule.durationMinutes')}
                </ScheduleFormLabel>
                <ScheduleFormInput
                  id="workshop-schedule-duration"
                  min="1"
                  required
                  type="number"
                  value={scheduleForm.durationMinutes}
                  onChange={(event) => scheduleForm.setDurationMinutes(Number(event.target.value))}
                />
              </ScheduleFormField>
              <ScheduleFormField>
                <ScheduleFormLabel htmlFor="workshop-schedule-room">
                  {translate('workshopsApplicationsPage.schedule.room')}
                </ScheduleFormLabel>
                <ScheduleFormInput
                  id="workshop-schedule-room"
                  required
                  value={scheduleForm.room}
                  onChange={(event) => scheduleForm.setRoom(event.target.value)}
                />
              </ScheduleFormField>
              <ScheduleFormField>
                <ScheduleFormLabel htmlFor="workshop-schedule-capacity">
                  {translate('workshopsApplicationsPage.schedule.roomCapacity')}
                </ScheduleFormLabel>
                <ScheduleFormInput
                  id="workshop-schedule-capacity"
                  min="1"
                  required
                  type="number"
                  value={scheduleForm.roomCapacity}
                  onChange={(event) => scheduleForm.setRoomCapacity(Number(event.target.value))}
                />
              </ScheduleFormField>
              <ScheduleFormActions>
                <ScheduleSaveButton type="submit" disabled={savingSchedule}>
                  {savingSchedule
                    ? translate('workshopsApplicationsPage.schedule.saving')
                    : translate('workshopsApplicationsPage.schedule.save')}
                </ScheduleSaveButton>
                {application.schedule ? (
                  <ScheduleSaveButton type="button" disabled={savingSchedule} onClick={scheduleForm.remove}>
                    {translate('workshopsApplicationsPage.schedule.remove')}
                  </ScheduleSaveButton>
                ) : null}
              </ScheduleFormActions>
            </ScheduleForm>
            <WorkshopApplicationDetailsView
              application={application}
              deleteApplication={deleteApplication}
              deletingApplicationId={deletingApplicationId}
              setApplicationStatus={setApplicationStatus}
              translate={translate}
              warnings={warnings}
            />
          </ApplicationDrawerBody>
        </>
      ) : null}
    </ApplicationDrawer>
  );
};
