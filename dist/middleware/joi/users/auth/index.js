"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// ---------------------------------------------------------
// User Joi validation schema
// ---------------------------------------------------------
const joi = {
    // -------------------------------------------------------
    // Signup a user
    // -------------------------------------------------------
    signup: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            'string.base': "Email should be a type of 'text'.",
            'string.empty': "Email cannot be empty. Please provide an email address.",
            'string.email': "Email must be a valid email address.",
            'any.required': "Email is required. Please provide an email address.",
        }),
        password: joi_1.default.string().trim().min(4).max(40).required().messages({
            'string.base': "Password should be a type of 'text'.",
            'string.empty': "Password cannot be empty.",
            'string.min': "Password must be at least 4 characters long.",
            'string.max': "Password must be at most 40 characters long.",
            'any.required': "Password is required.",
        }),
        confirmPassword: joi_1.default.string()
            .valid(joi_1.default.ref("password"))
            .required()
            .messages({
            "string.base": "Password confirmation should be a type of 'text'.",
            "string.empty": "Password confirmation cannot be empty.",
            "any.only": "Password confirmation must match the password.",
            "any.required": "Password confirmation is required.",
        }),
    }),
    // -------------------------------------------------------
    // Signin user
    // -------------------------------------------------------
    signin: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            'string.base': "Email should be a type of 'text'.",
            'string.empty': "Email cannot be empty. Please provide an email address.",
            'string.email': "Email must be a valid email address.",
            'any.required': "Email is required. Please provide an email address.",
        }),
        password: joi_1.default.string().trim().min(4).max(40).required().messages({
            'string.base': "Password should be a type of 'text'.",
            'string.empty': "Password cannot be empty.",
            'string.min': "Password must be at least 4 characters long.",
            'string.max': "Password must be at most 40 characters long.",
            'any.required': "Password is required.",
        }),
    }),
};
// -------------------------
// Export users joi
// -------------------------
exports.default = joi;
