import React, { useMemo } from 'react';
import { StandColorsMap } from '../../../../../components/editor/StandProps';
import { HallMap } from '../../../../../components/hall/HallMap';
import { getEnclosingHallStandBox, getHallStandBox } from '../../../../../components/hall/hallStandBox';
import { areStandsAdjacent } from '../../../../../components/hall/standAdjacencyUtils';
import { isVendorStand, parseHallStands, type HallStand } from '../../../../../components/hall/hallStands';
import { GRID_COLS } from '../../../../../components/editor/utils/hallGeometry';
import { getStandInterestCounts } from '../../../../../domain/vendorApplications/vendorFormStandInterestUtils';
import { GrayScale, HallColors } from '../../../../../styles/theme';
import {
  ApplicationsMapCoverage,
  ApplicationsMapCoverageLabel,
  ApplicationsMapCoverageList,
  ApplicationsMapCoverageStand,
  ApplicationsMapCoverageSummary,
  ApplicationsMapHint,
  ApplicationsMapStandPairFrame,
  ApplicationsMapStandPriority,
  STAND_PRIORITY_COLORS,
  ApplicationsMapLayout,
  ApplicationsMapLegend,
  ApplicationsMapLegendItem,
  ApplicationsMapLegendSwatch,
  ApplicationsMapPanel,
  ApplicationsMapScroller,
  ApplicationsMapStand,
  ApplicationsMapStandAssignedContent,
  ApplicationsMapStandVendorName,
  ApplicationsMapStandVendorNames,
  ApplicationsMapStandMeta,
  ApplicationsMapStandCount
} from '../VendorsApplicationsPage.styled';
import {
  buildHallCoverage,
  resolveStandDemandLevel,
  STAND_DEMAND_LEVELS,
  type StandDemandLevel
} from '../utils/standDemandUtils';
import { VENDOR_APPLICATIONS_FILTER_ALL } from '../vendorsApplicationsConstants';
import { VendorsApplicationsMapViewProps } from './vendorsApplicationsViewContracts';
import { buildVendorMapAssignments } from '../utils/vendorMapAssignmentsUtils';

const DEMAND_LEVEL_COLORS: Record<StandDemandLevel, string> = {
  none: GrayScale[100],
  low: HallColors[100],
  medium: HallColors[200],
  high: HallColors[300]
};

const resolvePriorityColor = (priority: number) =>
  STAND_PRIORITY_COLORS[Math.min(priority, STAND_PRIORITY_COLORS.length) - 1];

