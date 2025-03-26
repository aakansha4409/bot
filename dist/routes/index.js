"use strict";
// ------------------------------------------------------
// Routes for users
// ------------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
// import  startBot  from "../routes/startBot";
// --------------------------------------
// Define the router
// --------------------------------------
const router = express_1.default.Router();
// =======================================
// Users routes
// =======================================
// ---------------------------
// Auth routes
// ---------------------------
router.use('/', auth_1.default);
// ---------------------------
// coins routes
// ---------------------------
// router.use('/', startBot);
// ----------------------
// Export router
// ----------------------
exports.default = router;
