import assert from 'node:assert/strict';
import test from 'node:test';
import { findNewVendorApplicationIds } from '../utils/newVendorApplicationsUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const withId = (id: string) => ({ ...getBaseApplication(), id });

test('findNewVendorApplicationIds returns only applications that were not known before', () => {
  assert.deepEqual(
    findNewVendorApplicationIds(new Set(['a', 'b']), [withId('a'), withId('c'), withId('b'), withId('d')]),
    ['c', 'd']
  );
});

test('findNewVendorApplicationIds returns nothing when an application was only removed', () => {
  assert.deepEqual(findNewVendorApplicationIds(new Set(['a', 'b']), [withId('a')]), []);
});
