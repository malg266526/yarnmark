import React from 'react';
import {
  ApplicationsRowTitleButton,
  ApplicationsStatusTag,
  ApplicationsTable,
  ApplicationsTableCell,
  ApplicationsTableDateCell,
  ApplicationsTableHeaderCell,
  ApplicationsTableRow,
  ApplicationsTableScroller
} from '../WorkshopsApplicationsPage.styled';
import { formatCompactDateTime } from '../utils/workshopsApplicationsFormatters';
import type { WorkshopApplication } from '../../../../../domain/workshopApplications/workshopFormSubmission';
import type { WorkshopApplicationWarning } from '../utils/workshopScheduleUtils';
import { WorkshopApplicationWarningsView } from './WorkshopApplicationWarningsView';

interface WorkshopsApplicationsRowsViewProps {
  applications: WorkshopApplication[];
  locale: string;
  openApplication: (applicationId: string) => void;
  openApplicationId: string | null;
  translate: (translationKey: string, options?: Record<string, unknown>) => string;
  warningsByApplicationId: Map<string, WorkshopApplicationWarning[]>;
}

const COLUMNS = [
  'title',
  'tutor',
  'level',
  'participants',
  'price',
  'duration',
  'submittedAt',
  'status',
  'warnings'
] as const;

export const WorkshopsApplicationsRowsView = ({
  applications,
  locale,
  openApplication,
  openApplicationId,
  translate,
  warningsByApplicationId
}: WorkshopsApplicationsRowsViewProps) => (
  <ApplicationsTableScroller>
    <ApplicationsTable>
      <thead>
        <tr>
          {COLUMNS.map((column) => (
            <ApplicationsTableHeaderCell key={column} scope="col">
              {translate(`workshopsApplicationsPage.rows.columns.${column}`)}
            </ApplicationsTableHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <ApplicationsTableRow
            key={application.id}
            $isOpen={application.id === openApplicationId}
            onClick={() => openApplication(application.id)}
          >
            <ApplicationsTableCell>
              <ApplicationsRowTitleButton
                type="button"
                aria-label={translate('workshopsApplicationsPage.rows.openDetails', {
                  name: application.workshopTitle
                })}
              >
                {application.workshopTitle}
              </ApplicationsRowTitleButton>
            </ApplicationsTableCell>
            <ApplicationsTableCell>{application.tutorName}</ApplicationsTableCell>
            <ApplicationsTableCell>
              {application.experienceLevel
                ? translate(`workshopsFormPage.steps.experienceLevel.${application.experienceLevel}`)
                : translate('workshopsApplicationsPage.fields.notProvided')}
            </ApplicationsTableCell>
            <ApplicationsTableCell>
              {translate('workshopsApplicationsPage.fields.participantsRange', {
                min: application.minParticipants,
                max: application.maxParticipants
              })}
            </ApplicationsTableCell>
            <ApplicationsTableCell>
              {translate('workshopsApplicationsPage.fields.grossPricePerParticipantValue', {
                price: application.grossPricePerParticipant
              })}
            </ApplicationsTableCell>
            <ApplicationsTableCell>{application.duration}</ApplicationsTableCell>
            <ApplicationsTableDateCell>
              {formatCompactDateTime(application.submittedAt, locale)}
            </ApplicationsTableDateCell>
            <ApplicationsTableCell>
              <ApplicationsStatusTag>
                {translate(`workshopsApplicationsPage.statuses.${application.status}`)}
              </ApplicationsStatusTag>
            </ApplicationsTableCell>
            <ApplicationsTableCell>
              <WorkshopApplicationWarningsView
                translate={translate}
                warnings={warningsByApplicationId.get(application.id) ?? []}
              />
            </ApplicationsTableCell>
          </ApplicationsTableRow>
        ))}
      </tbody>
    </ApplicationsTable>
  </ApplicationsTableScroller>
);
