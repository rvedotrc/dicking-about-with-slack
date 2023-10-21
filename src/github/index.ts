import eventArchive from '../archive';
import smeeEventSource from './smeeEventSource';
import { GitHubWebhookEvent } from './types';
import verifyGithubWebhook from './verifyGithubWebhook';

const feed = (onEvent: (e: GitHubWebhookEvent) => Promise<void>) => {
  const verifier = verifyGithubWebhook.verifier(
    process.env.KENNEL_GITHUB_SECRET || '',
  );

  const archiver = eventArchive.create('var/github-events');

  const source = smeeEventSource.source(
    (event) => {
      let hint = event.headers.timestamp.toString();
      hint = hint.concat('.', event.headers['x-github-delivery']);
      hint = hint.concat('.', event.headers['x-github-event']);
      if ('action' in event.data) hint = hint.concat('-', event.data.action as string);

      Promise.all([
        onEvent(event)
          .catch((err) => {
            console.error('Error from event handler:', err);
            throw err;
          }),
        archiver.add(event, hint)
          .then(
            (n) => console.info('Archived to', n.filename),
          )
          .catch((err) => console.error('Error from archiver:', err)),
      ]);
    },
    verifier,
  );

  return {
    close: () => Promise.all([
      verifier.close(),
      archiver.close(),
      source.close,
    ]),
  };
};

export default { feed };
