"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
// --------------------------------------------------------
// API response handler
// --------------------------------------------------------
exports.response = {
    // ---------------------------------------------------------------
    // Success response
    // ---------------------------------------------------------------
    success: (res, data, message, statusCode = 200) => {
        return res
            .status(statusCode)
            .json({ success: true, message: message, data: data });
    },
    // ---------------------------------------------------------------
    // Error response
    // ---------------------------------------------------------------
    errors: (res, message, statusCode = 200, error = "") => {
        return res
            .status(statusCode)
            .json({ success: false, message: message, errors: error });
    },
};
// -----------------------------------------------------
// Export response handler
// -----------------------------------------------------
exports.default = exports.response;
