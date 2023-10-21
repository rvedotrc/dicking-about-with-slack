import { App } from '@slack/bolt';
import appHomeOpenedCallback from './app-home-opened';
import archive from './archive';

const register = (app: App) => {
  app.event(/^/, archive);

  app.event('app_home_opened', appHomeOpenedCallback);
};

export default { register };
