import { Response } from "express";
import { CustomRequest } from "../../config/types";

// ---------------------------------------------------------------
// Define user interface
// ---------------------------------------------------------------

interface Controller {
    get: (req: CustomRequest, res: Response) => Promise<Response>;
}

// --------------------------
// Export Controller
// --------------------------
export default Controller;
