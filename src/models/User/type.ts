import mongoose, { Document } from "mongoose";

// ----------------------------------------------------
// Define interface for User document
// ----------------------------------------------------

interface UserDocument extends Document {
    _id?: mongoose.Schema.Types.ObjectId;
    username: string;
    first_name: string;
    language_code: string;
    telegram_id: string;
    invitationCode: string; // Add referralCode to store each user's unique referral code
    referrerId?: mongoose.Schema.Types.ObjectId | null; // Referrer is an optional field (if user was referred)
    referrals: mongoose.Schema.Types.ObjectId[]; // Array of users who were referred by this user
    isDeleted?: boolean; // Optional, default to false
}

// ---------------------------
// Export UserDocument
// ---------------------------
export default UserDocument;
