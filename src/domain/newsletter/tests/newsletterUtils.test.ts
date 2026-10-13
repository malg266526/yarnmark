import test from 'node:test';
import assert from 'node:assert/strict';
import { NEWSLETTER_VALIDATION_KEYS, normalizeNewsletterEmail, validateNewsletterEmail } from '../newsletterUtils.ts';

test('validateNewsletterEmail requires an address', () => {
  assert.equal(validateNewsletterEmail(''), NEWSLETTER_VALIDATION_KEYS.emailRequired);
  assert.equal(validateNewsletterEmail('   '), NEWSLETTER_VALIDATION_KEYS.emailRequired);
});

test('validateNewsletterEmail rejects a malformed address', () => {
  assert.equal(validateNewsletterEmail('wystawca'), NEWSLETTER_VALIDATION_KEYS.emailInvalid);
  assert.equal(validateNewsletterEmail('wystawca@'), NEWSLETTER_VALIDATION_KEYS.emailInvalid);
  assert.equal(validateNewsletterEmail('wystawca@domena'), NEWSLETTER_VALIDATION_KEYS.emailInvalid);
});

test('validateNewsletterEmail accepts a valid address, also when padded with spaces', () => {
  assert.equal(validateNewsletterEmail('wystawca@domena.pl'), null);
  assert.equal(validateNewsletterEmail('  wystawca@domena.pl  '), null);
});

test('normalizeNewsletterEmail trims surrounding whitespace', () => {
  assert.equal(normalizeNewsletterEmail('  wystawca@domena.pl '), 'wystawca@domena.pl');
});
