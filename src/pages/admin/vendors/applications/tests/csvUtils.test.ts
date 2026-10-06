import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCsv } from '../utils/csvUtils.ts';

test('CSV preserves Polish characters, separators, quotes, newlines and empty cells', () => {
  assert.equal(
    buildCsv([
      ['Łódź; "Wełna"\nSklep', ''],
      ['Zażółć', 'tak']
    ]),
    '\uFEFF"Łódź; ""Wełna""\nSklep";""\r\n"Zażółć";"tak"'
  );
});

test('CSV neutralizes spreadsheet formulas, including leading whitespace and phone numbers', () => {
  for (const value of ['=1+1', '+48123', '-1', '@SUM(A1)', '  =1', '\t1', '\r1']) {
    assert.equal(buildCsv([[value]]), `\uFEFF"'${value}"`);
  }
});
