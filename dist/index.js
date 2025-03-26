"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const startBot_1 = __importDefault(require("./controllers/startBot")); // Import the bot file
const app = (0, express_1.default)();
const BOT_MODE = process.env.BOT_MODE || "polling"; // "polling" for local, "webhook" for production
// ------------------------------------------------
// Use middlewares
// ------------------------------------------------
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
// --------------------------------------------------
// Connect database
// --------------------------------------------------
(0, database_1.default)();
// ----------------------------------
// Use routes
// ----------------------------------
app.use("/api", startBot_1.default);
// ✅ Webhook-specific setup
if (BOT_MODE === "webhook") {
    app.use(express_1.default.json()); // Required for processing Telegram webhooks
}
// ----------------------------------
// Error handling
// // ----------------------------------
// app.use(errorHandlers.notFound);
// app.use("/", errorHandlers.errors);
// app.use("/", errorHandlers.server);
// --------------------------------------------------
// Run server
// --------------------------------------------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`🚀 Server running at port ${port}`);
});
