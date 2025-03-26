import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import database from "./config/database";
import errorHandlers from "./middleware/error";
import userRoutes from "./controllers/startBot"; // Import the bot file

const app = express();
const BOT_MODE = process.env.BOT_MODE || "polling"; // "polling" for local, "webhook" for production

// ------------------------------------------------
// Use middlewares
// ------------------------------------------------
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// --------------------------------------------------
// Connect database
// --------------------------------------------------
database();

// ----------------------------------
// Use routes
// ----------------------------------
app.use("/api", userRoutes);

// ✅ Webhook-specific setup
if (BOT_MODE === "webhook") {
    app.use(express.json()); // Required for processing Telegram webhooks
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
