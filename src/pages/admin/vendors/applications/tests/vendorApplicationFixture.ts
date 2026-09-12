import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const getBaseApplication = (): VendorApplication => ({
  allocatedStandId: null,
  allocationIteration: null,
  allocationState: 'none',
  id: 'application-1',
  status: 'new',
  submittedAt: '2026-05-11T10:30:00.000Z',
  storeName: 'Shop name',
  attendedBefore: true,
  mainCategory: 'yarns',
  mainCategoryOther: '',
  preferredStands: ['A1'],
  interestedIfUnavailable: false,
  sponsorshipInterest: null,
  phoneNumber: '+48 123 456 789',
  email: 'vendor@example.com',
  invoiceDetails: 'Invoice details',
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  businessDescription: 'Short business description',
  acceptedStatute: true
});
