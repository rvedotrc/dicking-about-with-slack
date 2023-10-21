import { AllMiddlewareArgs, SlackShortcut, SlackShortcutMiddlewareArgs } from '@slack/bolt';
import archlib from '../../archive';

const archive = archlib.create('var/slack-shortcuts');

export default async <T extends SlackShortcut = SlackShortcut>(
  { body }: AllMiddlewareArgs & SlackShortcutMiddlewareArgs<T>,
) => {
  try {
    await archive.add(body, `${body.type}`)
      .then(
        (n) => console.info(n),
        (e) => console.error(e),
      );
  } catch (error) {
    console.error(error);
  }
};
