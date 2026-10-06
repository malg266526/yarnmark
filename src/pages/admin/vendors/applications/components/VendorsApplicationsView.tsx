import React, { useMemo } from 'react';
import {
  ApplicationActionButton,
  ApplicationsEmpty,
  ApplicationsMapLayout,
  ApplicationsMapPanelSlot,
  ApplicationsMapSide,
  ApplicationsMeta,
  ApplicationsSection,
  ApplicationsToolbar
} from '../VendorsApplicationsPage.styled';
import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { useTypedTranslation } from '../../../../../translations/useTypedTranslation';
import { usePhone } from '../../../../../hooks/usePhone';
import { isVendorStand, parseHallStands } from '../../../../../components/hall/hallStands';
import type { VendorApplicationStatusChange } from '../hooks/useVendorsApplications';
import type { VendorApplicationStandAssignment } from './vendorsApplicationsViewContracts';
import { useVendorsApplicationsToolbar } from '../hooks/useVendorsApplicationsToolbar';
import {
  VENDOR_APPLICATIONS_LIST_VIEW_MODES,
  VENDOR_APPLICATIONS_MAP_MULTIPLIER,
  VENDOR_APPLICATIONS_MAP_PHONE_MULTIPLIER,
  VENDOR_APPLICATIONS_SPLIT_MAP_MULTIPLIER
} from '../vendorsApplicationsConstants';
import { VendorApplicationDetailsDrawer } from './VendorApplicationDetailsDrawer';
import { VendorsApplicationsCardsView } from './VendorsApplicationsCardsView';
import { VendorsApplicationsMapView } from './VendorsApplicationsMapView';
import { VendorsApplicationsRowsView } from './VendorsApplicationsRowsView';
import { VendorsApplicationsSplitView } from './VendorsApplicationsSplitView';
import { VendorsApplicationsStandRequestsView } from './VendorsApplicationsStandRequestsView';
import { VendorsApplicationsUndoToast } from './VendorsApplicationsUndoToast';
import { VendorsApplicationsCascadeView } from './VendorsApplicationsCascadeView';
import { VendorsApplicationsStandGroupsView } from './VendorsApplicationsStandGroupsView';
import { VendorsApplicationsToolbarView } from './VendorsApplicationsToolbarView';

interface VendorsApplicationsViewProps {
  applications: VendorApplication[];
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  dismissStatusChange: () => void;
  lastStatusChange: VendorApplicationStatusChange | null;
  loading: boolean;
  savingStatusApplicationId: string | null;
  setApplicationStatus: (applicationId: string, status: VendorApplicationStatus) => Promise<void>;
  standAssignment: Omit<VendorApplicationStandAssignment, 'allApplications' | 'vendorStandIds'>;
  undoStatusChange: () => Promise<void>;
}

