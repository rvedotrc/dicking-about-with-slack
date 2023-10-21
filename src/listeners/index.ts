import { App } from '@slack/bolt';
import actions from './actions';
import commands from './commands';
import events from './events';
import messages from './messages';
import shortcuts from './shortcuts';
import views from './views';

const registerListeners = (app: App) => {
  actions.register(app);
  commands.register(app);
  events.register(app);
  messages.register(app);
  shortcuts.register(app);
  views.register(app);

  // app.event('hello', async (): Promise<void> => {
  //   console.debug('got hello, listing channels');
  //   app.client.channels.info({ channel: 'general' })
  //     .then((r) => {
  //       console.debug({ r });
  //     });
  // });
};

export default registerListeners;
