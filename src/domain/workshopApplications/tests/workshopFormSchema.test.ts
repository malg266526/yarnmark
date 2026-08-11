import test from 'node:test';
import assert from 'node:assert/strict';
import { collectWorkshopFormValidationErrors } from '../workshopFormSchema.ts';
import { INITIAL_WORKSHOP_FORM_STATE } from '../workshopFormTypes.ts';
import { WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH } from '../workshopFormConstants.ts';

test('collectWorkshopFormValidationErrors returns multiple missing-field errors at once', () => {
  assert.deepEqual(collectWorkshopFormValidationErrors(INITIAL_WORKSHOP_FORM_STATE), {
    tutorName: 'workshopsFormPage.validation.tutorNameRequired',
    workshopTitle: 'workshopsFormPage.validation.workshopTitleRequired',
    description: 'workshopsFormPage.validation.descriptionRequired',
    phoneNumber: 'workshopsFormPage.validation.phoneRequired',
    email: 'workshopsFormPage.validation.emailRequired'
  });
});

test('collectWorkshopFormValidationErrors accepts a fully filled-in form', () => {
  assert.deepEqual(
    collectWorkshopFormValidationErrors({
      tutorName: 'Anna Kowalska',
      workshopTitle: 'Crochet basics',
      description: 'A short workshop description.',
      phoneNumber: '+48 123 456 789',
      email: 'tutor@example.com'
    }),
    {}
  );
});

test('collectWorkshopFormValidationErrors rejects an invalid phone and email', () => {
  const errors = collectWorkshopFormValidationErrors({
    tutorName: 'Anna Kowalska',
    workshopTitle: 'Crochet basics',
    description: 'A short workshop description.',
    phoneNumber: '123',
    email: 'not-an-email'
  });

  assert.equal(errors.phoneNumber, 'workshopsFormPage.validation.phoneInvalid');
  assert.equal(errors.email, 'workshopsFormPage.validation.emailInvalid');
});

test('collectWorkshopFormValidationErrors rejects a description over the max length', () => {
  const errors = collectWorkshopFormValidationErrors({
    tutorName: 'Anna Kowalska',
    workshopTitle: 'Crochet basics',
    description: 'a'.repeat(WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH + 1),
    phoneNumber: '+48 123 456 789',
    email: 'tutor@example.com'
  });

  assert.equal(errors.description, 'workshopsFormPage.validation.descriptionTooLong');
});
