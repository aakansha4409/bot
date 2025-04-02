import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";
import User from "../../models/User";
import UserDocument from "../../models/User/type";
import { v4 as uuidv4 } from "uuid"; // To generate unique referral codes

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
// Helper function to generate unique referral code
// ------------------------------------------------------
function generateReferralCode() {
    return uuidv4().slice(0, 8); // Generate a short unique referral code
}

// ------------------------------------------------------
// Start bot
// ------------------------------------------------------
bot.onText(/\/start/, async (msg) => {
    const chat_id = msg.chat.id;

    const user_id = msg.from?.id || "";
    const first_name = encodeURIComponent(msg.from?.first_name || "Unknown");
    const language_code = encodeURIComponent(msg.from?.language_code || "Unknown");
    const username = encodeURIComponent(msg.from?.username || "No username");

    const app_url = `https://venerable-centaur-a1a0a6.netlify.app/?id=${user_id}&username=${username}&first_name=${first_name}`;

    const user: UserDocument | null = await User.findOne({
        telegram_id: user_id,
        isDeleted: false,
    });

    if (!user) {
        // Generate unique referral code
        const invitationCode = generateReferralCode();

        // Store user in the database
        await User.create({
            username,
            first_name,
            language_code,
            telegram_id: user_id,
            invitationCode, // Store the generated referral code
        });

        // Send welcome message and referral link
        const welcome_message = `
🚀 Welcome, @${username}!  
👤 **User ID:** ${user_id}  
📝 **First Name:** ${decodeURIComponent(first_name)}  

🎉 **Experience the Next Generation of Cloud Mining!**  
💎 Earn Toncoin effortlessly with our **Mine-To-Earn** system!  
📢 **Key Features:**  
✅ Cloud Mining on TON Blockchain  
✅ Optimized Transactions with Low Fees  
✅ Invite Friends & Earn More  
✅ Rent Mining Power for Higher Profits  

💰 **Increase Your Income & Achieve Financial Freedom!**  
Click below to get started ⬇️

🔗 **Your Referral Link:**  
https://venerable-centaur-a1a0a6.netlify.app/?ref=${invitationCode}  // Referral link for the user
`;

        // Send Telegram button with Mini App
        await bot.sendMessage(chat_id, welcome_message, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [[{ text: "⚡ Start Mining App ⚡", web_app: { url: app_url } }]],
            },
        });
    } else {
        // If the user already exists, send a different message
        await bot.sendMessage(chat_id, "Welcome back! Use your referral link to invite others!");
    }
});

// ------------------------------------------------------
// Handle user referral during registration
// ------------------------------------------------------
bot.onText(/\/start (.+)/, async (msg, match) => {
    const chat_id = msg.chat.id;
    const user_id = msg.from?.id || "";
    const referralCode = match?.[1]; // The referral code passed in the URL

    const referrer: UserDocument | null = await User.findOne({
        referralCode,
        isDeleted: false,
    });

    if (referrer) {
        // The user is coming from a referral link

        const first_name = encodeURIComponent(msg.from?.first_name || "Unknown");
        const username = encodeURIComponent(msg.from?.username || "No username");
        const language_code = encodeURIComponent(msg.from?.language_code || "Unknown");

        const app_url = `https://venerable-centaur-a1a0a6.netlify.app/?id=${user_id}&username=${username}&first_name=${first_name}`;

        const user: UserDocument | null = await User.findOne({
            telegram_id: user_id,
            isDeleted: false,
        });

        if (!user) {
            // Create a new user
            const referralCode = generateReferralCode();

            const newUser = await User.create({
                username,
                first_name,
                language_code,
                telegram_id: user_id,
                referralCode, // Store referral code for the new user
                referrerId: referrer._id, // Store who referred the new user
            });

            // Update the referrer's referral hierarchy
            referrer.referrals.push(newUser._id); // Add the new user to the referrer's referral list
            await referrer.save(); // Save the referrer with updated referrals

            // Send welcome message with referral link
            const welcome_message = `
🚀 Welcome, @${username}!  
👤 **User ID:** ${user_id}  
📝 **First Name:** ${decodeURIComponent(first_name)}  

🎉 **Experience the Next Generation of Cloud Mining!**  
💎 Earn Toncoin effortlessly with our **Mine-To-Earn** system!  
📢 **Key Features:**  
✅ Cloud Mining on TON Blockchain  
✅ Optimized Transactions with Low Fees  
✅ Invite Friends & Earn More  
✅ Rent Mining Power for Higher Profits  

💰 **Increase Your Income & Achieve Financial Freedom!**  
Click below to get started ⬇️

🔗 **Your Referral Link:**  
https://venerable-centaur-a1a0a6.netlify.app/?ref=${referralCode}  // Referral link for the user
`;

            // Send Telegram button with Mini App
            await bot.sendMessage(chat_id, welcome_message, {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [[{ text: "⚡ Start Mining App ⚡", web_app: { url: app_url } }]],
                },
            });
        }
    } else {
        // If referral code is not found
        await bot.sendMessage(chat_id, "Sorry, invalid referral code.");
    }
});

export default router;
