"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// -------------------------------------------------------
// Database connection
// -------------------------------------------------------
const database = async () => {
    try {
        const url = process.env.DATABASE_URL;
        await mongoose_1.default.connect(url);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Error connecting to database:", error.message);
    }
};
// ----------------------------
// Export database connection
// ----------------------------
exports.default = database;
