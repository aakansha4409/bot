"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// ---------------------------------------------------------
// coins Joi validation schema
// ---------------------------------------------------------
const joi = {
    // -------------------------------------------------------
    // Save coins
    // -------------------------------------------------------
    coins: joi_1.default.object({
        symbol: joi_1.default.string().trim().optional().messages({
            "string.base": "Symbol should be a type of 'text'.",
            "string.empty": "Symbol cannot be empty.",
        }),
        name: joi_1.default.string().trim().optional().messages({
            "string.base": "Name should be a type of 'text'.",
            "string.empty": "Name cannot be empty.",
        }),
        image: joi_1.default.string().uri().trim().optional().messages({
            "string.base": "Image should be a valid URI.",
            "string.empty": "Image cannot be empty.",
            "string.uri": "Image must be a valid URL.",
        }),
        price: joi_1.default.string().trim().optional().messages({
            "string.base": "Price should be a type of 'text'.",
            "string.empty": "Price cannot be empty.",
        }),
        market_cap: joi_1.default.string().trim().optional().messages({
            "string.base": "Market cap should be a type of 'text'.",
            "string.empty": "Market cap cannot be empty.",
        }),
        change: joi_1.default.string().trim().optional().messages({
            "string.base": "Change should be a type of 'text'.",
            "string.empty": "Change cannot be empty.",
        }),
        totalVol: joi_1.default.string().trim().optional().messages({
            "string.base": "Total volume should be a type of 'text'.",
            "string.empty": "Total volume cannot be empty.",
        }),
    }),
};
// -------------------------
// Export coins joi
// -------------------------
exports.default = joi;
