import { Schema } from "joi";
import { RequestHandler } from "express";

// --------------------------------------------------------
// Main joivalidation interface
// --------------------------------------------------------
interface JoiValidation {
  validate(schema: Schema): RequestHandler;
}

// --------------------------------------------------------
// Joi validation schema
// --------------------------------------------------------

const joi: JoiValidation = {

  // --------------------------------------------------------
  // Validate schema
  // --------------------------------------------------------

  validate: (schema: Schema) => {
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
export default joi;
