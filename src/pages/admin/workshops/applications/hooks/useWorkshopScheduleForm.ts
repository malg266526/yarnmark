import { useEffect, useState, type FormEvent } from 'react';
import type {
  WorkshopApplication,
  WorkshopSchedule,
  WorkshopScheduleDay
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

const DEFAULT_DURATION_MINUTES = 180;
const DEFAULT_ROOM_CAPACITY = 10;

export const useWorkshopScheduleForm = (
  application: WorkshopApplication | null,
  setApplicationSchedule: (applicationId: string, schedule: WorkshopSchedule | null) => Promise<void>
) => {
  const [day, setDay] = useState<WorkshopScheduleDay>('saturday');
  const [durationMinutes, setDurationMinutes] = useState(DEFAULT_DURATION_MINUTES);
  const [room, setRoom] = useState('');
  const [roomCapacity, setRoomCapacity] = useState(DEFAULT_ROOM_CAPACITY);
  const [startTime, setStartTime] = useState('09:00');

  useEffect(() => {
    setDay(application?.schedule?.day ?? 'saturday');
    setDurationMinutes(application?.schedule?.durationMinutes ?? DEFAULT_DURATION_MINUTES);
    setRoom(application?.schedule?.room ?? '');
    setRoomCapacity(application?.schedule?.roomCapacity ?? DEFAULT_ROOM_CAPACITY);
    setStartTime(application?.schedule?.startTime ?? '09:00');
  }, [application]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!application || !room.trim() || durationMinutes <= 0 || roomCapacity <= 0) {
      return;
    }

    void setApplicationSchedule(application.id, {
      day,
      durationMinutes,
      room: room.trim(),
      roomCapacity,
      startTime
    });
  };

  return {
    day,
    durationMinutes,
    remove: () => application && void setApplicationSchedule(application.id, null),
    room,
    roomCapacity,
    setDay,
    setDurationMinutes,
    setRoom,
    setRoomCapacity,
    setStartTime,
    startTime,
    submit
  };
};
