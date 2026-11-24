import assert from 'node:assert/strict';
import test from 'node:test';
import { getTooltipAlignInViewport } from '../tooltipUtils.ts';

test('getTooltipAlignInViewport centres the tooltip when it fits in the viewport', () => {
  assert.equal(getTooltipAlignInViewport(195, 390, 220), 'center');
});

test('getTooltipAlignInViewport aligns the tooltip to the viewport edge it would cross', () => {
  assert.equal(getTooltipAlignInViewport(75, 390, 220), 'start');
  assert.equal(getTooltipAlignInViewport(315, 390, 220), 'end');
});
