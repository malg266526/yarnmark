import test from 'node:test';
import assert from 'node:assert/strict';
import { collectWorkshopFormValidationErrors } from '../workshopFormSchema.ts';
import { INITIAL_WORKSHOP_FORM_STATE } from '../workshopFormTypes.ts';
import {
  WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH,
  WORKSHOP_FORM_HOST_DESCRIPTION_MAX_LENGTH
} from '../workshopFormConstants.ts';
import type { WorkshopFormState } from '../workshopFormTypes.ts';

const createValidWorkshopFormValues = (overrides: Partial<WorkshopFormState> = {}): WorkshopFormState => ({
  ...INITIAL_WORKSHOP_FORM_STATE,
  tutorName: 'Anna Kowalska',
  workshopTitle: 'Crochet basics',
  description: 'A short workshop description.',
  hostDescription: 'A short tutor description.',
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
    hostDescription: 'workshopsFormPage.validation.hostDescriptionRequired',
    minParticipants: 'workshopsFormPage.validation.minParticipantsRequired',
    maxParticipants: 'workshopsFormPage.validation.maxParticipantsRequired',
    experienceLevel: 'workshopsFormPage.validation.experienceLevelRequired',
    duration: 'workshopsFormPage.validation.durationRequired',
    participantsShouldBring: 'workshopsFormPage.validation.participantsShouldBringRequired',
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

test('collectWorkshopFormValidationErrors requires a host description and ignores whitespace-only input', () => {
  const errors = collectWorkshopFormValidationErrors(createValidWorkshopFormValues({ hostDescription: '   ' }));

  assert.equal(errors.hostDescription, 'workshopsFormPage.validation.hostDescriptionRequired');
});

test('collectWorkshopFormValidationErrors accepts a host description of exactly the max length', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ hostDescription: 'a'.repeat(WORKSHOP_FORM_HOST_DESCRIPTION_MAX_LENGTH) })
  );

  assert.equal(errors.hostDescription, undefined);
});

test('collectWorkshopFormValidationErrors rejects a host description over the max length', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ hostDescription: 'a'.repeat(WORKSHOP_FORM_HOST_DESCRIPTION_MAX_LENGTH + 1) })
  );

  assert.equal(errors.hostDescription, 'workshopsFormPage.validation.hostDescriptionTooLong');
});

test('WORKSHOP_FORM_HOST_DESCRIPTION_MAX_LENGTH matches the backend limit', () => {
  assert.equal(WORKSHOP_FORM_HOST_DESCRIPTION_MAX_LENGTH, 1200);
});

test('collectWorkshopFormValidationErrors treats the suggested max price as optional', () => {
  const errors = collectWorkshopFormValidationErrors(createValidWorkshopFormValues({ suggestedMaxPrice: null }));

  assert.equal(errors.suggestedMaxPrice, undefined);
});

test('collectWorkshopFormValidationErrors accepts a positive suggested max price', () => {
  const errors = collectWorkshopFormValidationErrors(createValidWorkshopFormValues({ suggestedMaxPrice: 79.99 }));

  assert.equal(errors.suggestedMaxPrice, undefined);
});

test('collectWorkshopFormValidationErrors rejects a zero or negative suggested max price', () => {
  for (const suggestedMaxPrice of [0, -5]) {
    const errors = collectWorkshopFormValidationErrors(createValidWorkshopFormValues({ suggestedMaxPrice }));

    assert.equal(errors.suggestedMaxPrice, 'workshopsFormPage.validation.suggestedMaxPriceInvalid');
  }
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

test('collectWorkshopFormValidationErrors accepts numeric fields submitted as numeric strings', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({
      minParticipants: '4' as unknown as number,
      maxParticipants: '10' as unknown as number,
      grossPricePerParticipant: '50' as unknown as number
    })
  );

  assert.deepEqual(errors, {});
});

test('collectWorkshopFormValidationErrors treats an empty numeric string as missing', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ minParticipants: '' as unknown as number })
  );

  assert.equal(errors.minParticipants, 'workshopsFormPage.validation.minParticipantsRequired');
});

test('collectWorkshopFormValidationErrors accepts empty room requirements and required equipment', () => {
  const errors = collectWorkshopFormValidationErrors(
    createValidWorkshopFormValues({ roomRequirements: '', requiredEquipment: '' })
  );

  assert.deepEqual(errors, {});
});
