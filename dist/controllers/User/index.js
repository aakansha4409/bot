"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../config/response"));
// --------------------------------------------------------------
// Define user controller
// --------------------------------------------------------------
const controller = {
    // -------------------------------------------------------
    // Get a user and return the user data
    // -------------------------------------------------------
    get: async (req, res) => {
        try {
            const { userId, firstName, username, invitationLink } = req.query;
            const data = {
                userId: userId || "Unknown",
                firstName: firstName || "Unknown",
                username: username || "No username",
                invitationLink: invitationLink || "No invitation link",
            };
            const message = "User data fetched successfully";
            return response_1.default.success(res, data, message);
        }
        catch (error) {
            return response_1.default.errors(res, error.message, 500);
        }
    },
};
// ------------------------------
// Export user controller
// ------------------------------
exports.default = controller;
