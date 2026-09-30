import assert from 'node:assert/strict';
import test from 'node:test';
import { groupPatternsByEdition } from '../patternsUtils.ts';

test('groupPatternsByEdition groups patterns by edition year in ascending order', () => {
  const patterns = [
    { id: 'c', editionYear: 2026 },
    { id: 'a', editionYear: 2025 },
    { id: 'b', editionYear: 2025 }
  ];

  assert.deepEqual(groupPatternsByEdition(patterns), [
    { year: 2025, patterns: [patterns[1], patterns[2]] },
    { year: 2026, patterns: [patterns[0]] }
  ]);
});

test('groupPatternsByEdition returns an empty list for no patterns', () => {
  assert.deepEqual(groupPatternsByEdition([]), []);
});
