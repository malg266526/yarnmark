import assert from 'node:assert/strict';
import test from 'node:test';
import { VENDOR_APPLICATION_STATUS_ORDER } from '../vendorsApplicationsConstants.ts';

test('status order is stable for admin controls', () => {
  assert.deepEqual(VENDOR_APPLICATION_STATUS_ORDER, ['new', 'considered', 'accepted', 'reserve']);
});
