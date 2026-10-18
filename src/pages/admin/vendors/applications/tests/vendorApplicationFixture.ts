import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { getPreferredStandGroups } from '../../../../../domain/vendorApplications/vendorFormUtils.ts';

export const getBaseApplication = (): VendorApplication => ({
  allocationIteration: null,
  allocationState: 'none',
  assignedStands: [],
  id: 'application-1',
  status: 'pending',
  submittedAt: '2026-05-11T10:30:00.000Z',
  storeName: 'Shop name',
  attendedBefore: true,
  mainCategory: 'yarns',
  mainCategoryOther: '',
  preferredStandGroups: [['A1']],
  preferredStands: ['A1'],
  wantsTwoStands: false,
  interestedIfUnavailable: false,
  sponsorshipInterest: null,
  phoneNumber: '+48 123 456 789',
  email: 'vendor@example.com',
  invoiceDetails: 'Invoice details',
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  logoUrl: null,
  businessDescription: 'Short business description',
  comments: '',
  acceptedStatute: true
});

export const withPreferredStands = (
  preferredStands: string[],
  wantsTwoStands = false
): Pick<VendorApplication, 'preferredStandGroups' | 'preferredStands' | 'wantsTwoStands'> => ({
  preferredStandGroups: getPreferredStandGroups(preferredStands, wantsTwoStands),
  preferredStands,
  wantsTwoStands
});
