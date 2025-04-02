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
const error_1 = __importDefault(require("./middleware/error"));
const routes_1 = __importDefault(require("./routes"));
const startBot_1 = __importDefault(require("./controllers/startBot"));
const app = (0, express_1.default)();
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
app.use("/", routes_1.default);
// ----------------------------------
// Start bot
// ----------------------------------
app.use("/", startBot_1.default);
// ----------------------------------
// Error handling
// ----------------------------------
app.use(error_1.default.notFound);
app.use("/", error_1.default.errors);
app.use("/", error_1.default.server);
// --------------------------------------------------
// Run server
// --------------------------------------------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`🚀 Server running at port ${port}`);
});
