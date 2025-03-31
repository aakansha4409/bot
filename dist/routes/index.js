"use strict";
// ------------------------------------------------------
// Routes for users
// ------------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const startBot_1 = __importDefault(require("./startBot"));
const user_1 = __importDefault(require("./user"));
// --------------------------------------
// Define the router
// --------------------------------------
const router = express_1.default.Router();
// ---------------------------------------
// Start the bot
// ---------------------------------------
router.use('/', startBot_1.default);
// ---------------------------------------
// User routes
// ---------------------------------------
router.use('/', user_1.default);
// ----------------------
// Export router
// ----------------------
exports.default = router;
