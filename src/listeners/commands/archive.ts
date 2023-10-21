import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt';
import archlib from '../../archive';

const archive = archlib.create('var/slack-commands');

export default async (
  { ack, body }: AllMiddlewareArgs & SlackCommandMiddlewareArgs
) => {
  try {
    await ack();
    await archive.add(body, `${body.type}`)
      .then(
        (n) => console.info('Archived to', n.filename),
        (e) => console.error(e),
      );
  } catch (error) {
    console.error(error);
  }
};
