import { App, LogLevel } from '@slack/bolt';
import * as dotenv from 'dotenv';
import { GitHubWebhookEvent } from './github/types';
import registerListeners from './listeners';
import listen from './github';

dotenv.config();

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
});

/** Register Listeners */
registerListeners(app);

listen.feed(
  async (githubEvent) => {
    if (githubEvent.type === 'workflow_job') {
      const event = githubEvent as GitHubWebhookEvent<'workflow_job'>;
      const d = event.data;

      console.log(
        `workflow event in ${d.repository.full_name}`
          + ` on ${d.workflow_job.head_branch}:`
          + ` ${d.workflow_job.workflow_name} / ${d.workflow_job.name}`
          + ` => ${d.workflow_job.status} / ${d.workflow_job.conclusion}`,
      );
    } else {
      console.log({ githubEvent });
    }
  },
);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
    // app.client.conversations.info({ channel: '#general', include_num_members: true })
    // app.client.conversations.list()
    //   .then((r2) => {
    //     console.log({ r2 });
    //     r2.channels?.forEach((c) => {
    //       console.log({ c });
    //     });
    //     // return app.client.chat.postMessage({
    //     //   channel: 'general',
    //     //   // text: 'Hello <@U061ASWV1B2> how are you?',
    //     //   text: new Date().toISOString(),
    //     //   // parse: 'full',
    //     //   // link_names: true,
    //     //   icon_emoji: 'bell',
    //     //   username: 'Big Ben',
    //     // });
    //
    //     // return app.client.chat.postEphemeral({
    //     //   username: 'Big Ben',
    //     //   icon_emoji: 'bell',
    //     //   channel: 'general',
    //     //   user: 'U061ASWV1B2',
    //     //   text: new Date().toISOString(),
    //     // });
    //   });
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();
