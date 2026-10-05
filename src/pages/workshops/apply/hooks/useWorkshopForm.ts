import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import type { UnprefixedTranslationKeys } from '../../../../translations/useTypedTranslation';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { WorkshopFormNumberFieldName, WorkshopFormViewProps } from '../components/workshopFormViewContracts';
import { submitWorkshopApplicationToApi } from '../../../../domain/workshopApplications/workshopFormApi.ts';
import {
  WORKSHOP_FORM_DESCRIPTION_MAX_LENGTH,
  WORKSHOP_FORM_DRAFT_STORAGE_KEY,
  WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES,
  WORKSHOP_FORM_LOGO_MAX_BYTES,
  WORKSHOP_FORM_LOGO_MAX_DIMENSION
} from '../../../../domain/workshopApplications/workshopFormConstants.ts';
import {
  collectWorkshopFormValidationErrors,
  workshopFormValidationSchema,
  type WorkshopFormValues
} from '../../../../domain/workshopApplications/workshopFormSchema.ts';
import {
  prepareLogoForUpload,
  type LogoRejectionReason
} from '../../../../domain/workshopApplications/workshopFormLogoUtils.ts';
import {
  INITIAL_WORKSHOP_FORM_STATE,
  type WorkshopFormState
} from '../../../../domain/workshopApplications/workshopFormTypes.ts';
import { focusFirstInvalidField } from '../../../../components/form/formFocus.ts';
import { isFormDraftRestorable, resolveFormDraftStatus } from '../../../../components/form/formDraftStatusUtils.ts';
import { createEmptyWorkshopFormDraft, parseStoredWorkshopFormDraft } from '../workshopFormStorage.ts';

const WORKSHOP_FORM_FIELD_ATTRIBUTE = 'data-workshop-form-field';

const readInitialWorkshopFormDraft = () => {
  const storedDraft = parseStoredWorkshopFormDraft(window.localStorage.getItem(WORKSHOP_FORM_DRAFT_STORAGE_KEY));

  return {
    draft: storedDraft ?? createEmptyWorkshopFormDraft(),
    wasRestored: isFormDraftRestorable(storedDraft, INITIAL_WORKSHOP_FORM_STATE)
  };
};

const LOGO_REJECTION_MESSAGE_KEYS: Record<LogoRejectionReason, UnprefixedTranslationKeys> = {
  unsupportedFormat: 'workshopsFormPage.logoUnsupportedFormatError',
  tooLarge: 'workshopsFormPage.logoTooLargeError',
  readFailed: 'workshopsFormPage.logoUploadError'
};

export const useWorkshopForm = (): WorkshopFormViewProps => {
  const t = useTypedTranslation();
  const [{ draft: initialDraft, wasRestored: wasDraftRestored }] = useState(readInitialWorkshopFormDraft);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(initialDraft.isComplete);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [submittedFormData, setSubmittedFormData] = useState<WorkshopFormState | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof WorkshopFormValues, string>>>({});

  const form = useForm<WorkshopFormValues>({
    defaultValues: initialDraft.formData,
    mode: 'onSubmit',
    resolver: zodResolver(workshopFormValidationSchema) as Resolver<WorkshopFormValues>
  });

  const { formState, getValues, register, reset, setValue, trigger, watch } = form;
  const formData = watch();
  const draftStatus = resolveFormDraftStatus({
    isComplete,
    isDirty: formState.isDirty,
    wasRestored: wasDraftRestored
  });

  useEffect(() => {
    if (formState.isDirty) {
      setIsComplete(false);
    }
  }, [formState.isDirty]);

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

    const nextValidationErrors = collectWorkshopFormValidationErrors(formData);

    setValidationErrors((currentValidationErrors) =>
      JSON.stringify(currentValidationErrors) === JSON.stringify(nextValidationErrors)
        ? currentValidationErrors
        : nextValidationErrors
    );
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

  const setLogoValues = (logo: { fileName: string; dataUrl: string; mimeType: string } | null) => {
    setValue('logoFileName', logo?.fileName ?? null, { shouldDirty: true });
    setValue('logoDataUrl', logo?.dataUrl ?? null, { shouldDirty: true });
    setValue('logoMimeType', logo?.mimeType ?? null, { shouldDirty: true });
    void trigger(['logoFileName', 'logoDataUrl', 'logoMimeType']);
    markFormAsIncompleteAndClearSubmitError();
  };

  const updateLogoFile = async (file: File | null) => {
    if (!file) {
      setLogoValues(null);
      return;
    }

    setIsLoadingLogo(true);

    const result = await prepareLogoForUpload(file, {
      acceptedMimeTypes: WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES,
      maxBytes: WORKSHOP_FORM_LOGO_MAX_BYTES,
      maxDimension: WORKSHOP_FORM_LOGO_MAX_DIMENSION
    });

    setIsLoadingLogo(false);

    if (result.status === 'rejected') {
      if (result.cause) {
        console.error(result.cause);
      }

      setSubmitError(t(LOGO_REJECTION_MESSAGE_KEYS[result.reason]));
      return;
    }

    setLogoValues({ fileName: file.name, ...result.logo });
  };

  const submitWorkshopForm = async () => {
    if (isLoadingLogo) {
      return;
    }

    setHasAttemptedSubmit(true);
    setSubmitError('');
    const nextValidationErrors = collectWorkshopFormValidationErrors(getValues());
    setValidationErrors(nextValidationErrors);

    const isValid = Object.keys(nextValidationErrors).length === 0 && (await trigger());

    if (!isValid) {
      focusFirstInvalidField(WORKSHOP_FORM_FIELD_ATTRIBUTE, Object.keys(nextValidationErrors));
      return;
    }

    const validatedFormData = getValues();

    setIsSubmitting(true);

    try {
      setSubmittedAt(await submitWorkshopApplicationToApi(validatedFormData));
      setSubmittedFormData(validatedFormData);
      setIsComplete(true);
      setIsSuccessModalOpen(true);
      setHasAttemptedSubmit(false);
      setValidationErrors({});
      reset(INITIAL_WORKSHOP_FORM_STATE);
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

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return {
    formActions: {
      closeSuccessModal,
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
      draftStatus,
      isLoadingLogo,
      isSuccessModalOpen,
      isSubmitting,
      submitError,
      submittedFormData,
      submittedAtLabel
    }
  };
};
