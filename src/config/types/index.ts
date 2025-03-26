import { Request, Response, NextFunction } from "express";

// -----------------------------------------------------------
// Define error handlers types
// -----------------------------------------------------------

export interface ErrorHandlers {
  errors: (err: any, req: Request, res: Response, next: NextFunction) => void;
  server: (err: any, req: Request, res: Response, next: NextFunction) => void;
  notFound: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

// ----------------------------------------------------
// Interface for API Response structure
// ----------------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

// ----------------------------------------------------
// Interface for Success and Error Response
// ----------------------------------------------------

export interface ResponseHandlers {
  success: <T>(
    res: Response<any>,
    data: any,
    message?: string,
    statusCode?: number
  ) => Response<ApiResponse<T>>;

  errors: <T>(
    res: Response<any>,
    message?: string,
    statusCode?: number,
    error?: any
  ) => Response<ApiResponse<T>>;
}

// ---------------------------------------------------------
// Create custom interface for request
// ---------------------------------------------------------

export interface CustomRequest extends Request {
  user?: {
    userId: string;
    email: string;
    channelId: string;
  };
}

