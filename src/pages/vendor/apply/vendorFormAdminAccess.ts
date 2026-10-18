import { verifyVendorApplicationsAccess } from '../../../domain/vendorApplications/vendorsApplicationsApi.ts';
import { readStoredAdminSession } from '../../admin/adminAuthStorage';

let hasVerifiedAdminAccess = false;

export const verifyVendorFormAdminAccess = async (): Promise<boolean> => {
  const session = readStoredAdminSession();

  if (!hasVerifiedAdminAccess && session) {
    hasVerifiedAdminAccess = await verifyVendorApplicationsAccess(session.token).then(
      () => true,
      () => false
    );
  }

  return hasVerifiedAdminAccess;
};

export const hasVerifiedVendorFormAdminAccess = (): boolean => hasVerifiedAdminAccess;
