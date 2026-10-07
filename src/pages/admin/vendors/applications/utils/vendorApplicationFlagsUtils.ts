import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { VENDOR_FORM_MAX_PREFERRED_STANDS } from '../../../../../domain/vendorApplications/vendorFormConstants.ts';
import { resolveStandType } from '../../../../../domain/vendorApplications/vendorStandTypeUtils.ts';

// Only signals the submission form cannot enforce: duplicates span several applications,
// and the form accepts one or two preferred stands of any type.
export const VENDOR_APPLICATION_FLAGS = [
  'duplicateEmail',
  'duplicateStoreName',
  'incompletePreferences',
  'singleStandType'
] as const;

export type VendorApplicationFlag = (typeof VENDOR_APPLICATION_FLAGS)[number];

type NormalizedValueCounts = ReadonlyMap<string, number>;

interface VendorApplicationFlagContext {
  application: VendorApplication;
  emailCounts: NormalizedValueCounts;
  storeNameCounts: NormalizedValueCounts;
}

const normalizeValue = (value: string) => value.trim().toLowerCase();

const countNormalizedValues = (
  applications: VendorApplication[],
  selectValue: (application: VendorApplication) => string
): NormalizedValueCounts =>
  applications.reduce((valueCounts, application) => {
    const value = normalizeValue(selectValue(application));

    return value ? valueCounts.set(value, (valueCounts.get(value) ?? 0) + 1) : valueCounts;
  }, new Map<string, number>());

const isDuplicated = (valueCounts: NormalizedValueCounts, value: string) =>
  (valueCounts.get(normalizeValue(value)) ?? 0) > 1;

const hasSingleStandType = (preferredStands: string[]) => {
  const uniqueStandIds = [...new Set(preferredStands)];
  const standTypes = uniqueStandIds.flatMap((standId) => resolveStandType(standId) ?? []);

  return uniqueStandIds.length > 1 && standTypes.length === uniqueStandIds.length && new Set(standTypes).size === 1;
};

const FLAG_PREDICATES: Record<VendorApplicationFlag, (context: VendorApplicationFlagContext) => boolean> = {
  duplicateEmail: ({ application, emailCounts }) => isDuplicated(emailCounts, application.email),
  duplicateStoreName: ({ application, storeNameCounts }) => isDuplicated(storeNameCounts, application.storeName),
  incompletePreferences: ({ application }) =>
    new Set(application.preferredStands).size < VENDOR_FORM_MAX_PREFERRED_STANDS,
  singleStandType: ({ application }) => hasSingleStandType(application.preferredStands)
};

export const collectVendorApplicationFlags = (context: VendorApplicationFlagContext): VendorApplicationFlag[] =>
  VENDOR_APPLICATION_FLAGS.filter((flag) => FLAG_PREDICATES[flag](context));

export const buildVendorApplicationFlags = (
  applications: VendorApplication[]
): ReadonlyMap<string, VendorApplicationFlag[]> => {
  const emailCounts = countNormalizedValues(applications, ({ email }) => email);
  const storeNameCounts = countNormalizedValues(applications, ({ storeName }) => storeName);

  return new Map(
    applications.map((application) => [
      application.id,
      collectVendorApplicationFlags({ application, emailCounts, storeNameCounts })
    ])
  );
};
