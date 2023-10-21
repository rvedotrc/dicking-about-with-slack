import { App } from '@slack/bolt';
import archive from './archive';
import sampleMessageCallback from './sample-message';

const register = (app: App) => {
  app.message(/^/, archive);

  app.message(/^(hi|hello|hey).*/, sampleMessageCallback);

  // app.message(
  //   async (args: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>): Promise<void> => {
  //     const copy = {
  //       ...args,
  //       event: Object.is(args.event, args.body.event) ? 'same object as body.event' : args.event,
  //       payload: Object.is(args.payload, args.body.event) ? 'same object as body.event' : args.payload,
  //       message: Object.is(args.message, args.body.event) ? 'same object as body.event' : args.message,
  //       client: null,
  //     };
  //     console.debug('message', copy);
  //
  //     const { ack, client, context, say, logger, next, body, payload, event, message } = args;
  //
  //     markAsUsed(ack, client, context, say, logger, next, body, payload, event, message);
  //
  //     // if (body.event === message)
  //     // if (message.text
  //   },
  // );

  // app.message(/reply now/, async (args): Promise<void> => {
  //   markAsUsed(args);
  //   console.debug({
  //     x: [
  //       args.message.ts,
  //       args.message.event_ts,
  //       args.event.ts,
  //       args.event.event_ts,
  //       args.payload.ts,
  //       args.payload.event_ts,
  //       args.body.event.ts,
  //       args.body.event.event_ts,
  //     ],
  //     is: [
  //       Object.is(args.message, args.event),
  //       Object.is(args.message, args.payload),
  //       Object.is(args.payload, args.event),
  //       Object.is(args.body.event, args.message),
  //       Object.is(args.body.event, args.event),
  //       Object.is(args.body.event, args.payload),
  //     ],
  //   });
  //   await args.say({
  //     text: 'foo',
  //     thread_ts: args.body.event.ts,
  //   });
  // });

  // app.message(/reply later/, async (args): Promise<void> => {
  //   markAsUsed(args);
  //   setTimeout(() => args.say({ text: 'foo', thread_ts: args.message.ts }), 1000);
  //   // await args.say('foo');
  // });
  //
  // app.message(/foo/, async (args): Promise<void> => {
  //   markAsUsed(args);
  //   await args.say('bar');
  // });

  // app.event(
  //   'message',
  //   async (args: AllMiddlewareArgs): Promise<void> => {
  //     markAsUsed(args);
  //     console.debug('app.event message', args);
  //
  //     // const r: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'> = args;
  //     // markAsUsed(r);
  //   },
  // );
  //
  // app.event(
  //   'xxx',
  //   async (args: AllMiddlewareArgs): Promise<void> => {
  //     markAsUsed(args);
  //     console.debug('app.event xxx', args);
  //   },
  // );
};

export default { register };
