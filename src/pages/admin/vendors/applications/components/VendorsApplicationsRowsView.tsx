import React, { Fragment } from 'react';
import {
  ApplicationsPreferenceCompetitors,
  ApplicationsPreferenceList,
  ApplicationsPreferenceOrder,
  ApplicationsPreferenceStand,
  ApplicationsPreferenceStandSeparator,
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
import { STAND_GROUP_SEPARATOR } from '../utils/standChoiceUtils';
import { VendorApplicationFlagsView } from './VendorApplicationFlagsView';
import { formatCompactDateTime, formatMainCategory } from '../utils/vendorsApplicationsFormatters';
import { VendorsApplicationsRowsViewProps } from './vendorsApplicationsViewContracts';

const ROW_COLUMNS = ['storeName', 'submittedAt', 'category', 'preferences', 'status', 'flags'] as const;

export const VendorsApplicationsRowsView = ({
  allApplications,
  applications,
  flagsByApplicationId,
  highlightApplication,
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
              onMouseEnter={() => highlightApplication?.(application.id)}
              onMouseLeave={() => highlightApplication?.(null)}
              onFocus={() => highlightApplication?.(application.id)}
              onBlur={() => highlightApplication?.(null)}
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
                    {preferences.map(({ choicePosition, stands }) => (
                      <ApplicationsPreferenceTag
                        key={choicePosition}
                        $isPair={stands.length > 1}
                        title={stands
                          .map(({ competitorCount, standId }) =>
                            translate('vendorsApplicationsPage.rows.competitors', { count: competitorCount, standId })
                          )
                          .join('\n')}
                      >
                        <ApplicationsPreferenceOrder $isInPair={stands.length > 1}>
                          {choicePosition}
                        </ApplicationsPreferenceOrder>
                        {stands.map(({ competitorCount, standId }, standIndex) => (
                          <Fragment key={standId}>
                            {standIndex > 0 ? (
                              <ApplicationsPreferenceStandSeparator>
                                {STAND_GROUP_SEPARATOR.trim()}
                              </ApplicationsPreferenceStandSeparator>
                            ) : null}
                            <ApplicationsPreferenceStand $isInPair={stands.length > 1}>
                              {standId}
                              <ApplicationsPreferenceCompetitors>{competitorCount}</ApplicationsPreferenceCompetitors>
                            </ApplicationsPreferenceStand>
                          </Fragment>
                        ))}
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
              <ApplicationsTableCell>
                <VendorApplicationFlagsView
                  emptyLabel={translate('vendorsApplicationsPage.flags.none')}
                  flags={flagsByApplicationId.get(application.id) ?? []}
                  translate={translate}
                />
              </ApplicationsTableCell>
            </ApplicationsTableRow>
          ))}
        </tbody>
      </ApplicationsTable>
    </ApplicationsTableScroller>
  );
};
