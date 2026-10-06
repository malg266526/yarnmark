import React from 'react';
import {
  ApplicationsPreferenceCompetitors,
  ApplicationsPreferenceList,
  ApplicationsPreferenceOrder,
  ApplicationsPreferenceTag,
  ApplicationsRowNameButton,
  ApplicationsStatusTag,
  ApplicationsTable,
  ApplicationsTableCell,
  ApplicationsTableDateCell,
  ApplicationsTableHeaderCell,
  ApplicationsTableRow,
  ApplicationsTableScroller
} from '../VendorsApplicationsPage.styled';
import { buildVendorApplicationRows } from '../utils/vendorApplicationRowsUtils';
import { formatCompactDateTime, formatMainCategory } from '../utils/vendorsApplicationsFormatters';
import { VendorsApplicationsRowsViewProps } from './vendorsApplicationsViewContracts';

const ROW_COLUMNS = ['storeName', 'submittedAt', 'category', 'preferences', 'status'] as const;

export const VendorsApplicationsRowsView = ({
  allApplications,
  applications,
  locale,
  openApplication,
  openApplicationId,
  resolveCategoryLabel,
  translate,
  values
}: VendorsApplicationsRowsViewProps) => {
  const rows = buildVendorApplicationRows(applications, allApplications);

  return (
    <ApplicationsTableScroller>
      <ApplicationsTable>
        <thead>
          <tr>
            {ROW_COLUMNS.map((column) => (
              <ApplicationsTableHeaderCell key={column} scope="col">
                {translate(`vendorsApplicationsPage.rows.columns.${column}`)}
              </ApplicationsTableHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ application, preferences }) => (
            <ApplicationsTableRow
              key={application.id}
              $isOpen={openApplicationId === application.id}
              onClick={() => openApplication(application.id)}
            >
              <ApplicationsTableCell>
                <ApplicationsRowNameButton
                  type="button"
                  aria-label={translate('vendorsApplicationsPage.rows.openDetails', { name: application.storeName })}
                >
                  {application.storeName}
                </ApplicationsRowNameButton>
              </ApplicationsTableCell>
              <ApplicationsTableDateCell>
                {formatCompactDateTime(application.submittedAt, locale)}
              </ApplicationsTableDateCell>
              <ApplicationsTableCell>
                {formatMainCategory(application, resolveCategoryLabel, values.notProvided)}
              </ApplicationsTableCell>
              <ApplicationsTableCell>
                {preferences.length === 0 ? (
                  values.noneSelected
                ) : (
                  <ApplicationsPreferenceList>
                    {preferences.map(({ competitorCount, standId }, preferenceIndex) => (
                      <ApplicationsPreferenceTag
                        key={standId}
                        title={translate('vendorsApplicationsPage.rows.competitors', {
                          count: competitorCount,
                          standId
                        })}
                      >
                        <ApplicationsPreferenceOrder>{preferenceIndex + 1}</ApplicationsPreferenceOrder>
                        {standId}
                        <ApplicationsPreferenceCompetitors>{competitorCount}</ApplicationsPreferenceCompetitors>
                      </ApplicationsPreferenceTag>
                    ))}
                  </ApplicationsPreferenceList>
                )}
              </ApplicationsTableCell>
              <ApplicationsTableCell>
                <ApplicationsStatusTag>
                  {translate(`vendorsApplicationsPage.statuses.${application.status}`)}
                </ApplicationsStatusTag>
              </ApplicationsTableCell>
            </ApplicationsTableRow>
          ))}
        </tbody>
      </ApplicationsTable>
    </ApplicationsTableScroller>
  );
};
