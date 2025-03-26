import Joi from "joi";
import UserJoi from "./type";

// ---------------------------------------------------------
// User Joi validation schema
// ---------------------------------------------------------

const joi: UserJoi = {

  // -------------------------------------------------------
  // Signup a user
  // -------------------------------------------------------

  signup: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': "Email should be a type of 'text'.",
      'string.empty': "Email cannot be empty. Please provide an email address.",
      'string.email': "Email must be a valid email address.",
      'any.required': "Email is required. Please provide an email address.",
    }),
    password: Joi.string().trim().min(4).max(40).required().messages({
      'string.base': "Password should be a type of 'text'.",
      'string.empty': "Password cannot be empty.",
      'string.min': "Password must be at least 4 characters long.",
      'string.max': "Password must be at most 40 characters long.",
      'any.required': "Password is required.",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
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

  signin: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': "Email should be a type of 'text'.",
      'string.empty': "Email cannot be empty. Please provide an email address.",
      'string.email': "Email must be a valid email address.",
      'any.required': "Email is required. Please provide an email address.",
    }),
    password: Joi.string().trim().min(4).max(40).required().messages({
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
export default joi;
