import React from 'react';
import {
  ApplicationActionButton,
  ApplicationsEmpty,
  ApplicationsMeta,
  ApplicationsSection,
  ApplicationsToolbar
} from '../WorkshopsApplicationsPage.styled';
import type {
  WorkshopApplication,
  WorkshopApplicationStatus,
  WorkshopSchedule
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';
import { useTypedTranslation } from '../../../../../translations/useTypedTranslation';
import { useWorkshopsApplicationsToolbar } from '../hooks/useWorkshopsApplicationsToolbar';
import { WorkshopApplicationDetailsDrawer } from './WorkshopApplicationDetailsDrawer';
import { WorkshopsApplicationsCardsView } from './WorkshopsApplicationsCardsView';
import { WorkshopsApplicationsRowsView } from './WorkshopsApplicationsRowsView';
import { WorkshopsApplicationsToolbarView } from './WorkshopsApplicationsToolbarView';
import { WorkshopsScheduleView } from './WorkshopsScheduleView';

interface WorkshopsApplicationsViewProps {
  applications: WorkshopApplication[];
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  loading: boolean;
  savingScheduleApplicationId: string | null;
  setApplicationSchedule: (applicationId: string, schedule: WorkshopSchedule | null) => Promise<void>;
  setApplicationStatus: (applicationId: string, status: WorkshopApplicationStatus) => Promise<void>;
}

export const WorkshopsApplicationsView = ({
  applications,
  deleteApplication,
  deletingApplicationId,
  loading,
  savingScheduleApplicationId,
  setApplicationSchedule,
  setApplicationStatus
}: WorkshopsApplicationsViewProps) => {
  const t = useTypedTranslation();
  const {
    closeApplication,
    filters,
    hasActiveFilters,
    openApplication,
    openApplicationRecord,
    resetFilters,
    setFilter,
    setViewMode,
    statusCounts,
    viewMode,
    visibleApplications,
    warningsByApplicationId
  } = useWorkshopsApplicationsToolbar(applications, t.i18n.language);
  const translate = (translationKey: string, options?: Record<string, unknown>) =>
    t(translationKey as never, options as never);

  if (loading) {
    return <ApplicationsEmpty>{t('workshopsApplicationsPage.loading')}</ApplicationsEmpty>;
  }

  if (applications.length === 0) {
    return <ApplicationsEmpty>{t('workshopsApplicationsPage.empty')}</ApplicationsEmpty>;
  }

  return (
    <ApplicationsSection>
      <ApplicationsMeta>
        {visibleApplications.length === applications.length
          ? t('workshopsApplicationsPage.savedCount', { count: applications.length })
          : t('workshopsApplicationsPage.toolbar.visibleCount', {
              total: applications.length,
              visible: visibleApplications.length
            })}
      </ApplicationsMeta>
      <ApplicationsToolbar>
        <ApplicationActionButton type="button" aria-pressed={viewMode === 'rows'} onClick={() => setViewMode('rows')}>
          {t('workshopsApplicationsPage.showRows')}
        </ApplicationActionButton>
        <ApplicationActionButton
          type="button"
          aria-pressed={viewMode === 'schedule'}
          onClick={() => setViewMode('schedule')}
        >
          {t('workshopsApplicationsPage.showSchedule')}
        </ApplicationActionButton>
        <ApplicationActionButton type="button" aria-pressed={viewMode === 'cards'} onClick={() => setViewMode('cards')}>
          {t('workshopsApplicationsPage.showCards')}
        </ApplicationActionButton>
      </ApplicationsToolbar>
      <WorkshopsApplicationsToolbarView
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
        setFilter={setFilter}
        statusCounts={statusCounts}
        totalCount={applications.length}
        translate={translate}
      />
      {visibleApplications.length === 0 ? (
        <ApplicationsEmpty>{t('workshopsApplicationsPage.toolbar.noMatches')}</ApplicationsEmpty>
      ) : viewMode === 'rows' ? (
        <WorkshopsApplicationsRowsView
          applications={visibleApplications}
          locale={t.i18n.language}
          openApplication={openApplication}
          openApplicationId={openApplicationRecord?.id ?? null}
          translate={translate}
          warningsByApplicationId={warningsByApplicationId}
        />
      ) : viewMode === 'schedule' ? (
        <WorkshopsScheduleView
          applications={visibleApplications}
          openApplication={openApplication}
          translate={translate}
          warningsByApplicationId={warningsByApplicationId}
        />
      ) : (
        <WorkshopsApplicationsCardsView
          applications={visibleApplications}
          deleteApplication={deleteApplication}
          deletingApplicationId={deletingApplicationId}
          locale={t.i18n.language}
          setApplicationStatus={setApplicationStatus}
          translate={translate}
          warningsByApplicationId={warningsByApplicationId}
        />
      )}
      <WorkshopApplicationDetailsDrawer
        application={openApplicationRecord}
        closeApplication={closeApplication}
        deleteApplication={deleteApplication}
        deletingApplicationId={deletingApplicationId}
        locale={t.i18n.language}
        savingSchedule={savingScheduleApplicationId === openApplicationRecord?.id}
        setApplicationSchedule={setApplicationSchedule}
        setApplicationStatus={setApplicationStatus}
        translate={translate}
        warnings={openApplicationRecord ? (warningsByApplicationId.get(openApplicationRecord.id) ?? []) : []}
      />
    </ApplicationsSection>
  );
};
