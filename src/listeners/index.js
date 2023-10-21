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
const actions_1 = __importDefault(require("./actions"));
const commands_1 = __importDefault(require("./commands"));
const events_1 = __importDefault(require("./events"));
const messages_1 = __importDefault(require("./messages"));
const shortcuts_1 = __importDefault(require("./shortcuts"));
const views_1 = __importDefault(require("./views"));
const registerListeners = (app) => {
    actions_1.default.register(app);
    commands_1.default.register(app);
    events_1.default.register(app);
    messages_1.default.register(app);
    shortcuts_1.default.register(app);
    views_1.default.register(app);
    app.event('hello', () => __awaiter(void 0, void 0, void 0, function* () {
        console.debug('got hello, listing channels');
        app.client.channels.info({ channel: 'general' })
            .then((r) => {
            console.debug({ r });
        });
    }));
};
exports.default = registerListeners;
