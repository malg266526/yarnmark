const EDITABLE_TAG_NAMES = ['INPUT', 'TEXTAREA', 'SELECT'];

export const REMOVE_STAND_KEYS = ['Delete', 'Backspace'];

export const isEditableElement = (tagName: string | undefined, isContentEditable = false) =>
  isContentEditable || (tagName !== undefined && EDITABLE_TAG_NAMES.includes(tagName));

export const isRemoveStandKey = (key: string) => REMOVE_STAND_KEYS.includes(key);
