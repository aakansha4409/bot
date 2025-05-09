"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const startBot_1 = __importDefault(require("../../controllers/startBot"));
// --------------------------------------
// Define the router
// --------------------------------------
const router = express_1.default.Router();
// ---------------------------------------
// Start the bot
// ---------------------------------------
router.get("/start", startBot_1.default.start);
// ----------------------
// Export router
// ----------------------
exports.default = router;
