import assert from 'node:assert/strict';
import test from 'node:test';
import { findEditionMarkers } from '../editionCheckUtils.ts';

const FILE_PATH = 'src/translations/pl.tsx';

test('findEditionMarkers finds years, full dates and short dates', () => {
  const content = [
    "title: 'Informacje dla wystawców 2026',",
    "deadline: 'Termin mija <strong>16.11.2025</strong>',",
    "onlineDeadline: 'Bilety online do 16.04, do godz. 18:00.'"
  ].join('\n');

  assert.deepEqual(
    findEditionMarkers(FILE_PATH, content, []).map(({ line, match }) => ({ line, match })),
    [
      { line: 1, match: '2026' },
      { line: 2, match: '16.11.2025' },
      { line: 3, match: '16.04' }
    ]
  );
});

test('findEditionMarkers ignores decimals, times and comment lines', () => {
  const content = [
    'line-height: 1.5;',
    'transform: scale(1.02);',
    "premiumSize: '3 × 5.5 m',",
    'background: linear-gradient(180deg, #FFF 78.04%, #F3F2F2 91.01%);',
    "time: '18:00',",
    "// when: '26/04/2025r w godz. 10:00',",
    '{/*<OldPrice size="sm">2025</OldPrice>*/}'
  ].join('\n');

  assert.deepEqual(findEditionMarkers(FILE_PATH, content, []), []);
});

test('findEditionMarkers skips allowlisted lines only in the matching file', () => {
  const content = "bio: 'Tka od 2004 roku'";
  const allowlist = [{ filePath: FILE_PATH, contains: 'Tka od 2004 roku', reason: 'bio' }];

  assert.deepEqual(findEditionMarkers(FILE_PATH, content, allowlist), []);
  assert.equal(findEditionMarkers('src/translations/en.tsx', content, allowlist).length, 1);
});
