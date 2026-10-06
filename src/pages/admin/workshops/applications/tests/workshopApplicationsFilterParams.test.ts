import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildWorkshopApplicationsSearchParams,
  parseWorkshopApplicationsFilters,
  parseWorkshopApplicationsOpenId,
  parseWorkshopApplicationsViewMode
} from '../utils/workshopApplicationsFilterParams.ts';
import { DEFAULT_WORKSHOP_APPLICATIONS_FILTERS } from '../utils/workshopApplicationsFilterUtils.ts';

test('workshop application params use defaults for missing and invalid values', () => {
  const params = new URLSearchParams('view=invalid&status=invalid&level=invalid&sort=invalid');

  assert.equal(parseWorkshopApplicationsViewMode(params), 'rows');
  assert.deepEqual(parseWorkshopApplicationsFilters(params), DEFAULT_WORKSHOP_APPLICATIONS_FILTERS);
  assert.equal(parseWorkshopApplicationsOpenId(params), null);
});

test('workshop application params round-trip non-default state and omit defaults', () => {
  const filters = {
    level: 'advanced' as const,
    search: '  haft ',
    sortOrder: 'tutor' as const,
    status: 'accepted' as const
  };
  const params = buildWorkshopApplicationsSearchParams(filters, 'cards', 'application-2');

  assert.equal(
    params.toString(),
    'view=cards&q=++haft+&status=accepted&level=advanced&sort=tutor&application=application-2'
  );
  assert.deepEqual(parseWorkshopApplicationsFilters(params), filters);
  assert.equal(parseWorkshopApplicationsViewMode(params), 'cards');
  assert.equal(parseWorkshopApplicationsOpenId(params), 'application-2');
  assert.equal(
    buildWorkshopApplicationsSearchParams(DEFAULT_WORKSHOP_APPLICATIONS_FILTERS, 'rows', null).toString(),
    ''
  );
});