export const VendorsApplicationsMapView = ({
  applications,
  highlightedStandPairs = [],
  highlightedStands,
  multiplier,
  selectedStandId,
  selectStand,
  translate
}: VendorsApplicationsMapViewProps) => {
  const parsedStands = useMemo(() => parseHallStands(), []);
  const requestCounts = useMemo(() => getStandInterestCounts(applications), [applications]);
  const assignments = useMemo(() => buildVendorMapAssignments(applications), [applications]);
  if (!parsedStands.success) {
    return <ApplicationsMapHint>{translate('vendorsApplicationsPage.map.loadError')}</ApplicationsMapHint>;
  }

  const mapWidth = GRID_COLS * multiplier;
  const pairFrames = highlightedStandPairs.flatMap(({ choicePosition, standIds }) => {
    const pairStands = parsedStands.data.filter(({ index }) => standIds.includes(index));
    const [firstStand, secondStand] = pairStands;

    return pairStands.length === 2 && areStandsAdjacent(firstStand, secondStand)
      ? [
          {
            box: getEnclosingHallStandBox(pairStands.map((stand) => getHallStandBox(stand, multiplier))),
            choicePosition,
            standIds
          }
        ]
      : [];
  });
  const pairedStandIds = new Set(pairFrames.flatMap(({ standIds }) => standIds));
  const coverage = buildHallCoverage(
    parsedStands.data.filter(isVendorStand).map(({ index }) => index),
    requestCounts
  );

  const resolveStandColor = (stand: HallStand, requestCount: number) =>
    isVendorStand(stand) ? DEMAND_LEVEL_COLORS[resolveStandDemandLevel(requestCount)] : StandColorsMap[stand.color];

  return (
    <ApplicationsMapLayout>
      <ApplicationsMapPanel>
        <ApplicationsMapLegend $maxWidth={mapWidth}>
          {STAND_DEMAND_LEVELS.map((level) => (
            <ApplicationsMapLegendItem key={level}>
              <ApplicationsMapLegendSwatch $color={DEMAND_LEVEL_COLORS[level]} />
              {translate(`vendorsApplicationsPage.map.demandLevels.${level}`)}
            </ApplicationsMapLegendItem>
          ))}
        </ApplicationsMapLegend>
        <ApplicationsMapCoverage $maxWidth={mapWidth}>
          <ApplicationsMapCoverageSummary>
            {translate('vendorsApplicationsPage.map.coverage.summary', {
              free: coverage.freeStandIds.length,
              requested: coverage.requestedStandCount,
              total: coverage.totalStandCount
            })}
          </ApplicationsMapCoverageSummary>
          {coverage.freeStandIds.length > 0 ? (
            <ApplicationsMapCoverageList>
              <ApplicationsMapCoverageLabel>
                {translate('vendorsApplicationsPage.map.coverage.freeStandsLabel')}
              </ApplicationsMapCoverageLabel>
              {coverage.freeStandIds.map((standId) => (
                <ApplicationsMapCoverageStand
                  key={standId}
                  type="button"
                  aria-pressed={standId === selectedStandId}
                  onClick={() => selectStand(standId === selectedStandId ? VENDOR_APPLICATIONS_FILTER_ALL : standId)}
                >
                  {standId}
                </ApplicationsMapCoverageStand>
              ))}
            </ApplicationsMapCoverageList>
          ) : null}
        </ApplicationsMapCoverage>
        <ApplicationsMapScroller>
          <HallMap
            multiplier={multiplier}
            stands={parsedStands.data}
            renderStand={(stand, box) => {
              const requestCount = requestCounts.get(stand.index) ?? 0;
              const interactive = isVendorStand(stand);
              const assignedVendors = assignments.get(stand.index) ?? [];
              const standLabel =
                assignedVendors.length > 0
                  ? translate('vendorsApplicationsPage.map.standAssignments', {
                      standId: stand.index,
                      count: requestCount,
                      names: assignedVendors.map(({ storeName }) => storeName).join(', ')
                    })
                  : translate('vendorsApplicationsPage.map.standDemand', { count: requestCount, standId: stand.index });
              const highlightedPriority = pairedStandIds.has(stand.index)
                ? undefined
                : highlightedStands?.get(stand.index);
              const highlightColor = highlightedPriority ? resolvePriorityColor(highlightedPriority) : undefined;

              return (
                <ApplicationsMapStand
                  key={stand.id}
                  type="button"
                  $color={resolveStandColor(stand, requestCount)}
                  $height={box.height}
                  $highlightColor={highlightColor}
                  $interactive={interactive}
                  $left={box.left}
                  $top={box.top}
                  $width={box.width}
                  aria-pressed={interactive ? stand.index === selectedStandId : undefined}
                  disabled={!interactive}
                  title={standLabel}
                  aria-label={interactive ? standLabel : undefined}
                  onClick={
                    interactive
                      ? () =>
                          selectStand(stand.index === selectedStandId ? VENDOR_APPLICATIONS_FILTER_ALL : stand.index)
                      : undefined
                  }
                >
                  {interactive ? (
                    <>
                      {assignedVendors.length > 0 ? (
                        <ApplicationsMapStandAssignedContent>
                          <ApplicationsMapStandVendorNames>
                            {assignedVendors.map(({ applicationId, storeName }) => (
                              <ApplicationsMapStandVendorName key={applicationId}>
                                {storeName}
                              </ApplicationsMapStandVendorName>
                            ))}
                          </ApplicationsMapStandVendorNames>
                          <ApplicationsMapStandMeta>{stand.index}</ApplicationsMapStandMeta>
                        </ApplicationsMapStandAssignedContent>
                      ) : (
                        <>
                          {stand.index}
                          <ApplicationsMapStandCount>{requestCount}</ApplicationsMapStandCount>
                        </>
                      )}
                      {highlightedPriority && highlightColor ? (
                        <ApplicationsMapStandPriority $color={highlightColor}>
                          {highlightedPriority}
                        </ApplicationsMapStandPriority>
                      ) : null}
                    </>
                  ) : null}
                </ApplicationsMapStand>
              );
            }}
          >
            {pairFrames.map(({ box, choicePosition }) => (
              <ApplicationsMapStandPairFrame
                key={choicePosition}
                $color={resolvePriorityColor(choicePosition)}
                $height={box.height}
                $left={box.left}
                $top={box.top}
                $width={box.width}
              >
                <ApplicationsMapStandPriority $color={resolvePriorityColor(choicePosition)}>
                  {choicePosition}
                </ApplicationsMapStandPriority>
              </ApplicationsMapStandPairFrame>
            ))}
          </HallMap>
        </ApplicationsMapScroller>
      </ApplicationsMapPanel>
    </ApplicationsMapLayout>
  );
};
