"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
// --------------------------------------------------------------
// Define bot controller
// --------------------------------------------------------------
const bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, {
    polling: true,
});
const bot_controller = {
    // --------------------------------------------------------------
    // Handle Telegram `/start` command
    // --------------------------------------------------------------
    start: async (req, res) => {
        try {
            const chatId = req.query.chatId;
            const userId = req.query.userId;
            const firstName = encodeURIComponent(req.query.firstName || "Unknown");
            const username = encodeURIComponent(req.query.username || "No username");
            const appUrl = `https://venerable-centaur-a1a0a6.netlify.app/?id=${userId}&username=${username}&firstName=${firstName}`;
            console.log("Opening Mini App with URL:", appUrl);
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
            await bot.sendMessage(Number(chatId), welcomeMessage, {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [[{ text: "⚡ Start Mining App ⚡", web_app: { url: appUrl } }]],
                },
            });
            res.status(200).json({ message: "Bot message sent successfully." });
        }
        catch (error) {
            console.error("Error sending bot message:", error);
            res.status(500).json({ error: "Failed to send bot message" });
        }
    },
};
// ------------------------------
// Export bot controller
// ------------------------------
exports.default = bot_controller;
