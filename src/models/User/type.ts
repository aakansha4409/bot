import mongoose, { Mongoose } from "mongoose";
 
// ----------------------------------------------------
// Define interface for User document
// ----------------------------------------------------
 
interface UserDocument extends Document {
    _id?: mongoose.Schema.Types.ObjectId;
    username: string;
    first_name: string;
    language_code: string;
    telegram_id: string;
    isDeleted?: boolean;
    invitationLink:String
}
 
// ---------------------------
// Export UserDocument
// ---------------------------
export default UserDocument;
 