"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_action_1 = __importDefault(require("./sample-action"));
const register = (app) => {
    app.action('sample_action_id', sample_action_1.default);
};
exports.default = { register };
