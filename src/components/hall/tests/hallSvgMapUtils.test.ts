import assert from 'node:assert/strict';
import test from 'node:test';
import type { HallStand } from '../hallStands.ts';
import {
  fitHallSvgMapLabel,
  getHallSvgMapLayout,
  getHallSvgMapStandLabel,
  getHallSvgMapStandLayout,
  wrapHallSvgMapLabel
} from '../hallSvgMapUtils.ts';

const createStand = (overrides: Partial<HallStand>): HallStand => ({
  id: 'stand-id',
  index: 'S1',
  type: 'standard',
  color: 'normal1',
  width: 3.5,
  height: 3,
  isHorizontal: true,
  start: { row: 0, col: 0 },
  end: { row: 5, col: 6 },
  ...overrides
});

test('getHallSvgMapStandLabel picks the language part of a bilingual description', () => {
  const stand = { description: 'Wejście / Entrance' };

  assert.equal(getHallSvgMapStandLabel(stand, 'pl'), 'Wejście');
  assert.equal(getHallSvgMapStandLabel(stand, 'en'), 'Entrance');
  assert.equal(getHallSvgMapStandLabel(stand, 'en-GB'), 'Entrance');
});

test('getHallSvgMapStandLabel falls back to the only part and prefers the vendor', () => {
  assert.equal(getHallSvgMapStandLabel({ description: 'do socjalnego' }, 'en'), 'do socjalnego');
  assert.equal(getHallSvgMapStandLabel({ vendor: 'Biferno', description: 'x / y' }, 'pl'), 'Biferno');
  assert.equal(getHallSvgMapStandLabel({}, 'pl'), '');
});

test('wrapHallSvgMapLabel keeps short text on one line and wraps long text by words', () => {
  assert.deepEqual(wrapHallSvgMapLabel('', 89, 13), []);
  assert.deepEqual(wrapHallSvgMapLabel('Biferno', 89, 13), ['Biferno']);
  assert.deepEqual(wrapHallSvgMapLabel('Luka Ceramika & Paciorkowce i Wisielce', 89, 13), [
    'Luka',
    'Ceramika &',
    'Paciorkowce',
    'i Wisielce'
  ]);
});

test('fitHallSvgMapLabel shrinks the font until the label fits the stand', () => {
  assert.deepEqual(fitHallSvgMapLabel('Tulinki', true, 52, 78), { fontSize: 13, lines: ['Tulinki'] });
  assert.deepEqual(fitHallSvgMapLabel('Wydawnictwo RM', true, 52, 78), {
    fontSize: 8.2,
    lines: ['Wydawnictwo', 'RM']
  });
});

test('getHallSvgMapStandLayout reproduces the 2026 map geometry', () => {
  const layout = getHallSvgMapStandLayout(
    createStand({
      index: 'S4',
      color: 'normal2',
      vendor: 'Luka Ceramika & Paciorkowce i Wisielce',
      start: { row: 0, col: 34 },
      end: { row: 5, col: 40 }
    }),
    'pl'
  );

  assert.equal(layout.x, 467);
  assert.equal(layout.y, 25);
  assert.equal(layout.width, 91);
  assert.equal(layout.height, 78);
  assert.equal(layout.centerX, 512.5);
  assert.equal(layout.fill, '#deeadb');
  assert.equal(layout.index?.text, 'S4');
  assert.ok(Math.abs((layout.index?.y ?? 0) - 41.9) < 1e-9);
  assert.ok(Math.abs((layout.label?.y ?? 0) - 54.9) < 1e-9);
  assert.equal(layout.label?.lines.length, 4);
});

test('getHallSvgMapStandLayout centres a lone index and hides it for technical areas', () => {
  const emptyStand = getHallSvgMapStandLayout(createStand({}), 'pl');

  assert.equal(emptyStand.label, null);
  assert.ok(Math.abs((emptyStand.index?.y ?? 0) - (25 + (78 - 13) / 2 + 13 * 0.8)) < 1e-9);

  const entrance = getHallSvgMapStandLayout(
    createStand({ index: 'a1', type: 'other', color: 'tech', description: 'Wejście / Entrance' }),
    'pl'
  );

  assert.equal(entrance.index, null);
  assert.deepEqual(entrance.label?.lines, ['Wejście']);
  assert.equal(entrance.fill, '#f2f4f2');
});

test('getHallSvgMapLayout sizes the map to the whole hall grid', () => {
  const layout = getHallSvgMapLayout([createStand({})], 'pl');

  assert.equal(layout.width, 52 * 13 + 50);
  assert.equal(layout.height, 92 * 13 + 50);
  assert.equal(layout.stands.length, 1);
});
