"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const router = express_1.default.Router();
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const APP_URL = process.env.APP_URL || ""; // Mini App URL
if (!BOT_TOKEN)
    throw new Error("❌ BOT_TOKEN is missing in .env file.");
if (!APP_URL)
    throw new Error("❌ APP_URL is missing in .env file.");
const bot = new node_telegram_bot_api_1.default(BOT_TOKEN, { polling: true });
// Handle Telegram `/start` command
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    // Extract user details
    const userId = msg.from?.id || "";
    const firstName = encodeURIComponent(msg.from?.first_name || "Unknown");
    const username = encodeURIComponent(msg.from?.username || "No username");
    // Construct Mini App URL
    const appUrl = `https://venerable-centaur-a1a0a6.netlify.app/?id=${userId}&username=${username}&firstName=${firstName}`;
    console.log("Opening Mini App with URL:", appUrl);
    // Welcome message
    const welcomeMessage = `
🚀 Welcome, @${username}!  
👤 **User ID:** ${userId}  
📝 **First Name:** ${decodeURIComponent(firstName)}  

🎉 **Experience the Next Generation of Cloud Mining!**  
💎 Earn Toncoin effortlessly with our **Mine-To-Earn** system!  
📢 **Key Features:**  
✅ Cloud Mining on TON Blockchain  
✅ Optimized Transactions with Low Fees  
✅ Invite Friends & Earn More  
✅ Rent Mining Power for Higher Profits  

💰 **Increase Your Income & Achieve Financial Freedom!**  
Click below to get started ⬇️`;
    // Send Telegram button with Mini App
    await bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [[{ text: "⚡ Start Mining App ⚡", web_app: { url: appUrl } }]],
        },
    });
});
// ✅ API Route to Fetch User Data
router.get("/user", (req, res) => {
    const { userId, firstName, username } = req.query;
    res.json({
        status: "success",
        message: "User data fetched successfully!",
        data: {
            userId: userId || "Unknown",
            firstName: firstName || "Unknown",
            username: username || "No username",
        },
    });
});
// ✅ Export the router so it can be used in `routes/index.js`
exports.default = router;
