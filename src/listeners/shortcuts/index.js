"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_shortcut_1 = __importDefault(require("./sample-shortcut"));
const register = (app) => {
    app.shortcut('sample_message_shortcut_id', sample_shortcut_1.default);
    app.shortcut('sample_global_shortcut_id', sample_shortcut_1.default);
};
exports.default = { register };
