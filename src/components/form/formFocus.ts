const FOCUSABLE_FIELD_SELECTOR = 'input, textarea, button, select, [tabindex]';

export const focusFirstInvalidField = (fieldAttribute: string, invalidFieldNames: string[]) => {
  const invalidFieldNameSet = new Set(invalidFieldNames);
  const firstInvalidField = Array.from(document.querySelectorAll<HTMLElement>(`[${fieldAttribute}]`)).find((field) =>
    invalidFieldNameSet.has(field.getAttribute(fieldAttribute) ?? '')
  );

  if (!firstInvalidField) {
    return;
  }

  firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const focusTarget = firstInvalidField.matches(FOCUSABLE_FIELD_SELECTOR)
    ? firstInvalidField
    : firstInvalidField.querySelector<HTMLElement>(FOCUSABLE_FIELD_SELECTOR);

  focusTarget?.focus({ preventScroll: true });
};
