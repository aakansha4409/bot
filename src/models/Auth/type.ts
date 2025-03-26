import mongoose, { Mongoose } from "mongoose";

// ----------------------------------------------------
// Define interface for User document
// ----------------------------------------------------

interface UserDocument extends Document {
    _id?: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    isDeleted?: boolean;
}

// ---------------------------
// Export UserDocument
// ---------------------------
export default UserDocument;
