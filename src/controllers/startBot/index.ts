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
// /start command (Normal User, no referral)
bot.onText(/\/start/, async (msg) => {
    const chat_id = msg.chat.id;
    const user_id = msg.from?.id || "";
    const first_name = encodeURIComponent(msg.from?.first_name || "Unknown");
    const language_code = encodeURIComponent(msg.from?.language_code || "Unknown");
    const username = encodeURIComponent(msg.from?.username || "No username");

    console.log(username," ",first_name," ",language_code," ",user_id);
    const user: UserDocument | null = await User.findOne({
        telegram_id: user_id,
        isDeleted: false,
    });

    if (!user) {
        // New user, generate referral code and welcome message
        const invitationCode = generateReferralCode();
        await User.create({
            username,
            first_name,
            language_code,
            telegram_id: user_id,
            invitationCode, // Store referral code
        });

        // Send welcome message
        const welcome_message = `
🚀 Welcome, @${username}!
... (message content)
`;

        // Send the Telegram message
        await bot.sendMessage(chat_id, welcome_message);
    } else {
        // Existing user, send a welcome back message
        await bot.sendMessage(chat_id, "Welcome back! Use your referral link to invite others!");
    }
});


// ------------------------------------------------------
// Handle user referral during registration
// ------------------------------------------------------
// /start <referral_code> (User with referral link)
bot.onText(/\/start (.+)/, async (msg, match) => {
    const chat_id = msg.chat.id;
    const user_id = msg.from?.id || "";
    const referralCode = match?.[1]; // Capture referral code from the message

    const referrer: UserDocument | null = await User.findOne({
        referralCode, // Find the user with the given referral code
        isDeleted: false,
    });

    if (referrer) {
        // Referrer found, this user came via a referral link
        const first_name = encodeURIComponent(msg.from?.first_name || "Unknown");
        const username = encodeURIComponent(msg.from?.username || "No username");
        const language_code = encodeURIComponent(msg.from?.language_code || "Unknown");

        const user: UserDocument | null = await User.findOne({
            telegram_id: user_id,
            isDeleted: false,
        });

        if (!user) {
            // Create a new user and assign them a referral code
            const newReferralCode = generateReferralCode();
            const newUser = await User.create({
                username,
                first_name,
                language_code,
                telegram_id: user_id,
                referralCode: newReferralCode, // Store referral code for the new user
                referrerId: referrer._id, // Store who referred the new user
            });

            // Update referrer's referral list
            referrer.referrals.push(newUser._id);
            await referrer.save();

            // Send welcome message
            const welcome_message = `
🚀 Welcome, @${username}!
... (message content)
`;

            await bot.sendMessage(chat_id, welcome_message);
        }
    } else {
        // Invalid referral code
        await bot.sendMessage(chat_id, "Sorry, invalid referral code.");
    }
});


export default router;
