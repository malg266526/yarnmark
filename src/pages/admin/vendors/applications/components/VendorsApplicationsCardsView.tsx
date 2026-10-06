import React from 'react';
import {
  ApplicationCard,
  ApplicationHeader,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationTitle
} from '../VendorsApplicationsPage.styled';
import { formatDateTime } from '../utils/vendorsApplicationsFormatters';
import { VendorApplicationDetailsView } from './VendorApplicationDetailsView';
import { VendorsApplicationsCardsViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsCardsView = ({
  applications,
  deleteApplication,
  deletingApplicationId,
  flagsByApplicationId,
  locale,
  resolveCategoryLabel,
  savingStatusApplicationId,
  setApplicationStatus,
  values,
  translate
}: VendorsApplicationsCardsViewProps) => (
  <ApplicationsGrid>
    {applications.map((application) => (
      <ApplicationCard key={application.id}>
        <ApplicationHeader>
          <ApplicationTitle>{application.storeName}</ApplicationTitle>
          <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
        </ApplicationHeader>
        <VendorApplicationDetailsView
          application={application}
          deleteApplication={deleteApplication}
          deletingApplicationId={deletingApplicationId}
          flags={flagsByApplicationId.get(application.id) ?? []}
          isSavingStatus={savingStatusApplicationId === application.id}
          resolveCategoryLabel={resolveCategoryLabel}
          setApplicationStatus={setApplicationStatus}
          translate={translate}
          values={values}
        />
      </ApplicationCard>
    ))}
  </ApplicationsGrid>
);
