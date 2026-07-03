import React from 'react';
import { Editor } from '../components/editor/Editor';
import { EditorProvider } from '../components/editor/EditorContext';
import { AdminPageLayout } from './admin/AdminPageLayout';
import { useTypedTranslation } from '../translations/useTypedTranslation';

export const EditorPage = () => {
  const t = useTypedTranslation();

  return (
    <AdminPageLayout kicker={t('editorPage.kicker')} title={t('editorPage.title')}>
      <EditorProvider>
        <Editor />
      </EditorProvider>
    </AdminPageLayout>
  );
};
