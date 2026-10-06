import React from 'react';
import {
  ApplicationActionButton,
  ApplicationsEmpty,
  ApplicationsMeta,
  ApplicationsSection,
  ApplicationsToolbar
} from '../VendorsApplicationsPage.styled';
import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { useTypedTranslation } from '../../../../../translations/useTypedTranslation';
import { useVendorsApplicationsToolbar } from '../hooks/useVendorsApplicationsToolbar';
import { VendorsApplicationsCardsView } from './VendorsApplicationsCardsView';
import { VendorsApplicationsCascadeView } from './VendorsApplicationsCascadeView';
import { VendorsApplicationsStandGroupsView } from './VendorsApplicationsStandGroupsView';
import { VendorsApplicationsToolbarView } from './VendorsApplicationsToolbarView';

interface VendorsApplicationsViewProps {
  applications: VendorApplication[];
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  loading: boolean;
  setApplicationStatus: (applicationId: string, status: VendorApplicationStatus) => Promise<void>;
}

export const VendorsApplicationsView = ({
  applications,
  deleteApplication,
  deletingApplicationId,
  loading,
  setApplicationStatus
}: VendorsApplicationsViewProps) => {
  const t = useTypedTranslation();
  const {
    filters,
    hasActiveFilters,
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

  const isFiltered = viewMode === 'cards' && visibleApplications.length !== applications.length;

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
        <ApplicationActionButton aria-pressed={viewMode === 'cards'} type="button" onClick={() => setViewMode('cards')}>
          {t('vendorsApplicationsPage.showCards')}
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

      {viewMode === 'cards' ? (
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
          ) : (
            <VendorsApplicationsCardsView
              applications={visibleApplications}
              deleteApplication={deleteApplication}
              deletingApplicationId={deletingApplicationId}
              locale={t.i18n.language}
              resolveCategoryLabel={resolveCategoryLabel}
              setApplicationStatus={setApplicationStatus}
              translate={translate}
              values={viewValues}
            />
          )}
        </>
      ) : null}
    </ApplicationsSection>
  );
};
