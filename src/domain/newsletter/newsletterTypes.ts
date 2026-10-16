export type NewsletterStatus = 'pending' | 'subscribed';

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  status?: string;
}
