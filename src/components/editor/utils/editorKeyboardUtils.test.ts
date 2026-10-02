import test from 'node:test';
import assert from 'node:assert/strict';
import { isEditableElement, isRemoveStandKey } from './editorKeyboardUtils.ts';

test('isEditableElement recognises form fields', () => {
  assert.equal(isEditableElement('INPUT'), true);
  assert.equal(isEditableElement('TEXTAREA'), true);
  assert.equal(isEditableElement('SELECT'), true);
});

test('isEditableElement recognises contenteditable hosts', () => {
  assert.equal(isEditableElement('DIV', true), true);
});

test('isEditableElement leaves plain elements alone', () => {
  assert.equal(isEditableElement('DIV'), false);
  assert.equal(isEditableElement('BUTTON'), false);
  assert.equal(isEditableElement(undefined), false);
});

test('isRemoveStandKey accepts Delete and Backspace only', () => {
  assert.equal(isRemoveStandKey('Delete'), true);
  assert.equal(isRemoveStandKey('Backspace'), true);
  assert.equal(isRemoveStandKey('Enter'), false);
  assert.equal(isRemoveStandKey('d'), false);
});
