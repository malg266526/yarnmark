import assert from 'node:assert/strict';
import test from 'node:test';
import { WORKSHOP_APPLICATION_STATUS_ORDER } from '../workshopsApplicationsConstants.ts';

test('status order is stable for admin controls', () => {
  assert.deepEqual(WORKSHOP_APPLICATION_STATUS_ORDER, ['new', 'considered', 'accepted', 'reserve']);
});
