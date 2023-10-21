// eslint-disable-next-line import/no-unresolved
import * as t from '@octokit/webhooks-types';

export type GitHubWebhookEvent<T extends t.WebhookEventName = t.WebhookEventName> = {
  type: T;
  data: t.WebhookEventMap[T];
  headers: Record<string, string>;
};
