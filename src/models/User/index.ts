import mongoose, { Schema } from "mongoose";
import UserDocument from "./type";
 
// -------------------------------------------------------
// Define schema for user document
// -------------------------------------------------------
 
const schema: Schema<UserDocument> = new Schema(
    {
        username: {
            type: String,
        },
        first_name: {
            type: String,
        },
        language_code: {
            type: String,
        },
        telegram_id: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        invitationLink: { type: String, unique: true, default: "" },
 
    },
    {
        timestamps: true,
    }
);
 
// ---------------------------------------------------------------
// Define and export user model
// ---------------------------------------------------------------
const User = mongoose.model<UserDocument>('User', schema);
 
// ----------------------------
// Export Users Model
// ----------------------------
export default User;