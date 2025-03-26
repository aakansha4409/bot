"use strict";
// ------------------------------------------
// Joi for users imports and exports routes
// ------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJoi = exports.joi = void 0;
var main_1 = require("./main");
Object.defineProperty(exports, "joi", { enumerable: true, get: function () { return __importDefault(main_1).default; } });
var auth_1 = require("./users/auth");
Object.defineProperty(exports, "userJoi", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
