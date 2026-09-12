import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { UnprefixedTranslationKeys } from '../../../../translations/useTypedTranslation';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { WorkshopFormNumberFieldName, WorkshopFormViewProps } from '../components/workshopFormViewContracts';
import { createWorkshopApplication } from '../../../../domain/workshopApplications/workshopsApplicationsStorage.ts';
import {
  WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH,
  WORKSHOP_FORM_DRAFT_STORAGE_KEY,
  WORKSHOP_FORM_LOGO_MAX_BYTES,
  WORKSHOP_FORM_LOGO_MAX_DIMENSION
} from '../../../../domain/workshopApplications/workshopFormConstants.ts';
import {
  collectWorkshopFormValidationErrors,
  workshopFormValidationSchema,
  type WorkshopFormValues
} from '../../../../domain/workshopApplications/workshopFormSchema.ts';
import {
  LogoTooLargeError,
  prepareLogoForUpload
} from '../../../../domain/workshopApplications/workshopFormLogoUtils.ts';
import { createEmptyWorkshopFormDraft, parseStoredWorkshopFormDraft } from '../workshopFormStorage.ts';

const readStoredWorkshopFormDraftOrCreateEmptyDraft = () =>
  parseStoredWorkshopFormDraft(window.localStorage.getItem(WORKSHOP_FORM_DRAFT_STORAGE_KEY)) ??
  createEmptyWorkshopFormDraft();

export const useWorkshopForm = (): WorkshopFormViewProps => {
  const t = useTypedTranslation();
  const [initialDraft] = useState(readStoredWorkshopFormDraftOrCreateEmptyDraft);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof WorkshopFormValues, string>>>({});

  const form = useForm<WorkshopFormValues>({
    defaultValues: initialDraft.formData,
    mode: 'onSubmit',
    resolver: zodResolver(workshopFormValidationSchema)
  });

  const { formState, getValues, register, reset, setValue, trigger, watch } = form;
  const formData = watch();

  const markFormAsIncompleteAndClearSubmitError = () => {
    setIsComplete(false);
    setSubmitError('');
  };

  useEffect(() => {
    if (isComplete) {
      window.localStorage.removeItem(WORKSHOP_FORM_DRAFT_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(WORKSHOP_FORM_DRAFT_STORAGE_KEY, JSON.stringify({ formData, isComplete }));
  }, [formData, isComplete]);

  const submittedAtLabel = useMemo(() => {
    if (!submittedAt) {
      return null;
    }

    return new Intl.DateTimeFormat(t.i18n.language, {
      dateStyle: 'long',
      timeStyle: 'medium'
    }).format(new Date(submittedAt));
  }, [submittedAt, t.i18n.language]);

  useEffect(() => {
    if (!hasAttemptedSubmit) {
      return;
    }

    setValidationErrors(collectWorkshopFormValidationErrors(formData));
  }, [formData, hasAttemptedSubmit]);

  const updateDescription = (value: string) => {
    setValue('description', value.slice(0, WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH), {
      shouldDirty: true,
      shouldValidate: true
    });
    markFormAsIncompleteAndClearSubmitError();
  };

  const setNumberFieldValue = (fieldName: WorkshopFormNumberFieldName, value: number | null) => {
    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
    markFormAsIncompleteAndClearSubmitError();
  };

  const setExperienceLevel: WorkshopFormViewProps['formActions']['setExperienceLevel'] = (experienceLevel) => {
    setValue('experienceLevel', experienceLevel, { shouldDirty: true, shouldValidate: true });
    markFormAsIncompleteAndClearSubmitError();
  };

  const setContractType: WorkshopFormViewProps['formActions']['setContractType'] = (contractType) => {
    setValue('contractType', contractType, { shouldDirty: true, shouldValidate: true });

    if (contractType !== 'other') {
      setValue('contractTypeOther', '', { shouldDirty: true, shouldValidate: true });
    }

    markFormAsIncompleteAndClearSubmitError();
  };

  const updateLogoFile = async (file: File | null) => {
    if (!file) {
      setValue('logoFileName', null, { shouldDirty: true, shouldValidate: true });
      setValue('logoDataUrl', null, { shouldDirty: true, shouldValidate: true });
      setValue('logoMimeType', null, { shouldDirty: true, shouldValidate: true });
      markFormAsIncompleteAndClearSubmitError();
      return;
    }

    setIsLoadingLogo(true);

    try {
      const preparedLogo = await prepareLogoForUpload(
        file,
        WORKSHOP_FORM_LOGO_MAX_BYTES,
        WORKSHOP_FORM_LOGO_MAX_DIMENSION
      );

      setValue('logoFileName', file.name, { shouldDirty: true, shouldValidate: true });
      setValue('logoDataUrl', preparedLogo.dataUrl, { shouldDirty: true, shouldValidate: true });
      setValue('logoMimeType', preparedLogo.mimeType, { shouldDirty: true, shouldValidate: true });
      markFormAsIncompleteAndClearSubmitError();
    } catch (error) {
      console.error(error);
      setSubmitError(
        t(
          error instanceof LogoTooLargeError
            ? 'workshopsFormPage.logoTooLargeError'
            : 'workshopsFormPage.logoUploadError'
        )
      );
    } finally {
      setIsLoadingLogo(false);
    }
  };

  const submitWorkshopForm = async () => {
    setHasAttemptedSubmit(true);
    setSubmitError('');
    const nextValidationErrors = collectWorkshopFormValidationErrors(getValues());
    setValidationErrors(nextValidationErrors);

    const isValid = Object.keys(nextValidationErrors).length === 0 && (await trigger());

    if (!isValid) {
      return;
    }

    const validatedFormData = getValues();

    setIsSubmitting(true);

    try {
      const response = await createWorkshopApplication(validatedFormData);

      setSubmittedAt(response.application.submittedAt);
      setIsComplete(true);
      reset(validatedFormData);
    } catch (error) {
      console.error(error);
      setSubmitError(t('workshopsFormPage.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolveFieldErrorMessage = (...fieldNames: Array<keyof WorkshopFormValues>): string => {
    if (!hasAttemptedSubmit) {
      return '';
    }

    for (const fieldName of fieldNames) {
      const messageKey = validationErrors[fieldName] ?? formState.errors[fieldName]?.message;

      if (typeof messageKey === 'string') {
        return t(messageKey as UnprefixedTranslationKeys);
      }
    }

    return '';
  };

  return {
    formActions: {
      setContractType,
      setExperienceLevel,
      setNumberFieldValue,
      submitWorkshopForm,
      updateDescription,
      updateLogoFile
    },
    formBindings: {
      formData,
      register,
      resolveFieldErrorMessage
    },
    formStatus: {
      isComplete,
      isLoadingLogo,
      isSubmitting,
      submitError,
      submittedAtLabel
    }
  };
};
