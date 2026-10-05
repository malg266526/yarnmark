import React, { useEffect, useRef } from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES } from '../../../../domain/workshopApplications/workshopFormConstants.ts';
import { LogoPreview } from '../../../../components/form/LogoPreview';
import { FormField } from '../../../../components/form/FormField';
import { FieldHint } from '../../../../components/form/FormField.styled';
import { DownloadActions, Fieldset, FormSection, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormActions, WorkshopFormBindings, WorkshopFormStatusState } from './workshopFormViewContracts';

const LOGO_FILE_NAME_ERROR_ID = 'workshop-logo-file-name-error';

interface WorkshopFormLogoSectionProps {
  formActions: Pick<WorkshopFormActions, 'updateLogoFile'>;
  formBindings: WorkshopFormBindings;
  formStatus: Pick<WorkshopFormStatusState, 'isLoadingLogo'>;
}

export const WorkshopFormLogoSection = ({ formActions, formBindings, formStatus }: WorkshopFormLogoSectionProps) => {
  const t = useTypedTranslation();
  const { formData, resolveFieldErrorMessage } = formBindings;
  const logoFileNameError = resolveFieldErrorMessage('logoFileName');
  const { isLoadingLogo } = formStatus;
  const { updateLogoFile } = formActions;
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formData.logoFileName && logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  }, [formData.logoFileName]);

  return (
    <FormSection>
      <Fieldset>
        <Typography size="xl">{t('workshopsFormPage.steps.logo.title')}</Typography>
        <FormField
          htmlFor="logo_file"
          label={t('workshopsFormPage.steps.logo.label')}
          requirement="required"
          error={logoFileNameError}
          errorId={LOGO_FILE_NAME_ERROR_ID}
        >
          <TextInput
            ref={logoInputRef}
            id="logo_file"
            data-workshop-form-field="logoFileName"
            aria-invalid={Boolean(logoFileNameError)}
            aria-describedby={logoFileNameError ? LOGO_FILE_NAME_ERROR_ID : undefined}
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
        {formData.logoDataUrl ? (
          <LogoPreview
            logoDataUrl={formData.logoDataUrl}
            logoFileName={formData.logoFileName}
            isDisabled={isLoadingLogo}
            onChange={() => logoInputRef.current?.click()}
            onRemove={() => void updateLogoFile(null)}
          />
        ) : null}
      </Fieldset>
    </FormSection>
  );
};
