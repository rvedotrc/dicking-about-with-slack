import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import archlib from '../../archive';

const archive = archlib.create('var/slack-messages');

export default async (
  { body }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>,
) => {
  try {
    console.debug('archive message');
    await archive.add(body, `${body.type}`)
      .then(
        (n) => console.info(n),
        (e) => console.error(e),
      );
  } catch (error) {
    console.error(error);
  }
};
