"use strict";
// ---------------------------------------------------------------
// Imports and exports all collections for users
// ---------------------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var Auth_1 = require("./Auth");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return __importDefault(Auth_1).default; } });
