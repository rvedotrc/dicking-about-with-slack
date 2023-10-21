"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_view_1 = __importDefault(require("./sample-view"));
const register = (app) => {
    app.view('sample_view_id', sample_view_1.default);
};
exports.default = { register };
