import assert from 'node:assert/strict';
import test from 'node:test';
import { getVendorLogos } from '../assignedStandVendorsUtils.ts';

test('getVendorLogos lists each vendor logo once, sorted by store name', () => {
  const logos = getVendorLogos(
    new Map([
      ['S3', { storeName: 'KOKONKI', logoUrl: 'https://api/kokonki.webp' }],
      ['S4', { storeName: 'KOKONKI', logoUrl: 'https://api/kokonki.webp' }],
      ['P4', { storeName: 'Włóczykijki s.c.', logoUrl: 'https://api/wloczykijki.webp' }],
      ['M1', { storeName: 'Okkistore ', logoUrl: 'https://api/okki.png' }],
      ['S1', { storeName: 'animotki', logoUrl: 'https://api/animotki.webp' }]
    ])
  );

  assert.deepEqual(
    logos.map(({ storeName }) => storeName),
    ['animotki', 'KOKONKI', 'Okkistore', 'Włóczykijki s.c.']
  );
});

test('getVendorLogos skips vendors without a logo', () => {
  assert.deepEqual(getVendorLogos(new Map([['S1', { storeName: 'Bez logo', logoUrl: null }]])), []);
});
