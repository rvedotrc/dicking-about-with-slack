"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_home_opened_1 = __importDefault(require("./app-home-opened"));
const register = (app) => {
    app.event('app_home_opened', app_home_opened_1.default);
};
exports.default = { register };
