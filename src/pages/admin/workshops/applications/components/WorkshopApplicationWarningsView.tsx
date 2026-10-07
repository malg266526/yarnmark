import React from 'react';
import { ApplicationWarningList, ApplicationWarningTag } from '../WorkshopsApplicationsPage.styled';
import type { WorkshopApplicationWarning } from '../utils/workshopScheduleUtils';

interface WorkshopApplicationWarningsViewProps {
  emptyLabel?: string;
  translate: (translationKey: string) => string;
  warnings: WorkshopApplicationWarning[];
}

export const WorkshopApplicationWarningsView = ({
  emptyLabel,
  translate,
  warnings
}: WorkshopApplicationWarningsViewProps) =>
  warnings.length === 0 ? (
    emptyLabel ? (
      <span>{emptyLabel}</span>
    ) : null
  ) : (
    <ApplicationWarningList>
      {warnings.map((warning) => (
        <ApplicationWarningTag key={warning} title={translate(`workshopsApplicationsPage.warnings.${warning}.detail`)}>
          {translate(`workshopsApplicationsPage.warnings.${warning}.label`)}
        </ApplicationWarningTag>
      ))}
    </ApplicationWarningList>
  );
