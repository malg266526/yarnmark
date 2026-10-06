import React, { useMemo } from 'react';
import { StandColorsMap } from '../../../../../components/editor/StandProps';
import { HallMap } from '../../../../../components/hall/HallMap';
import { isVendorStand, parseHallStands, type HallStand } from '../../../../../components/hall/hallStands';
import { getStandInterestCounts } from '../../../../../domain/vendorApplications/vendorFormStandInterestUtils';
import { GrayScale, HallColors } from '../../../../../styles/theme';
import {
  ApplicationsMapHint,
  ApplicationsMapLayout,
  ApplicationsMapLegend,
  ApplicationsMapLegendItem,
  ApplicationsMapLegendSwatch,
  ApplicationsMapPanel,
  ApplicationsMapScroller,
  ApplicationsMapSide,
  ApplicationsMapStand,
  ApplicationsMapStandCount,
  StandGroupCard,
  StandGroupTitle,
  StandRequestItem,
  StandRequestList,
  StandRequestMeta,
  StandRequestVendor
} from '../VendorsApplicationsPage.styled';
import { formatCompactDateTime } from '../utils/vendorsApplicationsFormatters';
import { groupApplicationsByStand } from '../utils/standGroupingUtils';
import { resolveStandDemandLevel, STAND_DEMAND_LEVELS, type StandDemandLevel } from '../utils/standDemandUtils';
import { VENDOR_APPLICATIONS_FILTER_ALL } from '../vendorsApplicationsConstants';
import { VendorsApplicationsMapViewProps } from './vendorsApplicationsViewContracts';

const DEMAND_LEVEL_COLORS: Record<StandDemandLevel, string> = {
  none: GrayScale[100],
  low: HallColors[100],
  medium: HallColors[200],
  high: HallColors[300]
};

const MAP_MULTIPLIER = 10;
const MAP_PHONE_MULTIPLIER = 7;

export const VendorsApplicationsMapView = ({
  applications,
  isPhone,
  locale,
  resolvePriorityLabel,
  selectedStandId,
  selectStand,
  translate
}: VendorsApplicationsMapViewProps) => {
  const parsedStands = useMemo(() => parseHallStands(), []);
  const requestCounts = useMemo(() => getStandInterestCounts(applications), [applications]);
  const selectedStandGroup = useMemo(
    () => groupApplicationsByStand(applications).find(({ standId }) => standId === selectedStandId),
    [applications, selectedStandId]
  );

  if (!parsedStands.success) {
    return <ApplicationsMapHint>{translate('vendorsApplicationsPage.map.loadError')}</ApplicationsMapHint>;
  }

  const resolveStandColor = (stand: HallStand, requestCount: number) =>
    isVendorStand(stand) ? DEMAND_LEVEL_COLORS[resolveStandDemandLevel(requestCount)] : StandColorsMap[stand.color];

  return (
    <ApplicationsMapLayout>
      <ApplicationsMapPanel>
        <ApplicationsMapLegend>
          {STAND_DEMAND_LEVELS.map((level) => (
            <ApplicationsMapLegendItem key={level}>
              <ApplicationsMapLegendSwatch $color={DEMAND_LEVEL_COLORS[level]} />
              {translate(`vendorsApplicationsPage.map.demandLevels.${level}`)}
            </ApplicationsMapLegendItem>
          ))}
        </ApplicationsMapLegend>
        <ApplicationsMapScroller>
          <HallMap
            multiplier={isPhone ? MAP_PHONE_MULTIPLIER : MAP_MULTIPLIER}
            stands={parsedStands.data}
            renderStand={(stand, box) => {
              const requestCount = requestCounts.get(stand.index) ?? 0;
              const interactive = isVendorStand(stand);

              return (
                <ApplicationsMapStand
                  key={stand.id}
                  type="button"
                  $color={resolveStandColor(stand, requestCount)}
                  $height={box.height}
                  $interactive={interactive}
                  $left={box.left}
                  $top={box.top}
                  $width={box.width}
                  aria-pressed={interactive ? stand.index === selectedStandId : undefined}
                  disabled={!interactive}
                  title={translate('vendorsApplicationsPage.map.standDemand', {
                    count: requestCount,
                    standId: stand.index
                  })}
                  onClick={
                    interactive
                      ? () =>
                          selectStand(stand.index === selectedStandId ? VENDOR_APPLICATIONS_FILTER_ALL : stand.index)
                      : undefined
                  }
                >
                  {interactive ? (
                    <>
                      {stand.index}
                      <ApplicationsMapStandCount>{requestCount}</ApplicationsMapStandCount>
                    </>
                  ) : null}
                </ApplicationsMapStand>
              );
            }}
          />
        </ApplicationsMapScroller>
      </ApplicationsMapPanel>

      <ApplicationsMapSide>
        {selectedStandGroup ? (
          <StandGroupCard>
            <StandGroupTitle>{selectedStandGroup.standId}</StandGroupTitle>
            <StandRequestList>
              {selectedStandGroup.requests.map((request) => (
                <StandRequestItem key={`${selectedStandGroup.standId}-${request.applicationId}`}>
                  <StandRequestVendor>{request.storeName}</StandRequestVendor>
                  <StandRequestMeta>{formatCompactDateTime(request.submittedAt, locale)}</StandRequestMeta>
                  <StandRequestMeta>{resolvePriorityLabel(request.priority)}</StandRequestMeta>
                </StandRequestItem>
              ))}
            </StandRequestList>
          </StandGroupCard>
        ) : (
          <ApplicationsMapHint>
            {selectedStandId === VENDOR_APPLICATIONS_FILTER_ALL
              ? translate('vendorsApplicationsPage.map.selectHint')
              : translate('vendorsApplicationsPage.map.noRequests', { standId: selectedStandId })}
          </ApplicationsMapHint>
        )}
      </ApplicationsMapSide>
    </ApplicationsMapLayout>
  );
};
