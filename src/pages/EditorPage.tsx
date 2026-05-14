import React from 'react';
import { Editor } from '../components/editor/Editor';
import { EditorProvider } from '../components/editor/EditorContext';
import { AdminPageLayout } from './admin/AdminPageLayout';

export const EditorPage = () => {
  return (
    <AdminPageLayout kicker="Admin" title="Editor">
      <EditorProvider>
        <Editor />
      </EditorProvider>
    </AdminPageLayout>
  );
};
