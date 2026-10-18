import assert from 'node:assert/strict';
import test from 'node:test';
import { getEnclosingHallStandBox } from '../hallStandBox.ts';

test('getEnclosingHallStandBox spans every given stand box', () => {
  assert.deepEqual(
    getEnclosingHallStandBox([
      { left: 10, top: 0, width: 20, height: 30 },
      { left: 30, top: 5, width: 20, height: 30 }
    ]),
    { left: 10, top: 0, width: 40, height: 35 }
  );
});
