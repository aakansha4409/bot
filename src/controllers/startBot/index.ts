import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";
import User from "../../models/User";
import UserDocument from "../../models/User/type";

dotenv.config();

// ------------------------------------------------------
// Define the router
// ------------------------------------------------------
const router = express.Router();

// ------------------------------------------------------
// Telegram Bot
// ------------------------------------------------------
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ------------------------------------------------------
// Start bot
// ------------------------------------------------------
bot.onText(/\/start/, async (msg) => {
    const chat_id = msg.chat.id;

    const user_id = msg.from?.id || "";
    const first_name = encodeURIComponent(msg.from?.first_name || "Unknown");
    const language_code = encodeURIComponent(msg.from?.language_code || "Unknown");
    const username = msg.from?.username ? `@${msg.from.username.replace(/_/g, "\\_")}` : "No username";

    const app_url = `https://venerable-centaur-a1a0a6.netlify.app/?id=${user_id}&username=${encodeURIComponent(username)}&first_name=${first_name}`;

    const user: UserDocument | null = await User.findOne({
        telegram_id: user_id,
        isDeleted: false,
    });

    if (!user) {
        await User.create({
            username,
            first_name,
            language_code,
            telegram_id: user_id,
        });
    }

    // Welcome message for users (Fixed Markdown Syntax)
    const welcome_message = `🚀 *Welcome*, ${username}!\n\n` +
        `👤 *User ID:* \`${user_id}\`\n` +
        `📝 *First Name:* \`${decodeURIComponent(first_name)}\`\n\n` +
        `🎉 *Experience the Next Generation of Cloud Mining!*\n` +
        `💎 Earn Toncoin effortlessly with our *Mine-To-Earn* system!\n\n` +
        `📢 *Key Features:*\n` +
        `✅ Cloud Mining on TON Blockchain\n` +
        `✅ Optimized Transactions with Low Fees\n` +
        `✅ Invite Friends & Earn More\n` +
        `✅ Rent Mining Power for Higher Profits\n\n` +
        `💰 *Increase Your Income & Achieve Financial Freedom!*\n` +
        `Click below to get started ⬇️`;

    // Send Telegram button with Mini App
    await bot.sendMessage(chat_id, welcome_message, {
        parse_mode: "MarkdownV2",
        reply_markup: {
            inline_keyboard: [[{ text: "⚡ Start Mining App ⚡", web_app: { url: app_url } }]],
        },
    });
});

export default router;
