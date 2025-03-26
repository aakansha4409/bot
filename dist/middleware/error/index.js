"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../config/response"));
// --------------------------------------------------------
// Error handlers
// --------------------------------------------------------
const errorHandlers = {
    // ---------------------------------------------
    // Handle error
    // ---------------------------------------------
    errors: (err, req, res, next) => {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map((error) => error.message);
            return response_1.default.errors(res, "Validation error", 400);
        }
        else if (err instanceof SyntaxError &&
            err.status === 400 &&
            "body" in err) {
            return response_1.default.errors(res, "Invalid JSON syntax", 400);
        }
        else if (err.name === "UnauthorizedError") {
            return response_1.default.errors(res, "Unauthorized access", 401);
        }
        else if (err.name === "MongoNetworkError" ||
            err.name === "MongooseError") {
            return response_1.default.errors(res, "Database connection error", 500);
        }
        else if (err.name === "BadRequestError") {
            return response_1.default.errors(res, "Bad request", 400);
        }
        else if (err.name === "RateLimitError") {
            return response_1.default.errors(res, "Too many requests, please try again later", 429);
        }
        else if (err.name === "CustomAppError") {
            return response_1.default.errors(res, err.message, 400);
        }
        else if (err.name === "ForbiddenError") {
            return response_1.default.errors(res, "Forbidden access", 403);
        }
        next(err);
    },
    // --------------------------------------------
    // Route not found
    // --------------------------------------------
    notFound: (req, res, next) => {
        return response_1.default.errors(res, "The requested endpoint does not exist. Please check the URL.", 404);
    },
    // -----------------------------------------------
    // Handle server errors
    // -----------------------------------------------
    server: (err, req, res, next) => {
        return response_1.default.errors(res, err.message, 500);
    },
};
// --------------------------------------
// Export handle errors
// --------------------------------------
exports.default = errorHandlers;
