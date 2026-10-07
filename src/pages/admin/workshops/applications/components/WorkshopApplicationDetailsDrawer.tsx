import React from 'react';
import {
  ApplicationDrawer,
  ApplicationDrawerBody,
  ApplicationDrawerCloseButton,
  ApplicationDrawerHeader,
  ApplicationsMeta,
  ApplicationTitle,
  DRAWER_OVERLAY_STYLE
} from '../WorkshopsApplicationsPage.styled';
import { formatDateTime } from '../utils/workshopsApplicationsFormatters';
import { WorkshopApplicationDetailsView } from './WorkshopApplicationDetailsView';
import type { WorkshopApplicationDetailsDrawerProps } from './workshopsApplicationsViewContracts';

export const WorkshopApplicationDetailsDrawer = ({
  application,
  closeApplication,
  deleteApplication,
  deletingApplicationId,
  locale,
  setApplicationStatus,
  translate,
  warnings
}: WorkshopApplicationDetailsDrawerProps) => {
  return (
    <ApplicationDrawer
      isOpen={application !== null}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      contentLabel={translate('workshopsApplicationsPage.drawer.label', {
        name: application?.workshopTitle ?? ''
      })}
      style={DRAWER_OVERLAY_STYLE}
      onRequestClose={closeApplication}
    >
      {application ? (
        <>
          <ApplicationDrawerHeader>
            <div>
              <ApplicationTitle>{application.workshopTitle}</ApplicationTitle>
              <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
            </div>
            <ApplicationDrawerCloseButton type="button" onClick={closeApplication}>
              {translate('workshopsApplicationsPage.drawer.close')}
            </ApplicationDrawerCloseButton>
          </ApplicationDrawerHeader>
          <ApplicationDrawerBody>
            <WorkshopApplicationDetailsView
              application={application}
              deleteApplication={deleteApplication}
              deletingApplicationId={deletingApplicationId}
              setApplicationStatus={setApplicationStatus}
              translate={translate}
              warnings={warnings}
            />
          </ApplicationDrawerBody>
        </>
      ) : null}
    </ApplicationDrawer>
  );
};
