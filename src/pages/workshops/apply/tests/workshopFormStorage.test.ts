import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmptyWorkshopFormDraft, parseStoredWorkshopFormDraft } from '../workshopFormStorage.ts';
import { INITIAL_WORKSHOP_FORM_STATE } from '../../../../domain/workshopApplications/workshopFormTypes.ts';

const createValidWorkshopFormState = () => ({
  ...INITIAL_WORKSHOP_FORM_STATE,
  tutorName: 'Anna Kowalska',
  workshopTitle: 'Crochet basics',
  description: 'A short workshop description.',
  minParticipants: 4,
  maxParticipants: 10,
  experienceLevel: 'beginner' as const,
  duration: '3h',
  participantsShouldBring: 'Own crochet hook.',
  roomRequirements: 'Tables and power access.',
  grossPricePerParticipant: 50,
  contractType: 'invoice' as const,
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  phoneNumber: '+48 123 456 789',
  email: 'tutor@example.com'
});

test('parseStoredWorkshopFormDraft returns null for invalid payload', () => {
  assert.equal(parseStoredWorkshopFormDraft(null), null);
  assert.equal(parseStoredWorkshopFormDraft('not-json'), null);
  assert.equal(parseStoredWorkshopFormDraft(JSON.stringify({ foo: 'bar' })), null);
});

test('parseStoredWorkshopFormDraft restores a valid payload', () => {
  const draft = {
    formData: createValidWorkshopFormState(),
    isComplete: true
  };

  assert.deepEqual(parseStoredWorkshopFormDraft(JSON.stringify(draft)), draft);
});

test('parseStoredWorkshopFormDraft rejects a payload missing a required field', () => {
  const draft = {
    formData: {
      tutorName: 'Anna Kowalska',
      workshopTitle: 'Crochet basics',
      phoneNumber: '+48 123 456 789',
      email: 'tutor@example.com'
    },
    isComplete: true
  };

  assert.equal(parseStoredWorkshopFormDraft(JSON.stringify(draft)), null);
});

test('createEmptyWorkshopFormDraft returns empty initial state', () => {
  assert.deepEqual(createEmptyWorkshopFormDraft(), {
    formData: INITIAL_WORKSHOP_FORM_STATE,
    isComplete: false
  });
});
