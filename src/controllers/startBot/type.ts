import { Response } from "express";
import { CustomRequest } from "../../config/types";

// ---------------------------------------------------------------
// Define interface
// ---------------------------------------------------------------

interface Controller {
    start: (req: CustomRequest, res: Response) => Promise<Response>;
}

// --------------------------
// Export Controller
// --------------------------
export default Controller;
