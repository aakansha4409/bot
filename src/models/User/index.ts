import mongoose, { Schema } from "mongoose";
import UserDocument from "./type";

// -------------------------------------------------------
// Define schema for user document
// -------------------------------------------------------

const schema: Schema<UserDocument> = new Schema(
    {
        username: {
            type: String,
            required: true, // Make this field required
        },
        first_name: {
            type: String,
            required: true, // Make this field required
        },
        language_code: {
            type: String,
            required: true, // Make this field required
        },
        telegram_id: {
            type: String,
            required: true, // Make this field required
            unique: true, // Ensure telegram_id is unique
        },
        invitationCode: {
            type: String,
            required: true, // Every user must have a referral code
            unique: true,
            default: "", // Default value for referral code
             // Ensure referral code is unique
        },
        referrerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users', // Reference to the User model (the person who referred the user)
            default: null, // Null if the user was not referred by anyone
        },
        referrals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users', // References to the users who were referred by this user
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false, // Default value for deleted status
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// ---------------------------------------------------------------
// Define and export user model
// ---------------------------------------------------------------
const Users = mongoose.model<UserDocument>('users', schema);

// ----------------------------
// Export Users Model
// ----------------------------
export default Users;
