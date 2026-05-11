import React from 'react';
import {
  ApplicationsEmpty,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationsSection,
  ApplicationCard,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationFieldValue,
  ApplicationHeader,
  ApplicationTitle
} from './VendorsApplicationsPage.styled';
import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';

interface Props {
  applications: VendorApplication[];
  loading: boolean;
  error: string | null;
}

const formatBoolean = (value: boolean | null) => {
  if (value === null) {
    return 'No answer';
  }

  return value ? 'Yes' : 'No';
};

const formatMainCategory = (application: VendorApplication) => {
  if (application.mainCategory === 'other') {
    return application.mainCategoryOther || 'Other';
  }

  return application.mainCategory ?? 'Not provided';
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'long',
    timeStyle: 'medium'
  }).format(new Date(value));

export const VendorsApplicationsView: React.FC<Props> = ({ applications, loading, error }) => {
  if (loading) {
    return <ApplicationsEmpty>Loading applications...</ApplicationsEmpty>;
  }

  if (error) {
    return <ApplicationsEmpty>Error: {error}</ApplicationsEmpty>;
  }

  if (applications.length === 0) {
    return <ApplicationsEmpty>No applications yet.</ApplicationsEmpty>;
  }

  return (
    <ApplicationsSection>
      <ApplicationsMeta>{applications.length} applications saved</ApplicationsMeta>
      <ApplicationsGrid>
        {applications.map((application) => (
          <ApplicationCard key={application.id}>
            <ApplicationHeader>
              <ApplicationTitle>{application.storeName}</ApplicationTitle>
              <ApplicationsMeta>{formatDateTime(application.submittedAt)}</ApplicationsMeta>
            </ApplicationHeader>

            <ApplicationField>
              <ApplicationFieldLabel>Main category</ApplicationFieldLabel>
              <ApplicationFieldValue>{formatMainCategory(application)}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Preferred stands</ApplicationFieldLabel>
              <ApplicationFieldValue>
                {application.preferredStands.length > 0 ? application.preferredStands.join(', ') : 'None selected'}
              </ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Previous Yarnmark</ApplicationFieldLabel>
              <ApplicationFieldValue>{formatBoolean(application.attendedBefore)}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Offer if unavailable</ApplicationFieldLabel>
              <ApplicationFieldValue>{formatBoolean(application.interestedIfUnavailable)}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Phone</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.phoneNumber}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Email</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.email}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Invoice details</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.invoiceDetails}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Logo filename</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.logoFileName ?? 'Not provided'}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Business description</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.businessDescription}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>Terms accepted</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.acceptedStatute ? 'Yes' : 'No'}</ApplicationFieldValue>
            </ApplicationField>
          </ApplicationCard>
        ))}
      </ApplicationsGrid>
    </ApplicationsSection>
  );
};
