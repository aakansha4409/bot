import { ResponseHandlers } from "../types";

// --------------------------------------------------------
// API response handler
// --------------------------------------------------------

export const response: ResponseHandlers = {

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
export default response;
