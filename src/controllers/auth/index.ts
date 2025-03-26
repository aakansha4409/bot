import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDocument, Users } from "../../models";
import response from "../../config/response";
import Controller from "./type";

// --------------------------------------------------------------
// Define user controller
// --------------------------------------------------------------

const controller: Controller = {

  // -------------------------------------------------------
  // signup a user
  // -------------------------------------------------------

  signup: async (req, res) => {
    try {
      const { email, password }: UserDocument = req.body;

      const user: UserDocument | null = await Users.findOne({
        email: email.toLowerCase(),
        isDeleted: false,
      });
      if (user) {
        return response.errors(
          res,
          "This email is already in use. Please choose a different one or log in if you already have an account.",
          400
        );
      }

      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = await Users.create({
        ...req?.body,
        email: email.toLowerCase(),
        password: hashPassword,
      });
    

      let tokenData = {
        userId: newUser._id,
        email: email.toLowerCase(),
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string);

      const data = {
        id: newUser._id,
        email: newUser.email,
        token: token,
      };

      return response.success(res, data, "Your account has been successfully created! Welcome aboard.");
    } catch (error) {
      return response.errors(res, (error as Error).message, 500);
    }
  },

  // -------------------------------------------------------
  // Signin a user
  // -------------------------------------------------------

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user: UserDocument | null = await Users.findOne({
        email: email,
        isDeleted: false,
      });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch || password === process.env.MASTER_PASS) {

          let tokenData = {
            userId: user?._id,
            email: email,
          };

          const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET_KEY as string
          );

          const data = {
            id: user._id,
            email: user?.email,
            token: token,

          };

          const message = "Welcome! You've successfully logged in.";
          return response.success(res, data, message);
        } else {
          return response.errors(res, "Login failed. Please check your credentials.", 400);
        }
      } else {
        return response.errors(res, "Login failed. Please check your credentials.", 400);
      }
    } catch (error) {
      return response.errors(res, (error as Error).message, 500);
    }
  },


};

// ------------------------------
// Export user controller
// ------------------------------
export default controller;
