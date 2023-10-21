"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_message_1 = __importDefault(require("./sample-message"));
const markAsUsed_1 = __importDefault(require("../../markAsUsed"));
const register = (app) => {
    app.message(/^(hi|hello|hey).*/, sample_message_1.default);
    app.message((args) => __awaiter(void 0, void 0, void 0, function* () {
        const copy = Object.assign(Object.assign({}, args), { event: Object.is(args.event, args.body.event) ? 'same object as body.event' : args.event, payload: Object.is(args.payload, args.body.event) ? 'same object as body.event' : args.payload, message: Object.is(args.message, args.body.event) ? 'same object as body.event' : args.message, client: null });
        console.debug('message', copy);
        const { ack, client, context, say, logger, next, body, payload, event, message } = args;
        (0, markAsUsed_1.default)(ack, client, context, say, logger, next, body, payload, event, message);
        // if (body.event === message)
        // if (message.text
    }));
    app.message(/reply now/, (args) => __awaiter(void 0, void 0, void 0, function* () {
        (0, markAsUsed_1.default)(args);
        console.debug({
            x: [
                args.message.ts,
                args.message.event_ts,
                args.event.ts,
                args.event.event_ts,
                args.payload.ts,
                args.payload.event_ts,
                args.body.event.ts,
                args.body.event.event_ts,
            ],
            is: [
                Object.is(args.message, args.event),
                Object.is(args.message, args.payload),
                Object.is(args.payload, args.event),
                Object.is(args.body.event, args.message),
                Object.is(args.body.event, args.event),
                Object.is(args.body.event, args.payload),
            ],
        });
        yield args.say({
            text: 'foo',
            thread_ts: args.body.event.ts,
        });
    }));
    app.message(/reply later/, (args) => __awaiter(void 0, void 0, void 0, function* () {
        (0, markAsUsed_1.default)(args);
        setTimeout(() => args.say({ text: 'foo', thread_ts: args.message.ts }), 1000);
        // await args.say('foo');
    }));
    app.message(/foo/, (args) => __awaiter(void 0, void 0, void 0, function* () {
        (0, markAsUsed_1.default)(args);
        yield args.say('bar');
    }));
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
exports.default = { register };
