import { App } from '@slack/bolt';
import archive from './archive';
import sampleViewCallback from './sample-view';

const register = (app: App) => {
  app.view(/./, archive);

  app.view('sample_view_id', sampleViewCallback);
};

export default { register };
