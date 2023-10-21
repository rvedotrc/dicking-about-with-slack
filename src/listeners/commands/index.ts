import { App } from '@slack/bolt';
import archive from './archive';
import sampleCommandCallback from './sample-command';

const register = (app: App) => {
  app.command(/^/, archive);

  app.command('/sample-command', sampleCommandCallback);
};

export default { register };
