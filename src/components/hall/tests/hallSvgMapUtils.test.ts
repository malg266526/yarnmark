import assert from 'node:assert/strict';
import test from 'node:test';
import type { HallStand } from '../hallStands.ts';
import {
  applyAssignedStandVendors,
  fitHallSvgMapLabel,
  getHallSvgMapLayout,
  getHallSvgMapStandLabel,
  getHallSvgMapStandLayout,
  getHallSvgMapTooltipPosition,
  resolveHallSvgMapLogoUrl,
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

test('applyAssignedStandVendors puts the assigned vendor on the stand with the matching index', () => {
  const stands = [createStand({ index: 'P4' }), createStand({ index: 'S1', vendor: 'Static' })];
  const assignedVendors = new Map([
    ['P4', { storeName: 'Włóczykijki s.c.', logoUrl: 'https://example.com/logo.webp' }]
  ]);

  const [assigned, untouched] = applyAssignedStandVendors(stands, assignedVendors);

  assert.equal(assigned.vendor, 'Włóczykijki s.c.');
  assert.equal(assigned.vendorLogoUrl, 'https://example.com/logo.webp');
  assert.equal(untouched, stands[1]);
});

test('applyAssignedStandVendors drops a stale logo when the assigned vendor has none', () => {
  const [stand] = applyAssignedStandVendors(
    [createStand({ index: 'P4', vendor: 'Old', vendorLogoUrl: 'old.webp' })],
    new Map([['P4', { storeName: 'New', logoUrl: null }]])
  );

  assert.equal(stand.vendor, 'New');
  assert.equal(stand.vendorLogoUrl, undefined);
});

test('resolveHallSvgMapLogoUrl keeps absolute urls and resolves relative api paths', () => {
  assert.equal(resolveHallSvgMapLogoUrl('https://example.com/logo.webp'), 'https://example.com/logo.webp');
  assert.equal(resolveHallSvgMapLogoUrl('uploads/logo.webp'), 'https://yarnmark-api.com/uploads/logo.webp');
  assert.equal(resolveHallSvgMapLogoUrl(undefined), null);
});

test('getHallSvgMapStandLayout centres the index and a round logo for a stand with a vendor logo', () => {
  const layout = getHallSvgMapStandLayout(
    createStand({ index: 'P4', vendor: 'Włóczykijki s.c.', vendorLogoUrl: 'uploads/logo.webp' }),
    'pl'
  );
  const logo = layout.logo;

  assert.ok(logo);
  assert.equal(logo.href, 'https://yarnmark-api.com/uploads/logo.webp');
  assert.equal(logo.name, 'Włóczykijki s.c.');
  assert.equal(logo.index?.text, 'P4');
  assert.equal(logo.index?.fontSize, 13);
  assert.ok(Math.abs(logo.size - 0.7 * Math.min(91, 78 - 15)) < 1e-9);
  assert.ok(Math.abs(logo.x + logo.size / 2 - layout.centerX) < 1e-9);
  const top = (logo.index?.y ?? 0) - 13 * 0.8;
  assert.ok(Math.abs(top - layout.y - (layout.y + layout.height - (logo.y + logo.size))) < 1e-9);
  assert.equal(getHallSvgMapStandLayout(createStand({ vendor: 'Bez logo' }), 'pl').logo, null);
});

test('getHallSvgMapTooltipPosition points at the top of the anchor in the middle of the map', () => {
  const position = getHallSvgMapTooltipPosition({ top: 300, bottom: 360, centerX: 400 }, { width: 800, height: 1000 });

  assert.deepEqual(position, { leftPercent: 50, topPercent: 30, placement: 'above', align: 'center' });
});

test('getHallSvgMapTooltipPosition drops below an anchor near the map top and aligns to the map edges', () => {
  assert.deepEqual(getHallSvgMapTooltipPosition({ top: 25, bottom: 100, centerX: 100 }, { width: 800, height: 1000 }), {
    leftPercent: 12.5,
    topPercent: 10,
    placement: 'below',
    align: 'start'
  });
  assert.equal(
    getHallSvgMapTooltipPosition({ top: 500, bottom: 560, centerX: 700 }, { width: 800, height: 1000 }).align,
    'end'
  );
});
