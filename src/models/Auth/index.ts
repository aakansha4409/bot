import mongoose, { Schema } from "mongoose";
import UserDocument from "./type";

// -------------------------------------------------------
// Define schema for user document
// -------------------------------------------------------

const schema: Schema<UserDocument> = new Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
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
