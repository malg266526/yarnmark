import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildWorkshopApplicationWarnings,
  buildWorkshopScheduleGrid,
  formatWorkshopScheduleEndTime
} from '../utils/workshopScheduleUtils.ts';
import { createWorkshopApplicationFixture } from './workshopApplicationFixture.ts';

test('warnings detect capacity, room and tutor collisions', () => {
  const first = createWorkshopApplicationFixture({
    maxParticipants: 14,
    schedule: { day: 'saturday', durationMinutes: 120, room: 'Sala A', roomCapacity: 10, startTime: '09:00' }
  });
  const second = createWorkshopApplicationFixture({
    id: 'application-2',
    schedule: { day: 'saturday', durationMinutes: 60, room: ' sala a ', roomCapacity: 20, startTime: '10:30' },
    tutorName: ' ANNA KOWALSKA '
  });
  const warnings = buildWorkshopApplicationWarnings([first, second]);

  assert.deepEqual(warnings.get(first.id), ['roomCapacity', 'roomCollision', 'tutorCollision']);
  assert.deepEqual(warnings.get(second.id), ['roomCollision', 'tutorCollision']);
});

test('warnings report a missing settlement contract without false time collisions', () => {
  const first = createWorkshopApplicationFixture({ contractType: null });
  const second = createWorkshopApplicationFixture({
    id: 'application-2',
    schedule: { day: 'sunday', durationMinutes: 60, room: 'Sala A', roomCapacity: 20, startTime: '09:00' }
  });

  assert.deepEqual(buildWorkshopApplicationWarnings([first, second]).get(first.id), ['missingContract']);
});

test('schedule grid lists unique rooms and start times for a day', () => {
  const applications = [
    createWorkshopApplicationFixture({
      schedule: { day: 'saturday', durationMinutes: 60, room: 'Sala B', roomCapacity: 10, startTime: '11:00' }
    }),
    createWorkshopApplicationFixture({
      id: 'application-2',
      schedule: { day: 'saturday', durationMinutes: 90, room: 'Sala A', roomCapacity: 12, startTime: '09:30' }
    })
  ];

  assert.deepEqual(buildWorkshopScheduleGrid(applications, 'saturday'), {
    rooms: ['Sala A', 'Sala B'],
    startTimes: ['09:30', '11:00']
  });
  assert.equal(formatWorkshopScheduleEndTime('23:30', 60), '00:30');
});
