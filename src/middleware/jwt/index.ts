import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import response from "../../config/response";
import { CustomRequest } from "../../config/types";


// ---------------------------------------------------------
// Verify token
// ---------------------------------------------------------

const verify = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = req.header("Authorization")?.slice(7) || "";

    if (!token) {
      return response.errors(res, "Authentication failed: Please provide token .");
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err: any, decodedToken: any) => {
        if (err) {
          return response.errors(
            res,
            "Invalid Authentication, Please login again.",
            400
          );
        }
        req.user = decodedToken;
        next();
      }
    );
  } catch (error) {
    return response.errors(res, (error as Error).message, 500);
  }
};



// ---------------------------
// Export token verify
// ---------------------------
export default verify;
