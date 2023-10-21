import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from '@slack/bolt';
import archlib from '../../archive';

const archive = archlib.create('var/slack-views');

export default async <T extends SlackViewAction = SlackViewAction>(
  { body }: AllMiddlewareArgs & SlackViewMiddlewareArgs<T>,
) => {
  try {
    await archive.add(body, `${body.type}`)
      .then(
        (n) => console.info('Archived to', n.filename),
        (e) => console.error(e),
      );
  } catch (error) {
    console.error(error);
  }
};
