"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// --------------------------------------------------------
// Joi validation schema
// --------------------------------------------------------
const joi = {
    // --------------------------------------------------------
    // Validate schema
    // --------------------------------------------------------
    validate: (schema) => {
        return (req, res, next) => {
            const { error } = schema.validate(req?.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error?.message,
                });
            }
            next();
        };
    },
};
// --------------------------------
// Export joi validation
// --------------------------------
exports.default = joi;
