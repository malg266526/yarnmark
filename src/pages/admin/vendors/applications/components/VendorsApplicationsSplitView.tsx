import React, { useState } from 'react';
import {
  ApplicationsSplitLayout,
  ApplicationsSplitList,
  ApplicationsSplitMap
} from '../VendorsApplicationsPage.styled';
import { buildStandPriorityHighlights } from '../utils/vendorApplicationRowsUtils';
import { VendorsApplicationsMapView } from './VendorsApplicationsMapView';
import { VendorsApplicationsRowsView } from './VendorsApplicationsRowsView';
import { VendorsApplicationsSplitViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsSplitView = ({
  allApplications,
  applications,
  flagsByApplicationId,
  locale,
  mapMultiplier,
  openApplication,
  openApplicationId,
  resolveCategoryLabel,
  selectStand,
  selectedStandId,
  translate,
  values
}: VendorsApplicationsSplitViewProps) => {
  const [highlightedApplicationId, setHighlightedApplicationId] = useState<string | null>(null);
  const highlightedApplication = applications.find(({ id }) => id === highlightedApplicationId) ?? null;

  return (
    <ApplicationsSplitLayout>
      <ApplicationsSplitList>
        <VendorsApplicationsRowsView
          allApplications={allApplications}
          applications={applications}
          flagsByApplicationId={flagsByApplicationId}
          highlightApplication={setHighlightedApplicationId}
          locale={locale}
          openApplication={openApplication}
          openApplicationId={openApplicationId}
          resolveCategoryLabel={resolveCategoryLabel}
          translate={translate}
          values={values}
        />
      </ApplicationsSplitList>
      <ApplicationsSplitMap>
        <VendorsApplicationsMapView
          applications={allApplications}
          highlightedStands={buildStandPriorityHighlights(highlightedApplication)}
          multiplier={mapMultiplier}
          selectStand={selectStand}
          selectedStandId={selectedStandId}
          translate={translate}
        />
      </ApplicationsSplitMap>
    </ApplicationsSplitLayout>
  );
};
