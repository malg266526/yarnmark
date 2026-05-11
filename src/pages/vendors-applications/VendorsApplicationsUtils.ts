import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';

export interface BooleanLabels {
  no: string;
  noAnswer: string;
  yes: string;
}

export const formatBoolean = (value: boolean | null, labels: BooleanLabels) => {
  if (value === null) {
    return labels.noAnswer;
  }

  return value ? labels.yes : labels.no;
};

export const formatMainCategory = (
  application: VendorApplication,
  resolveCategoryLabel: (categoryKey: NonNullable<VendorApplication['mainCategory']>) => string,
  notProvidedLabel: string
) => {
  if (application.mainCategory === 'other') {
    return application.mainCategoryOther || notProvidedLabel;
  }

  if (!application.mainCategory) {
    return notProvidedLabel;
  }

  return resolveCategoryLabel(application.mainCategory);
};

export const formatDateTime = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'medium'
  }).format(new Date(value));
