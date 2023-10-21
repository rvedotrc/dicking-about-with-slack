import SmeeClient from 'smee-client';
import { GitHubWebhookEvent } from './types';
import verifyGithubWebhook from './verifyGithubWebhook';

type RawMessage = {
  type: string;
  data: string;
  lastEventId: string;
  origin: string;
};

type SmeeMessage = {
  timestamp: number;
  body: object;
  query: object;
} & Record<string, string>;

const source = (
  onGithubEvent: (e: GitHubWebhookEvent) => void,
  verifier: ReturnType<typeof verifyGithubWebhook.verifier>,
): { close: () => void } => {
  const smee = new SmeeClient({
    source: process.env.SMEE_SOURCE || '',
    target: '',
    logger: console,
  });

  smee.onmessage = (
    m: unknown,
  ): void => {
    const t = m as RawMessage;

    let data: unknown;
    try {
      data = JSON.parse(t.data);
    } catch (err) {
      console.error('Couldn\'t parse raw message data', err);
      return;
    }

    if (typeof data !== 'object' || data === null) {
      console.error(`Parsed data to a ${typeof data} not an object`);
      return;
    }

    const smeeMessage = data as SmeeMessage;

    if (!verifier.verify(smeeMessage['x-hub-signature-256'], JSON.stringify(smeeMessage.body))) {
      console.error('Signature check failed');
      return;
    }

    const githubEvent = {
      type: smeeMessage['x-github-event'],
      data: smeeMessage.body,
      headers: smeeMessage,
    } as unknown as GitHubWebhookEvent;

    // console.log(JSON.stringify(githubEvent, null, 2));

    // let what = smeeMessage.timestamp.toString();
    // what = what.concat('.', smeeMessage['x-github-delivery']);
    // what = what.concat('.', smeeMessage['x-github-event']);
    // if ('action' in smeeMessage.body) what = what.concat('-', smeeMessage.body.action as string);

    // const filename = `var/smee/${what}.json`;
    // const tmpFile = `${filename}.tmp`;
    // fs.promises.writeFile(tmpFile, `${t.data}\n`)
    //   .then(() => fs.promises.rename(tmpFile, filename))
    //   .then(() => console.debug(`Event saved to ${filename}`));

    onGithubEvent(githubEvent);
  };

  return { close: smee.start() };
};

export default { source };
