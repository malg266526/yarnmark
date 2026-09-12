import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  DownloadActions,
  ErrorText,
  FieldHint,
  FieldLabel,
  Fieldset,
  FormSection,
  TextInput
} from '../WorkshopFormPage.styled';
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
        <FieldLabel htmlFor="logo_file">
          {t('workshopsFormPage.steps.logo.label')}
          <TextInput
            id="logo_file"
            type="file"
            accept="image/*"
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
        </FieldLabel>
        {resolveFieldErrorMessage('logoFileName') ? (
          <ErrorText>{resolveFieldErrorMessage('logoFileName')}</ErrorText>
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
