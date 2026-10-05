import assert from 'node:assert/strict';
import test from 'node:test';
import {
  listWorkshopApplications,
  parseWorkshopApplications,
  updateWorkshopApplicationStatus
} from '../workshopsApplicationsApi.ts';
import { WORKSHOP_FORM_API_URL } from '../workshopFormConstants.ts';
import { ApiRequestError } from '../../apiClient.ts';
import type { WorkshopFormState } from '../workshopFormTypes.ts';

interface RecordedRequest {
  url: string;
  init: RequestInit | undefined;
}

const ADMIN_TOKEN = 'admin-token';
const originalFetch = globalThis.fetch;

const createWorkshopFormState = (overrides: Partial<WorkshopFormState> = {}): WorkshopFormState => ({
  tutorName: 'Anna Kowalska',
  workshopTitle: 'Crochet basics',
  description: 'A short workshop description.',
  minParticipants: 4,
  maxParticipants: 10,
  experienceLevel: 'beginner',
  duration: '3h',
  participantsShouldBring: 'Own crochet hook.',
  roomRequirements: 'Tables and power access.',
  requiredEquipment: 'Flipchart, monitor.',
  grossPricePerParticipant: 50,
  contractType: 'invoice',
  contractTypeOther: '',
  additionalInfo: '',
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  phoneNumber: '+48 123 456 789',
  email: 'tutor@example.com',
  ...overrides
});

const createWorkshopApplication = (overrides: Partial<WorkshopFormState> = {}) => ({
  ...createWorkshopFormState(overrides),
  id: 'application-1',
  status: 'considered' as const,
  submittedAt: '2026-05-11T10:30:00.000Z'
});

const stubFetch = (status: number, responseBody: unknown) => {
  const requests: RecordedRequest[] = [];

  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    requests.push({ url, init });

    return new Response(JSON.stringify(responseBody), { status });
  }) as typeof fetch;

  return requests;
};

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('listWorkshopApplications fetches applications from the backend with the admin token', async () => {
  const application = createWorkshopApplication();
  const requests = stubFetch(200, [application]);

  const applications = await listWorkshopApplications(ADMIN_TOKEN);

  assert.deepEqual(applications, [application]);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, WORKSHOP_FORM_API_URL);
  assert.equal(requests[0].init?.method, 'GET');
  assert.equal(requests[0].init?.credentials, 'include');
  assert.deepEqual(requests[0].init?.headers, { Authorization: `Bearer ${ADMIN_TOKEN}` });
});

test('listWorkshopApplications throws when the backend rejects the request', async () => {
  stubFetch(401, { error: 'Not authenticated' });

  await assert.rejects(listWorkshopApplications(ADMIN_TOKEN), ApiRequestError);
});

test('updateWorkshopApplicationStatus sends the new status to the application status endpoint', async () => {
  const requests = stubFetch(200, {});

  await updateWorkshopApplicationStatus(ADMIN_TOKEN, 'application-1', 'accepted');

  assert.equal(requests[0].url, `${WORKSHOP_FORM_API_URL}/application-1/status`);
  assert.equal(requests[0].init?.method, 'PATCH');
  assert.equal(requests[0].init?.body, JSON.stringify({ status: 'accepted' }));
  assert.deepEqual(requests[0].init?.headers, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_TOKEN}`
  });
});

test('updateWorkshopApplicationStatus throws when the backend rejects the update', async () => {
  stubFetch(404, null);

  await assert.rejects(updateWorkshopApplicationStatus(ADMIN_TOKEN, 'unknown-id', 'accepted'), ApiRequestError);
});

test('parseWorkshopApplications drops malformed records but keeps valid ones', () => {
  const validApplication = createWorkshopApplication();
  const malformedApplication = { id: 'broken-application' };

  assert.deepEqual(parseWorkshopApplications([validApplication, malformedApplication]), [validApplication]);
});

test('parseWorkshopApplications returns an empty list for a payload that is not a list', () => {
  assert.deepEqual(parseWorkshopApplications(null), []);
  assert.deepEqual(parseWorkshopApplications({ foo: 'bar' }), []);
});

test('parseWorkshopApplications defaults a missing status to "new"', () => {
  const applicationWithoutStatus = {
    ...createWorkshopFormState(),
    id: 'application-1',
    submittedAt: '2026-05-11T10:30:00.000Z'
  };

  assert.deepEqual(parseWorkshopApplications([applicationWithoutStatus]), [
    { ...applicationWithoutStatus, status: 'new' }
  ]);
});

test('parseWorkshopApplications maps the backend submissions payload', () => {
  const backendSubmission = {
    id: '9c00ee02-db21-4cc6-91f1-2e378b9162d2',
    tutorName: 'Anna Kowalska',
    email: 'tutor@example.com',
    phoneNumber: '+48123456789',
    workshopTitle: 'Crochet basics',
    description: 'A short workshop description.',
    experienceLevel: 'advanced',
    contractType: 'commission',
    contractTypeOther: '',
    grossPricePerParticipant: 54,
    minParticipants: 4,
    maxParticipants: 7,
    duration: '5h',
    roomRequirements: '',
    requiredEquipment: '',
    participantsShouldBring: 'Own crochet hook.',
    additionalInfo: '',
    logoPath: 'workshops/logo.webp',
    logoOriginalFilename: 'profilowe.JPG',
    status: 'pending',
    statusUpdatedAt: null,
    createdAt: '2026-10-05 14:35:49'
  };

  const [application] = parseWorkshopApplications({ submissions: [backendSubmission] });

  assert.equal(application.id, backendSubmission.id);
  assert.equal(application.status, 'new');
  assert.equal(application.submittedAt, '2026-10-05 14:35:49');
  assert.equal(application.logoFileName, 'profilowe.JPG');
  assert.equal(application.logoDataUrl, null);
});
