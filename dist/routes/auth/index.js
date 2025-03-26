"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = require("../../middleware/joi");
const controllers_1 = require("../../controllers");
// --------------------------------------
// Define the router
// --------------------------------------
const router = express_1.default.Router();
// ---------------------------------------
// Sign up user
// ---------------------------------------
router.post("/signup", joi_1.joi.validate(joi_1.userJoi.signup), controllers_1.auth.signup);
// ---------------------------------------
// Sign in user
// ---------------------------------------
router.post("/signin", joi_1.joi.validate(joi_1.userJoi.signin), controllers_1.auth.signin);
// ----------------------
// Export router
// ----------------------
exports.default = router;
