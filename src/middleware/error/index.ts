import response from "../../config/response";
import { ErrorHandlers } from "../../config/types";

// --------------------------------------------------------
// Error handlers
// --------------------------------------------------------

const errorHandlers: ErrorHandlers = {

  // ---------------------------------------------
  // Handle error
  // ---------------------------------------------

  errors: (err, req, res, next) => {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(
        (error: any) => error.message
      );
      return response.errors(res, "Validation error", 400)
    } else if (
      err instanceof SyntaxError &&
      (err as any).status === 400 &&
      "body" in err
    ) {
      return response.errors(res, "Invalid JSON syntax", 400)
    } else if (err.name === "UnauthorizedError") {
      return response.errors(res, "Unauthorized access", 401)
    } else if (
      err.name === "MongoNetworkError" ||
      err.name === "MongooseError"
    ) {
      return response.errors(res, "Database connection error", 500)
    } else if (err.name === "BadRequestError") {
      return response.errors(res, "Bad request", 400)
    } else if (err.name === "RateLimitError") {
      return response.errors(res, "Too many requests, please try again later", 429)
    } else if (err.name === "CustomAppError") {
      return response.errors(res, err.message, 400)
    } else if (err.name === "ForbiddenError") {
      return response.errors(res, "Forbidden access", 403)
    }
    next(err);
  },

  // --------------------------------------------
  // Route not found
  // --------------------------------------------

  notFound: (req, res, next) => {
    return response.errors(res, "The requested endpoint does not exist. Please check the URL.", 404)
  },

  // -----------------------------------------------
  // Handle server errors
  // -----------------------------------------------

  server: (err, req, res, next) => {
    return response.errors(res, err.message, 500)
  },

};

// --------------------------------------
// Export handle errors
// --------------------------------------
export default errorHandlers;
