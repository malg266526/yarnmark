import React from 'react';
import {
  ApplicationDrawer,
  ApplicationDrawerBody,
  ApplicationDrawerCloseButton,
  ApplicationDrawerHeader,
  ApplicationsMeta,
  ApplicationTitle,
  DRAWER_OVERLAY_STYLE
} from '../VendorsApplicationsPage.styled';
import { formatDateTime } from '../utils/vendorsApplicationsFormatters';
import { VendorApplicationDetailsView } from './VendorApplicationDetailsView';
import { VendorApplicationDetailsDrawerProps } from './vendorsApplicationsViewContracts';

export const VendorApplicationDetailsDrawer = ({
  application,
  closeApplication,
  deleteApplication,
  deletingApplicationId,
  flags,
  locale,
  resolveCategoryLabel,
  savingStatusApplicationId,
  setApplicationStatus,
  standAssignment,
  translate,
  values
}: VendorApplicationDetailsDrawerProps) => (
  <ApplicationDrawer
    isOpen={application !== null}
    ariaHideApp={false}
    shouldCloseOnOverlayClick
    contentLabel={translate('vendorsApplicationsPage.drawer.label', { name: application?.storeName ?? '' })}
    style={DRAWER_OVERLAY_STYLE}
    onRequestClose={closeApplication}
  >
    {application ? (
      <>
        <ApplicationDrawerHeader>
          <div>
            <ApplicationTitle>{application.storeName}</ApplicationTitle>
            <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
          </div>
          <ApplicationDrawerCloseButton type="button" onClick={closeApplication}>
            {translate('vendorsApplicationsPage.drawer.close')}
          </ApplicationDrawerCloseButton>
        </ApplicationDrawerHeader>
        <ApplicationDrawerBody>
          <VendorApplicationDetailsView
            application={application}
            deleteApplication={deleteApplication}
            deletingApplicationId={deletingApplicationId}
            flags={flags}
            isSavingStatus={savingStatusApplicationId === application.id}
            resolveCategoryLabel={resolveCategoryLabel}
            setApplicationStatus={setApplicationStatus}
            standAssignment={standAssignment}
            translate={translate}
            values={values}
          />
        </ApplicationDrawerBody>
      </>
    ) : null}
  </ApplicationDrawer>
);
