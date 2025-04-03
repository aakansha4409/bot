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
bot.onText(/\/start/, async (msg: TelegramBot.Message) => {
    const chat_id = msg.chat.id;
    const user_id = msg.from?.id || "";
    const first_name = encodeURIComponent(msg.from?.first_name || "Unknown");
    const language_code = encodeURIComponent(msg.from?.language_code || "Unknown");
    const username = encodeURIComponent(msg.from?.username || "No username");
    const invitationLink = encodeURIComponent(msg?.from?.invitationLink || "No invitationLink");
    const app_url = `https://venerable-centaur-a1a0a6.netlify.app/?id=${user_id}&username=${username}&first_name=${first_name}`;
 
    const user: UserDocument | null = await User.findOne({
        telegram_id: user_id,
        isDeleted: false,
    });
   
const generateReferralCode = (user_id: number): string => {
    return `REF-${user_id.toString().slice(-6)}`;
};
    if (!user) {
        try {
            const referralCode = generateReferralCode(user_id as number)
            const invitationLink =` https://t.me/DexMiningbot?start=${referralCode}`;
            const newUser = await User.create({
                username,
                first_name,
                language_code,
                telegram_id: user_id,
                invitationLink,
            });
        } catch (error) {
            console.error(`Error Creating User : ${(error as Error).message}`)
        }
    }
 
    // Welcome message for users
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
Click below to get started ⬇️`;
 
    // Send Telegram button with Mini App
    await bot.sendMessage(chat_id, welcome_message, {
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [[{ text: "⚡ Start Mining App ⚡", web_app: { url: app_url } }]],
        },
    });
});
 
export default router;
 