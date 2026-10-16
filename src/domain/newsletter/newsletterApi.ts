import { z } from 'zod';
import { requestApi } from '../apiClient.ts';
import { NEWSLETTER_API_URL } from './newsletterConstants.ts';
import type { NewsletterStatus, NewsletterSubscriber } from './newsletterTypes.ts';

const newsletterRecordsSchema = z.union([
  z.array(z.unknown()),
  z.object({ subscriptions: z.array(z.unknown()) }).transform(({ subscriptions }) => subscriptions),
  z.object({ subscribers: z.array(z.unknown()) }).transform(({ subscribers }) => subscribers)
]);

const newsletterRecordSchema = z.object({
  id: z.string().min(1).optional(),
  email: z.string().min(1),
  status: z.string().optional()
});

export const parseNewsletterSubscribers = (responseBody: unknown): NewsletterSubscriber[] => {
  const newsletterRecords = newsletterRecordsSchema.parse(responseBody);

  return newsletterRecords.flatMap((newsletterRecord) => {
    const parsedSubscriber = newsletterRecordSchema.safeParse(newsletterRecord);

    return parsedSubscriber.success
      ? [
          {
            ...(parsedSubscriber.data.id ? { id: parsedSubscriber.data.id } : {}),
            email: parsedSubscriber.data.email,
            ...(parsedSubscriber.data.status ? { status: parsedSubscriber.data.status } : {})
          }
        ]
      : [];
  });
};

export const subscribeToNewsletter = async (email: string): Promise<void> => {
  await requestApi(NEWSLETTER_API_URL, { method: 'POST', body: { email } });
};

export const listNewsletterSubscribers = async (token: string): Promise<NewsletterSubscriber[]> =>
  parseNewsletterSubscribers(await requestApi(NEWSLETTER_API_URL, { token }));

export const updateNewsletterStatus = async (token: string, id: string, status: NewsletterStatus): Promise<void> => {
  await requestApi(`${NEWSLETTER_API_URL}/${encodeURIComponent(id)}`, { method: 'PATCH', token, body: { status } });
};
