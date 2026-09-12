import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { WorkshopFormView } from './components/WorkshopFormView';
import { useWorkshopForm } from './hooks/useWorkshopForm';
import { AdminPageLayout } from '../../admin/AdminPageLayout';

export const WorkshopFormPage = () => {
  const t = useTypedTranslation();
  const workshopFormViewProps = useWorkshopForm();

  return (
    <AdminPageLayout kicker={t('workshopsFormPage.kicker')} title={t('workshopsFormPage.title')}>
      <WorkshopFormView {...workshopFormViewProps} />
    </AdminPageLayout>
  );
};
