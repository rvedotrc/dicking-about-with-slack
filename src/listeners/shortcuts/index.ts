import { App } from '@slack/bolt';
import archive from './archive';
import sampleShortcutCallback from './sample-shortcut';

const register = (app: App) => {
  app.shortcut(/./, archive);

  app.shortcut('sample_message_shortcut_id', sampleShortcutCallback);
  app.shortcut('sample_global_shortcut_id', sampleShortcutCallback);
};

export default { register };