export const VendorsApplicationsView = ({
  applications,
  deleteApplication,
  deletingApplicationId,
  dismissStatusChange,
  lastStatusChange,
  loading,
  savingStatusApplicationId,
  setApplicationStatus,
  standAssignment: standAssignmentActions,
  undoStatusChange
}: VendorsApplicationsViewProps) => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const vendorStandIds = useMemo(() => {
    const parsedStands = parseHallStands();

    return parsedStands.success ? parsedStands.data.filter(isVendorStand).map(({ index }) => index) : [];
  }, []);
  const standAssignment = { ...standAssignmentActions, allApplications: applications, vendorStandIds };
  const {
    closeApplication,
    filters,
    flagsByApplicationId,
    hasActiveFilters,
    openApplication,
    openApplicationRecord,
    resetFilters,
    setFilter,
    setViewMode,
    standFilterOptions,
    statusCounts,
    viewMode,
    visibleApplications
  } = useVendorsApplicationsToolbar(applications, t.i18n.language);
  const translate = (translationKey: string, options?: Record<string, unknown>) =>
    t(translationKey as never, options as never);
  const resolveCategoryLabel = (categoryKey: NonNullable<VendorApplication['mainCategory']>) =>
    t(`vendorsFormPage.steps.mainCategory.${categoryKey}` as const);
  const viewValues = {
    no: t('vendorsApplicationsPage.values.no'),
    noAnswer: t('vendorsApplicationsPage.values.noAnswer'),
    noneSelected: t('vendorsApplicationsPage.values.noneSelected'),
    notAssigned: t('vendorsApplicationsPage.values.notAssigned'),
    notProvided: t('vendorsApplicationsPage.values.notProvided'),
    yes: t('vendorsApplicationsPage.values.yes')
  };

  if (loading) {
    return <ApplicationsEmpty>{t('vendorsApplicationsPage.loading')}</ApplicationsEmpty>;
  }

  if (applications.length === 0) {
    return <ApplicationsEmpty>{t('vendorsApplicationsPage.empty')}</ApplicationsEmpty>;
  }

  const isListView = VENDOR_APPLICATIONS_LIST_VIEW_MODES.includes(viewMode);
  const isFiltered = isListView && visibleApplications.length !== applications.length;

  return (
    <ApplicationsSection>
      <ApplicationsMeta>
        {isFiltered
          ? t('vendorsApplicationsPage.toolbar.visibleCount', {
              total: applications.length,
              visible: visibleApplications.length
            })
          : t('vendorsApplicationsPage.savedCount', { count: applications.length })}
      </ApplicationsMeta>
      <ApplicationsToolbar>
        <ApplicationActionButton aria-pressed={viewMode === 'rows'} type="button" onClick={() => setViewMode('rows')}>
          {t('vendorsApplicationsPage.showRows')}
        </ApplicationActionButton>
        <ApplicationActionButton aria-pressed={viewMode === 'split'} type="button" onClick={() => setViewMode('split')}>
          {t('vendorsApplicationsPage.showSplit')}
        </ApplicationActionButton>
        <ApplicationActionButton aria-pressed={viewMode === 'cards'} type="button" onClick={() => setViewMode('cards')}>
          {t('vendorsApplicationsPage.showCards')}
        </ApplicationActionButton>
        <ApplicationActionButton aria-pressed={viewMode === 'map'} type="button" onClick={() => setViewMode('map')}>
          {t('vendorsApplicationsPage.showMap')}
        </ApplicationActionButton>
        <ApplicationActionButton
          aria-pressed={viewMode === 'cascade'}
          type="button"
          onClick={() => setViewMode('cascade')}
        >
          {t('vendorsApplicationsPage.showCascadeStandAllocation')}
        </ApplicationActionButton>
        <ApplicationActionButton
          aria-pressed={viewMode === 'stands'}
          type="button"
          onClick={() => setViewMode('stands')}
        >
          {t('vendorsApplicationsPage.showByStand')}
        </ApplicationActionButton>
      </ApplicationsToolbar>

      {viewMode === 'map' ? (
        <ApplicationsMapLayout>
          <ApplicationsMapPanelSlot>
            <VendorsApplicationsMapView
              applications={applications}
              multiplier={isPhone ? VENDOR_APPLICATIONS_MAP_PHONE_MULTIPLIER : VENDOR_APPLICATIONS_MAP_MULTIPLIER}
              selectStand={(standId) => setFilter('standId', standId)}
              selectedStandId={filters.standId}
              translate={translate}
            />
          </ApplicationsMapPanelSlot>
          <ApplicationsMapSide>
            <VendorsApplicationsStandRequestsView
              applications={applications}
              locale={t.i18n.language}
              resolvePriorityLabel={(priority) => t(`vendorsApplicationsPage.priorities.${priority}` as const)}
              selectedStandId={filters.standId}
              translate={translate}
            />
          </ApplicationsMapSide>
        </ApplicationsMapLayout>
      ) : null}

      {viewMode === 'cascade' ? (
        <VendorsApplicationsCascadeView
          algorithmSteps={[
            t('vendorsApplicationsPage.cascadeAlgorithm.steps.acceptVendors'),
            t('vendorsApplicationsPage.cascadeAlgorithm.steps.sortAccepted'),
            t('vendorsApplicationsPage.cascadeAlgorithm.steps.checkPreferences'),
            t('vendorsApplicationsPage.cascadeAlgorithm.steps.sendToManualNegotiation'),
            t('vendorsApplicationsPage.cascadeAlgorithm.steps.confirmedAssignments'),
            t('vendorsApplicationsPage.cascadeAlgorithm.steps.nextIterations')
          ]}
          algorithmTitle={t('vendorsApplicationsPage.cascadeAlgorithm.title')}
          allocatedStandLabel={t('vendorsApplicationsPage.fields.allocatedStand')}
          applications={applications}
          locale={t.i18n.language}
          manualNegotiationTitle={t('vendorsApplicationsPage.manualNegotiation.title')}
          noneSelectedLabel={t('vendorsApplicationsPage.values.noneSelected')}
          notAssignedLabel={t('vendorsApplicationsPage.values.notAssigned')}
          preferredStandsLabel={t('vendorsApplicationsPage.fields.preferredStands')}
        />
      ) : null}

      {viewMode === 'stands' ? (
        <VendorsApplicationsStandGroupsView
          applications={applications}
          locale={t.i18n.language}
          resolvePriorityLabel={(priority) => t(`vendorsApplicationsPage.priorities.${priority}` as const)}
        />
      ) : null}

      {isListView ? (
        <>
          <VendorsApplicationsToolbarView
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
            resolveCategoryLabel={resolveCategoryLabel}
            setFilter={setFilter}
            standFilterOptions={standFilterOptions}
            statusCounts={statusCounts}
            totalCount={applications.length}
            translate={translate}
          />
          {visibleApplications.length === 0 ? (
            <ApplicationsEmpty>{t('vendorsApplicationsPage.toolbar.noMatches')}</ApplicationsEmpty>
          ) : viewMode === 'rows' ? (
            <VendorsApplicationsRowsView
              allApplications={applications}
              applications={visibleApplications}
              flagsByApplicationId={flagsByApplicationId}
              locale={t.i18n.language}
              openApplication={openApplication}
              openApplicationId={openApplicationRecord?.id ?? null}
              resolveCategoryLabel={resolveCategoryLabel}
              translate={translate}
              values={viewValues}
            />
          ) : viewMode === 'split' ? (
            <VendorsApplicationsSplitView
              allApplications={applications}
              applications={visibleApplications}
              flagsByApplicationId={flagsByApplicationId}
              locale={t.i18n.language}
              mapMultiplier={VENDOR_APPLICATIONS_SPLIT_MAP_MULTIPLIER}
              openApplication={openApplication}
              openApplicationId={openApplicationRecord?.id ?? null}
              resolveCategoryLabel={resolveCategoryLabel}
              selectStand={(standId) => setFilter('standId', standId)}
              selectedStandId={filters.standId}
              translate={translate}
              values={viewValues}
            />
          ) : (
            <VendorsApplicationsCardsView
              applications={visibleApplications}
              deleteApplication={deleteApplication}
              deletingApplicationId={deletingApplicationId}
              flagsByApplicationId={flagsByApplicationId}
              locale={t.i18n.language}
              resolveCategoryLabel={resolveCategoryLabel}
              savingStatusApplicationId={savingStatusApplicationId}
              setApplicationStatus={setApplicationStatus}
              standAssignment={standAssignment}
              translate={translate}
              values={viewValues}
            />
          )}
        </>
      ) : null}

      <VendorApplicationDetailsDrawer
        application={openApplicationRecord}
        closeApplication={closeApplication}
        deleteApplication={deleteApplication}
        deletingApplicationId={deletingApplicationId}
        flags={openApplicationRecord ? (flagsByApplicationId.get(openApplicationRecord.id) ?? []) : []}
        locale={t.i18n.language}
        resolveCategoryLabel={resolveCategoryLabel}
        savingStatusApplicationId={savingStatusApplicationId}
        setApplicationStatus={setApplicationStatus}
        standAssignment={standAssignment}
        translate={translate}
        values={viewValues}
      />

      {lastStatusChange ? (
        <VendorsApplicationsUndoToast
          actionLabel={t('vendorsApplicationsPage.statusUndo.action')}
          dismissLabel={t('vendorsApplicationsPage.statusUndo.dismiss')}
          message={t('vendorsApplicationsPage.statusUndo.message', {
            name: lastStatusChange.storeName,
            status: t(`vendorsApplicationsPage.statuses.${lastStatusChange.status}` as const)
          })}
          onAction={() => {
            void undoStatusChange();
          }}
          onDismiss={dismissStatusChange}
        />
      ) : null}
    </ApplicationsSection>
  );
};
