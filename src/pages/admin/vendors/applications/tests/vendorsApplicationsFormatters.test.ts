import assert from 'node:assert/strict';
import test from 'node:test';
import { formatBoolean, formatDateTime, formatMainCategory } from '../utils/vendorsApplicationsFormatters.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const BOOLEAN_LABELS = {
  no: 'No',
  noAnswer: 'No answer',
  yes: 'Yes'
} as const;

test('formatBoolean returns no-answer label for null', () => {
  assert.equal(formatBoolean(null, BOOLEAN_LABELS), 'No answer');
});

test('formatBoolean returns yes/no labels for booleans', () => {
  assert.equal(formatBoolean(true, BOOLEAN_LABELS), 'Yes');
  assert.equal(formatBoolean(false, BOOLEAN_LABELS), 'No');
});

test('formatMainCategory returns translated category for standard values', () => {
  const application = getBaseApplication();

  assert.equal(
    formatMainCategory(application, (key) => `category:${key}`, 'Not provided'),
    'category:yarns'
  );
});

test('formatMainCategory returns custom value for other category', () => {
  const application = {
    ...getBaseApplication(),
    mainCategory: 'other' as const,
    mainCategoryOther: 'Buttons'
  };

  assert.equal(
    formatMainCategory(application, (key) => `category:${key}`, 'Not provided'),
    'Buttons'
  );
});

test('formatMainCategory falls back to not-provided label', () => {
  const missingCategoryApplication = {
    ...getBaseApplication(),
    mainCategory: null,
    mainCategoryOther: ''
  };
  const otherWithoutValueApplication = {
    ...getBaseApplication(),
    mainCategory: 'other' as const,
    mainCategoryOther: ''
  };

  assert.equal(
    formatMainCategory(missingCategoryApplication, (key) => `category:${key}`, 'Not provided'),
    'Not provided'
  );
  assert.equal(
    formatMainCategory(otherWithoutValueApplication, (key) => `category:${key}`, 'Not provided'),
    'Not provided'
  );
});

test('formatDateTime formats ISO timestamp for locale', () => {
  assert.equal(formatDateTime('2026-05-11T10:30:00.000Z', 'en-US'), 'May 11, 2026 at 12:30:00 PM');
});
