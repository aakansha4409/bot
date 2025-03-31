"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.start_bot = void 0;
// ---------------------------------------------
// Imports and exports all bot controllers
// ---------------------------------------------
var startBot_1 = require("./startBot");
Object.defineProperty(exports, "start_bot", { enumerable: true, get: function () { return __importDefault(startBot_1).default; } });
// ---------------------------------------------
// Imports and exports all user controllers
// ---------------------------------------------
var User_1 = require("./User");
Object.defineProperty(exports, "user", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
