import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import archlib from '../../archive';

const archive = archlib.create('var/slack-events');

export default async <T extends string = string>(
  { body }: AllMiddlewareArgs & SlackEventMiddlewareArgs<T>,
) => {
  try {
    await archive.add(body, `${body.type}.${body.event.type}`)
      .then(
        (n) => console.info('Archived to', n.filename),
        (e) => console.error(e),
      );
  } catch (error) {
    console.error(error);
  }
};
