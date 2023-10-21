"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_command_1 = __importDefault(require("./sample-command"));
const register = (app) => {
    app.command('/sample-command', sample_command_1.default);
};
exports.default = { register };
