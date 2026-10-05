export type FormDraftStatus = 'none' | 'restored' | 'saved';

interface StoredFormDraft<TFormData extends object> {
  formData: TFormData;
  isComplete: boolean;
}

export const isFormDraftRestorable = <TFormData extends object>(
  storedDraft: StoredFormDraft<TFormData> | null,
  initialFormData: TFormData
): boolean => {
  if (!storedDraft || storedDraft.isComplete) {
    return false;
  }

  return (Object.keys(initialFormData) as Array<keyof TFormData>).some(
    (fieldName) => JSON.stringify(storedDraft.formData[fieldName]) !== JSON.stringify(initialFormData[fieldName])
  );
};

interface ResolveFormDraftStatusInput {
  isComplete: boolean;
  isDirty: boolean;
  wasRestored: boolean;
}

export const resolveFormDraftStatus = ({
  isComplete,
  isDirty,
  wasRestored
}: ResolveFormDraftStatusInput): FormDraftStatus => {
  if (isComplete) {
    return 'none';
  }

  if (isDirty) {
    return 'saved';
  }

  return wasRestored ? 'restored' : 'none';
};
