import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNewsletterSubscribers } from '../../../../domain/newsletter/newsletterApi.ts';

test('parseNewsletterSubscribers reads a plain array of records', () => {
  assert.deepEqual(parseNewsletterSubscribers([{ email: 'a@domena.pl', createdAt: '2026-10-13T10:00:00.000Z' }]), [
    { email: 'a@domena.pl' }
  ]);
});

test('parseNewsletterSubscribers unwraps a subscribers envelope', () => {
  assert.deepEqual(parseNewsletterSubscribers({ subscribers: [{ email: 'a@domena.pl' }] }), [{ email: 'a@domena.pl' }]);
});

test('parseNewsletterSubscribers skips records without a usable email', () => {
  assert.deepEqual(parseNewsletterSubscribers([{ email: '' }, { createdAt: '2026-10-13' }, { email: 'a@domena.pl' }]), [
    { email: 'a@domena.pl' }
  ]);
});

test('parseNewsletterSubscribers unwraps the backend subscriptions response', () => {
  assert.deepEqual(
    parseNewsletterSubscribers({
      subscriptions: [
        {
          id: '63586f74-7d84-463d-9d5e-33878dc59bc9',
          email: 'malgtylek@gmail.com',
          status: 'pending',
          createdAt: '2026-10-13 11:44:47'
        }
      ]
    }),
    [{ id: '63586f74-7d84-463d-9d5e-33878dc59bc9', email: 'malgtylek@gmail.com', status: 'pending' }]
  );
});

test('parseNewsletterSubscribers accepts an empty subscriptions list', () => {
  assert.deepEqual(parseNewsletterSubscribers({ subscriptions: [] }), []);
});

test('parseNewsletterSubscribers rejects an unexpected payload', () => {
  assert.throws(() => parseNewsletterSubscribers(null));
  assert.throws(() => parseNewsletterSubscribers({ unexpected: true }));
});
