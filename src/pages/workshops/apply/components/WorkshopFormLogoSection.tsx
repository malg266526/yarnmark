import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES } from '../../../../domain/workshopApplications/workshopFormConstants.ts';
import { FormField } from '../../../../components/form/FormField';
import { FieldHint } from '../../../../components/form/FormField.styled';
import { DownloadActions, Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormActions, WorkshopFormBindings, WorkshopFormStatusState } from './workshopFormViewContracts';

interface WorkshopFormLogoSectionProps {
  formActions: Pick<WorkshopFormActions, 'updateLogoFile'>;
  formBindings: WorkshopFormBindings;
  formStatus: Pick<WorkshopFormStatusState, 'isLoadingLogo'>;
}

export const WorkshopFormLogoSection = ({ formActions, formBindings, formStatus }: WorkshopFormLogoSectionProps) => {
  const t = useTypedTranslation();
  const { formData, resolveFieldErrorMessage } = formBindings;
  const { isLoadingLogo } = formStatus;
  const { updateLogoFile } = formActions;

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.logo.title')}</Typography>
        <FormField
          htmlFor="logo_file"
          label={t('workshopsFormPage.steps.logo.label')}
          requirement="required"
          error={resolveFieldErrorMessage('logoFileName')}
        >
          <TextInput
            id="logo_file"
            type="file"
            accept={WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES.join(',')}
            disabled={isLoadingLogo}
            onChange={(event) => {
              void updateLogoFile(event.target.files?.[0] ?? null);
            }}
          />
          <FieldHint>
            {isLoadingLogo
              ? t('workshopsFormPage.logoLoading')
              : (formData.logoFileName ?? t('workshopsFormPage.steps.logo.hint'))}
          </FieldHint>
          {formData.logoDataUrl ? (
            <DownloadActions>
              <FieldHint>{t('workshopsFormPage.steps.logo.savedHint')}</FieldHint>
            </DownloadActions>
          ) : null}
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
