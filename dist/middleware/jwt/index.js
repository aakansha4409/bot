"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../../config/response"));
// ---------------------------------------------------------
// Verify token
// ---------------------------------------------------------
const verify = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.slice(7) || "";
        if (!token) {
            return response_1.default.errors(res, "Authentication failed: Please provide token .");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                return response_1.default.errors(res, "Invalid Authentication, Please login again.", 400);
            }
            req.user = decodedToken;
            next();
        });
    }
    catch (error) {
        return response_1.default.errors(res, error.message, 500);
    }
};
// ---------------------------
// Export token verify
// ---------------------------
exports.default = verify;
