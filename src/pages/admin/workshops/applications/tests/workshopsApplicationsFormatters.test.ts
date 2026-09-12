import assert from 'node:assert/strict';
import test from 'node:test';
import { formatDateTime, sortApplicationsBySubmittedAt } from '../utils/workshopsApplicationsFormatters.ts';
import type { WorkshopApplication } from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

const createApplication = (id: string, submittedAt: string): WorkshopApplication => ({
  id,
  status: 'new',
  submittedAt,
  tutorName: 'Anna Kowalska',
  workshopTitle: 'Crochet basics',
  description: 'A short workshop description.',
  minParticipants: 4,
  maxParticipants: 10,
  experienceLevel: 'beginner',
  duration: '3h',
  participantsShouldBring: 'Own crochet hook.',
  roomRequirements: 'Tables and power access.',
  requiredEquipment: 'Flipchart, monitor.',
  grossPricePerParticipant: 50,
  contractType: 'invoice',
  contractTypeOther: '',
  additionalInfo: '',
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  phoneNumber: '+48 123 456 789',
  email: 'tutor@example.com'
});

test('formatDateTime formats ISO timestamp for locale', () => {
  assert.equal(formatDateTime('2026-05-11T10:30:00.000Z', 'en-US'), 'May 11, 2026 at 12:30:00 PM');
});

test('sortApplicationsBySubmittedAt orders applications by earliest submission first', () => {
  const later = createApplication('application-2', '2026-05-12T10:30:00.000Z');
  const earlier = createApplication('application-1', '2026-05-11T10:30:00.000Z');

  assert.deepEqual(sortApplicationsBySubmittedAt([later, earlier]), [earlier, later]);
});
