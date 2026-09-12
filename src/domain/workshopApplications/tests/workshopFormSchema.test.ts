import test from 'node:test';
import assert from 'node:assert/strict';
import { collectWorkshopFormValidationErrors } from '../workshopFormSchema.ts';
import { INITIAL_WORKSHOP_FORM_STATE } from '../workshopFormTypes.ts';
import { WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH } from '../workshopFormConstants.ts';
import type { WorkshopFormState } from '../workshopFormTypes.ts';

const createValidWorkshopFormValues = (overrides: Partial<WorkshopFormState> = {}): WorkshopFormState => ({
  ...INITIAL_WORKSHOP_FORM_STATE,
  tutorName: 'Anna Kowalska',
  workshopTitle: 'Crochet basics',
  description: 'A short workshop description.',
  minParticipants: 4,
  maxParticipants: 10,
  experienceLevel: 'beginner',
  duration: '3h',
  participantsShouldBring: 'Own crochet hook.',
  roomRequirements: 'Tables and power access.',
  grossPricePerParticipant: 50,
  contractType: 'invoice',
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  phoneNumber: '+48 123 456 789',
  email: 'tutor@example.com',
  ...overrides
});

test('collectWorkshopFormValidationErrors returns multiple missing-field errors at once', () => {
  assert.deepEqual(collectWorkshopFormValidationErrors(INITIAL_WORKSHOP_FORM_STATE), {
    tutorName: 'workshopsFormPage.validation.tutorNameRequired',
    workshopTitle: 'workshopsFormPage.validation.workshopTitleRequired',
    description: 'workshopsFormPage.validation.descriptionRequired',
    minParticipants: 'workshopsFormPage.validation.minParticipantsRequired',
    maxParticipants: 'workshopsFormPage.validation.maxParticipantsRequired',
    experienceLevel: 'workshopsFormPage.validation.experienceLevelRequired',
    duration: 'workshopsFormPage.validation.durationRequired',
    participantsShouldBring: 'workshopsFormPage.validation.participantsShouldBringRequired',
    roomRequirements: 'workshopsFormPage.validation.roomRequirementsRequired',
    grossPricePerParticipant: 'workshopsFormPage.validation.grossPricePerParticipantRequired',
    contractType: 'workshopsFormPage.validation.contractTypeRequired',
    logoFileName: 'workshopsFormPage.validation.logoRequired',
    phoneNumber: 'workshopsFormPage.validation.phoneRequired',
    email: 'workshopsFormPage.validation.emailRequired'
  });
});

test('collectWorkshopFormValidationErrors accepts a fully filled-in form', () => {
  assert.deepEqual(collectWorkshopFormValidationErrors(createValidWorkshopFormValues()), {});
});

test('collectWorkshopFormValidationErrors rejects an invalid phone and email', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ phoneNumber: '123', email: 'not-an-email' })
  );

  assert.equal(errors.phoneNumber, 'workshopsFormPage.validation.phoneInvalid');
  assert.equal(errors.email, 'workshopsFormPage.validation.emailInvalid');
});

test('collectWorkshopFormValidationErrors rejects a description over the max length', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ description: 'a'.repeat(WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH + 1) })
  );

  assert.equal(errors.description, 'workshopsFormPage.validation.descriptionTooLong');
});

test('collectWorkshopFormValidationErrors rejects a maximum lower than the minimum participants', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ minParticipants: 10, maxParticipants: 5 })
  );

  assert.equal(errors.maxParticipants, 'workshopsFormPage.validation.maxParticipantsTooSmall');
});

test('collectWorkshopFormValidationErrors requires the contract type details when "other" is selected', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ contractType: 'other', contractTypeOther: '' })
  );

  assert.equal(errors.contractTypeOther, 'workshopsFormPage.validation.contractTypeOtherRequired');
});
