"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const appConfig = {
    mongoURI: config_1.default.get('mongoUri'),
    secretOrKey: config_1.default.get('secretOrKey'),
    Client_URL: config_1.default.get('Client_URL'),
    RESET_PWD_KEY: config_1.default.get('RESET_PWD_KEY')
};
exports.default = appConfig;
