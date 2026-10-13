import { requestApi } from '../apiClient.ts';
import { NEWSLETTER_API_URL } from './newsletterConstants.ts';

export const subscribeToNewsletter = async (email: string): Promise<void> => {
  await requestApi(NEWSLETTER_API_URL, { method: 'POST', body: { email } });
};
