import assert from 'node:assert/strict';
import test from 'node:test';
import { buildVendorMapAssignments } from '../utils/vendorMapAssignmentsUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

test('map assignments use saved stands only for stand-assigned applications', () => {
  const base = getBaseApplication();
  const assignments = buildVendorMapAssignments([
    ...(['pending', 'accepted', 'rejected', 'reserve-list'] as const).map((status) => ({
      ...base,
      id: status,
      status,
      assignedStands: ['S3']
    })),
    { ...base, id: 'assigned', status: 'stand-assigned', assignedStands: ['S1', 'M1', 'S1'], preferredStands: ['P1'] }
  ]);
  assert.deepEqual([...assignments.keys()], ['S1', 'M1']);
  assert.equal(assignments.get('S1')?.length, 1);
  assert.equal(assignments.get('M1')?.[0].applicationId, 'assigned');
});

test('map keeps every vendor on a shared stand and resolves uploaded and legacy logo sources', () => {
  const base = { ...getBaseApplication(), status: 'stand-assigned' as const, assignedStands: ['S1'] };
  const assignments = buildVendorMapAssignments([
    { ...base, id: 'one', logoUrl: 'https://example.com/logo.png', logoDataUrl: 'data:image/png;base64,local' },
    { ...base, id: 'two', logoUrl: null, logoDataUrl: 'data:image/png;base64,local' },
    { ...base, id: 'three', logoUrl: null, logoDataUrl: null }
  ]);
  assert.deepEqual(
    assignments.get('S1')?.map(({ applicationId, logoSource }) => ({ applicationId, logoSource })),
    [
      { applicationId: 'one', logoSource: 'https://example.com/logo.png' },
      { applicationId: 'two', logoSource: 'data:image/png;base64,local' },
      { applicationId: 'three', logoSource: null }
    ]
  );
});

test('removing an assignment or changing its status removes its map logo', () => {
  const application = { ...getBaseApplication(), status: 'stand-assigned' as const, assignedStands: ['S1'] };
  assert.equal(buildVendorMapAssignments([{ ...application, assignedStands: [] }]).size, 0);
  assert.equal(buildVendorMapAssignments([{ ...application, status: 'accepted' }]).size, 0);
  assert.equal(buildVendorMapAssignments([]).size, 0);
});
