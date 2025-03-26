import Joi from "joi";
import CoinsJoi from "../coins/type";

// ---------------------------------------------------------
// coins Joi validation schema
// ---------------------------------------------------------

const joi: CoinsJoi = {

    // -------------------------------------------------------
    // Save coins
    // -------------------------------------------------------

    coins: Joi.object({
        symbol: Joi.string().trim().optional().messages({
            "string.base": "Symbol should be a type of 'text'.",
            "string.empty": "Symbol cannot be empty.",
        }),
        name: Joi.string().trim().optional().messages({
            "string.base": "Name should be a type of 'text'.",
            "string.empty": "Name cannot be empty.",
        }),
        image: Joi.string().uri().trim().optional().messages({
            "string.base": "Image should be a valid URI.",
            "string.empty": "Image cannot be empty.",
            "string.uri": "Image must be a valid URL.",
        }),
        price: Joi.string().trim().optional().messages({
            "string.base": "Price should be a type of 'text'.",
            "string.empty": "Price cannot be empty.",
        }),
        market_cap: Joi.string().trim().optional().messages({
            "string.base": "Market cap should be a type of 'text'.",
            "string.empty": "Market cap cannot be empty.",
        }),
        change: Joi.string().trim().optional().messages({
            "string.base": "Change should be a type of 'text'.",
            "string.empty": "Change cannot be empty.",
        }),
        totalVol: Joi.string().trim().optional().messages({
            "string.base": "Total volume should be a type of 'text'.",
            "string.empty": "Total volume cannot be empty.",
        }),
    }),


};

// -------------------------
// Export coins joi
// -------------------------
export default joi;
