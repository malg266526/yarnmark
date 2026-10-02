import { ADMIN_USER_STATUSES } from '../../../../domain/adminUsers/adminUsersConstants.ts';

export const formatDateTime = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'medium'
  }).format(new Date(value));

export const resolveAdminUserStatusLabel = (status: string, translate: (translationKey: string) => string): string =>
  ADMIN_USER_STATUSES.some((knownStatus) => knownStatus === status)
    ? translate(`adminUsersPage.statuses.${status}`)
    : status;
