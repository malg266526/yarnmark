import assert from 'node:assert/strict';
import test from 'node:test';
import {
  countWorkshopApplicationsByStatus,
  DEFAULT_WORKSHOP_APPLICATIONS_FILTERS,
  hasActiveWorkshopApplicationsFilters,
  selectWorkshopApplications
} from '../utils/workshopApplicationsFilterUtils.ts';
import { createWorkshopApplicationFixture } from './workshopApplicationFixture.ts';

test('selectWorkshopApplications filters by search, status and experience level', () => {
  const matching = createWorkshopApplicationFixture({ status: 'accepted', workshopTitle: 'Żakard' });
  const other = createWorkshopApplicationFixture({
    id: 'application-2',
    experienceLevel: 'advanced',
    status: 'rejected',
    workshopTitle: 'Haft'
  });

  assert.deepEqual(
    selectWorkshopApplications(
      [other, matching],
      { level: 'beginner', search: 'ŻAK', sortOrder: 'oldest', status: 'accepted' },
      'pl'
    ),
    [matching]
  );
});

test('selectWorkshopApplications sorts by title and newest submission', () => {
  const later = createWorkshopApplicationFixture({
    id: 'later',
    submittedAt: '2026-05-12T10:30:00.000Z',
    workshopTitle: 'Alpaka'
  });
  const earlier = createWorkshopApplicationFixture({ id: 'earlier', workshopTitle: 'Żakard' });

  assert.deepEqual(
    selectWorkshopApplications(
      [later, earlier],
      { ...DEFAULT_WORKSHOP_APPLICATIONS_FILTERS, sortOrder: 'title' },
      'pl'
    ).map(({ id }) => id),
    ['later', 'earlier']
  );
  assert.deepEqual(
    selectWorkshopApplications(
      [earlier, later],
      { ...DEFAULT_WORKSHOP_APPLICATIONS_FILTERS, sortOrder: 'newest' },
      'pl'
    ).map(({ id }) => id),
    ['later', 'earlier']
  );
});

test('status counts and active filter detection include the complete set', () => {
  const applications = [
    createWorkshopApplicationFixture(),
    createWorkshopApplicationFixture({ id: 'accepted', status: 'accepted' })
  ];

  assert.deepEqual(countWorkshopApplicationsByStatus(applications), { accepted: 1, pending: 1, rejected: 0 });
  assert.equal(hasActiveWorkshopApplicationsFilters(DEFAULT_WORKSHOP_APPLICATIONS_FILTERS), false);
  assert.equal(
    hasActiveWorkshopApplicationsFilters({ ...DEFAULT_WORKSHOP_APPLICATIONS_FILTERS, search: 'anna' }),
    true
  );
});
