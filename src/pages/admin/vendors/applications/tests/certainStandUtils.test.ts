import test from 'node:test';
import assert from 'node:assert/strict';
import { countCertainStandsByApplication, getCertainStandProposals } from '../utils/certainStandUtils.ts';
import { getBaseApplication, withPreferredStands } from './vendorApplicationFixture.ts';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

const createApplication = (application: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  ...application
});

test('getCertainStandProposals returns stands wanted by exactly one vendor', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', storeName: 'Alfa', ...withPreferredStands(['S1', 'S2']) }),
    createApplication({ id: 'b', storeName: 'Beta', ...withPreferredStands(['S2', 'S3']) })
  ]);

  assert.deepEqual(
    proposals.map(({ standId, storeName }) => [standId, storeName]),
    [
      ['S1', 'Alfa'],
      ['S3', 'Beta']
    ]
  );
});

test('getCertainStandProposals reports which choice the stand was for that vendor', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', ...withPreferredStands(['S1', 'S2', 'S3']) })
  ]);

  assert.deepEqual(
    proposals.map(({ standId, choicePosition }) => [standId, choicePosition]),
    [
      ['S1', 1],
      ['S2', 2],
      ['S3', 3]
    ]
  );
});

test('getCertainStandProposals ignores rejected applications when counting rivals', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', storeName: 'Alfa', ...withPreferredStands(['S1']) }),
    createApplication({ id: 'b', storeName: 'Beta', ...withPreferredStands(['S1']), status: 'rejected' })
  ]);

  assert.deepEqual(
    proposals.map(({ standId, storeName }) => [standId, storeName]),
    [['S1', 'Alfa']]
  );
});

test('getCertainStandProposals ignores vendors that already hold a stand', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', storeName: 'Alfa', ...withPreferredStands(['S5']) }),
    createApplication({ id: 'b', storeName: 'Beta', ...withPreferredStands(['S5']), assignedStands: ['M1'] })
  ]);

  assert.deepEqual(
    proposals.map(({ standId, storeName }) => [standId, storeName]),
    [['S5', 'Alfa']]
  );
});

test('getCertainStandProposals skips stands that are already assigned to someone', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', ...withPreferredStands(['S1', 'S2']) }),
    createApplication({ id: 'b', ...withPreferredStands([]), assignedStands: ['S1'] })
  ]);

  assert.deepEqual(
    proposals.map(({ standId }) => standId),
    ['S2']
  );
});

test('getCertainStandProposals counts a stand once per vendor even when listed twice', () => {
  const proposals = getCertainStandProposals([createApplication({ id: 'a', ...withPreferredStands(['S1', 'S1']) })]);

  assert.deepEqual(
    proposals.map(({ standId, choicePosition }) => [standId, choicePosition]),
    [['S1', 1]]
  );
});

test('getCertainStandProposals leaves out stands with more than one candidate', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', ...withPreferredStands(['S1']) }),
    createApplication({ id: 'b', ...withPreferredStands(['S1']) })
  ]);

  assert.deepEqual(proposals, []);
});

test('getCertainStandProposals sorts stands in human order', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', ...withPreferredStands(['S10', 'S2', 'P1']) })
  ]);

  assert.deepEqual(
    proposals.map(({ standId }) => standId),
    ['P1', 'S2', 'S10']
  );
});

test('countCertainStandsByApplication reports vendors that are the only candidate several times', () => {
  const proposals = getCertainStandProposals([
    createApplication({ id: 'a', ...withPreferredStands(['S1', 'S2']) }),
    createApplication({ id: 'b', ...withPreferredStands(['S3']) })
  ]);

  const counts = countCertainStandsByApplication(proposals);

  assert.equal(counts.get('a'), 2);
  assert.equal(counts.get('b'), 1);
});
