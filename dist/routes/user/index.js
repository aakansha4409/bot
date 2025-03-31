"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../../controllers/User"));
// --------------------------------------
// Define the router
// --------------------------------------
const router = express_1.default.Router();
// ---------------------------------------
// Get a user
// ---------------------------------------
router.get("/user", User_1.default.get);
// ----------------------
// Export router
// ----------------------
exports.default = router;
