import React, { useState } from 'react';
import {
  ApplicationActionButton,
  ApplicationsEmpty,
  ApplicationsMeta,
  ApplicationsSection,
  ApplicationsToolbar
} from './VendorsApplicationsPage.styled';
import type { VendorApplication, VendorApplicationStatus } from '../vendor-form/vendorFormSubmission.ts';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { ApplicationsViewMode } from './vendorsApplicationsViewContracts';
import { VendorsApplicationsCardsView } from './VendorsApplicationsCardsView';
import { VendorsApplicationsCascadeView } from './VendorsApplicationsCascadeView';
import { VendorsApplicationsStandGroupsView } from './VendorsApplicationsStandGroupsView';

interface VendorsApplicationsViewProps {
  applications: VendorApplication[];
  loading: boolean;
  setApplicationStatus: (applicationId: string, status: VendorApplicationStatus) => Promise<void>;
}

export const VendorsApplicationsView = ({
  applications,
  loading,
  setApplicationStatus
}: VendorsApplicationsViewProps) => {
  const t = useTypedTranslation();
  const [viewMode, setViewMode] = useState<ApplicationsViewMode>('cards');
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

  return (
    <ApplicationsSection>
      <ApplicationsMeta>{t('vendorsApplicationsPage.savedCount', { count: applications.length })}</ApplicationsMeta>
      <ApplicationsToolbar>
        {viewMode !== 'cards' ? (
          <ApplicationActionButton type="button" onClick={() => setViewMode('cards')}>
            {t('vendorsApplicationsPage.showCards')}
          </ApplicationActionButton>
        ) : null}
        {viewMode !== 'cascade' ? (
          <ApplicationActionButton type="button" onClick={() => setViewMode('cascade')}>
            {t('vendorsApplicationsPage.showCascadeStandAllocation')}
          </ApplicationActionButton>
        ) : null}
        {viewMode !== 'stands' ? (
          <ApplicationActionButton type="button" onClick={() => setViewMode('stands')}>
            {t('vendorsApplicationsPage.showByStand')}
          </ApplicationActionButton>
        ) : null}
      </ApplicationsToolbar>

      {viewMode === 'cascade' ? (
        <VendorsApplicationsCascadeView
          allocatedStandLabel={t('vendorsApplicationsPage.fields.allocatedStand')}
          applications={applications}
          locale={t.i18n.language}
          manualNegotiationTitle={t('vendorsApplicationsPage.manualNegotiation.title')}
          noneSelectedLabel={t('vendorsApplicationsPage.values.noneSelected')}
          notAssignedLabel={t('vendorsApplicationsPage.values.notAssigned')}
          preferredStandsLabel={t('vendorsApplicationsPage.fields.preferredStands')}
          title={t('vendorsApplicationsPage.acceptedQueue.title')}
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
        <VendorsApplicationsCardsView
          applications={applications}
          locale={t.i18n.language}
          resolveCategoryLabel={(categoryKey) => t(`vendorsFormPage.steps.mainCategory.${categoryKey}` as const)}
          setApplicationStatus={setApplicationStatus}
          translate={(translationKey) => t(translationKey as never)}
          values={viewValues}
        />
      ) : null}
    </ApplicationsSection>
  );
};
