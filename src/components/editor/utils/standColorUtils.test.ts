import test from 'node:test';
import assert from 'node:assert/strict';
import type { StandProps } from '../StandProps.ts';
import { getSuggestedStandColor, isCustomStandIndex } from './standColorUtils.ts';

const createStand = (overrides: Partial<StandProps>): StandProps => ({
  id: overrides.index ?? 'id',
  index: 'S1',
  type: 'standard',
  ...overrides
});

test('isCustomStandIndex recognises C stands regardless of case and whitespace', () => {
  assert.equal(isCustomStandIndex('C1'), true);
  assert.equal(isCustomStandIndex(' c12'), true);
  assert.equal(isCustomStandIndex('S1'), false);
  assert.equal(isCustomStandIndex(''), false);
});

test('getSuggestedStandColor gives C stands their own color', () => {
  assert.equal(getSuggestedStandColor({ index: 'c3', type: 'standard' }, []), 'normal3');
  assert.equal(getSuggestedStandColor({ index: 'C4', type: 'mini' }, []), 'normal3');
});

test('getSuggestedStandColor starts with the first shade when no stand of the type exists', () => {
  assert.equal(getSuggestedStandColor({ index: 'S1', type: 'standard' }, []), 'normal1');
  assert.equal(getSuggestedStandColor({ index: 'M1', type: 'mini' }, []), 'small1');
});

test('getSuggestedStandColor alternates shades based on the last stand of the same type', () => {
  const stands = [
    createStand({ index: 'S1', type: 'standard', color: 'normal1' }),
    createStand({ index: 'M1', type: 'mini', color: 'small1' }),
    createStand({ index: 'S2', type: 'standard', color: 'normal2' }),
    createStand({ index: 'C1', type: 'standard', color: 'normal3' })
  ];

  assert.equal(getSuggestedStandColor({ index: 'S3', type: 'standard' }, stands), 'normal1');
  assert.equal(getSuggestedStandColor({ index: 'M2', type: 'mini' }, stands), 'small2');
});

test('getSuggestedStandColor keeps single-color types unchanged', () => {
  const stands = [createStand({ index: 'P1', type: 'premium', color: 'premium' })];

  assert.equal(getSuggestedStandColor({ index: 'P2', type: 'premium' }, stands), 'premium');
  assert.equal(getSuggestedStandColor({ index: 'a1', type: 'other' }, stands), 'taken');
});
