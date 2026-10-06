import type { WorkshopApplication } from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';

export const createWorkshopApplicationFixture = (
  overrides: Partial<WorkshopApplication> = {}
): WorkshopApplication => ({
  additionalInfo: '',
  contractType: 'invoice',
  contractTypeOther: '',
  description: 'Opis warsztatu',
  duration: '3 godziny',
  email: 'anna@example.com',
  experienceLevel: 'beginner',
  grossPricePerParticipant: 100,
  id: 'application-1',
  logoDataUrl: null,
  logoFileName: 'logo.png',
  logoMimeType: 'image/png',
  logoUrl: null,
  maxParticipants: 10,
  minParticipants: 4,
  participantsShouldBring: 'Druty',
  phoneNumber: '+48123456789',
  requiredEquipment: '',
  roomRequirements: '',
  schedule: null,
  status: 'pending',
  submittedAt: '2026-05-11T10:30:00.000Z',
  tutorName: 'Anna Kowalska',
  workshopTitle: 'Podstawy dziergania',
  ...overrides
});
