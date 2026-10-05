export type VendorFormDraftStatus = 'none' | 'restored' | 'saved';

interface ResolveVendorFormDraftStatusInput {
  isComplete: boolean;
  isDirty: boolean;
  wasRestored: boolean;
}

export const resolveVendorFormDraftStatus = ({
  isComplete,
  isDirty,
  wasRestored
}: ResolveVendorFormDraftStatusInput): VendorFormDraftStatus => {
  if (isComplete) {
    return 'none';
  }

  if (isDirty) {
    return 'saved';
  }

  return wasRestored ? 'restored' : 'none';
};
