import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHallStands } from './parseHallStands.ts';

const createFixedId = () => 'generated-id';

test('parseHallStands keeps stands saved by the editor, including their ids', () => {
  const stands = parseHallStands(
    [
      {
        id: 'abc',
        index: 'S1',
        type: 'standard',
        vendor: 'Lusia Knits',
        width: 3.5,
        height: 3,
        color: 'normal1',
        isHorizontal: true,
        start: { row: 0, col: 13 },
        end: { row: 5, col: 19 }
      }
    ],
    createFixedId
  );

  assert.deepEqual(stands, [
    {
      id: 'abc',
      index: 'S1',
      vendor: 'Lusia Knits',
      description: undefined,
      type: 'standard',
      width: 3.5,
      height: 3,
      color: 'normal1',
      isHorizontal: true,
      start: { row: 0, col: 13 },
      end: { row: 5, col: 19 }
    }
  ]);
});

test('parseHallStands accepts generated JSON with nulls and adds missing ids', () => {
  const stands = parseHallStands(
    [
      {
        index: 'M1',
        vendor: null,
        description: null,
        type: 'mini',
        color: null,
        width: null,
        height: null,
        isHorizontal: false,
        start: null,
        end: null
      }
    ],
    createFixedId
  );

  assert.equal(stands?.[0].id, 'generated-id');
  assert.equal(stands?.[0].vendor, undefined);
  assert.equal(stands?.[0].start, undefined);
});

test('parseHallStands returns null when the data is not a list of stands', () => {
  assert.equal(parseHallStands({ index: 'S1' }), null);
  assert.equal(parseHallStands([{ index: 'S1', type: 'unknown' }]), null);
});

const readDocsJson = (fileName: string): unknown =>
  JSON.parse(readFileSync(new URL(`../../../../docs/${fileName}`, import.meta.url), 'utf8'));

test('parseHallStands reads the 2026 hall snapshot', () => {
  assert.equal(parseHallStands(readDocsJson('hall-2026.json'))?.length, 52);
});

test('parseHallStands reads the 2027 hall proposal', () => {
  assert.equal(parseHallStands(readDocsJson('hall-2027-proposal.json'))?.length, 58);
});
