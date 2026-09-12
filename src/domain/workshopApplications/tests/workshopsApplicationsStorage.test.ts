import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createWorkshopApplication,
  listWorkshopApplications,
  parseStoredWorkshopApplications,
  updateWorkshopApplicationStatus
} from '../workshopsApplicationsStorage.ts';
import type { WorkshopFormState } from '../workshopFormTypes.ts';

const WORKSHOP_APPLICATIONS_STORAGE_KEY = 'workshop-applications-json';

class InMemoryLocalStorage {
  private store = new Map<string, string>();

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }

  clear() {
    this.store.clear();
  }
}

const localStorageStub = new InMemoryLocalStorage();

(globalThis as unknown as { window: { localStorage: InMemoryLocalStorage } }).window = {
  localStorage: localStorageStub
};

const createWorkshopFormState = (overrides: Partial<WorkshopFormState> = {}): WorkshopFormState => ({
  tutorName: 'Anna Kowalska',
  workshopTitle: 'Crochet basics',
  description: 'A short workshop description.',
  phoneNumber: '+48 123 456 789',
  email: 'tutor@example.com',
  ...overrides
});

test.beforeEach(() => {
  localStorageStub.clear();
});

test('createWorkshopApplication persists a new application that listWorkshopApplications then returns', async () => {
  const { application } = await createWorkshopApplication(createWorkshopFormState());

  assert.equal(application.status, 'new');
  assert.equal(application.tutorName, 'Anna Kowalska');

  const { applications } = await listWorkshopApplications();

  assert.deepEqual(applications, [application]);
});

test('createWorkshopApplication appends to existing stored applications instead of overwriting them', async () => {
  const { application: firstApplication } = await createWorkshopApplication(
    createWorkshopFormState({ tutorName: 'First tutor' })
  );
  const { application: secondApplication } = await createWorkshopApplication(
    createWorkshopFormState({ tutorName: 'Second tutor' })
  );

  const { applications } = await listWorkshopApplications();

  assert.deepEqual(applications, [firstApplication, secondApplication]);
});

test('updateWorkshopApplicationStatus updates only the matching stored application', async () => {
  const { application: firstApplication } = await createWorkshopApplication(
    createWorkshopFormState({ tutorName: 'First tutor' })
  );
  const { application: secondApplication } = await createWorkshopApplication(
    createWorkshopFormState({ tutorName: 'Second tutor' })
  );

  const { applications: updatedApplications } = await updateWorkshopApplicationStatus(secondApplication.id, 'accepted');

  assert.deepEqual(updatedApplications, [firstApplication, { ...secondApplication, status: 'accepted' }]);

  const { applications: listedApplications } = await listWorkshopApplications();

  assert.deepEqual(listedApplications, updatedApplications);
});

test('updateWorkshopApplicationStatus leaves stored applications unchanged when the id is unknown', async () => {
  const { application } = await createWorkshopApplication(createWorkshopFormState());

  const { applications } = await updateWorkshopApplicationStatus('unknown-id', 'accepted');

  assert.deepEqual(applications, [application]);
});

test('listWorkshopApplications recovers from a corrupted storage value instead of throwing', async () => {
  localStorageStub.setItem(WORKSHOP_APPLICATIONS_STORAGE_KEY, 'not-json');

  const { applications } = await listWorkshopApplications();

  assert.deepEqual(applications, []);
});

test('parseStoredWorkshopApplications drops malformed records but keeps valid ones', () => {
  const validApplication = {
    ...createWorkshopFormState(),
    id: 'application-1',
    status: 'considered' as const,
    submittedAt: '2026-05-11T10:30:00.000Z'
  };
  const malformedApplication = { id: 'broken-application' };

  assert.deepEqual(parseStoredWorkshopApplications(JSON.stringify([validApplication, malformedApplication])), [
    validApplication
  ]);
});

test('parseStoredWorkshopApplications defaults a missing status to "new"', () => {
  const applicationWithoutStatus = {
    ...createWorkshopFormState(),
    id: 'application-1',
    submittedAt: '2026-05-11T10:30:00.000Z'
  };

  assert.deepEqual(parseStoredWorkshopApplications(JSON.stringify([applicationWithoutStatus])), [
    { ...applicationWithoutStatus, status: 'new' }
  ]);
});
