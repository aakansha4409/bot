"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// -------------------------------------------------------
// Define schema for user document
// -------------------------------------------------------
const schema = new mongoose_1.Schema({
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
        unique: true, // Ensure referral code is unique
    },
    referrerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model (the person who referred the user)
        default: null, // Null if the user was not referred by anyone
    },
    referrals: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'users', // References to the users who were referred by this user
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false, // Default value for deleted status
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
// ---------------------------------------------------------------
// Define and export user model
// ---------------------------------------------------------------
const Users = mongoose_1.default.model('users', schema);
// ----------------------------
// Export Users Model
// ----------------------------
exports.default = Users;
