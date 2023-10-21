import { App } from '@slack/bolt';
import archive from './archive';
import sampleActionCallback from './sample-action';

const register = (app: App) => {
  app.action(/^/, archive);

  app.action('sample_action_id', sampleActionCallback);
};

export default { register };
