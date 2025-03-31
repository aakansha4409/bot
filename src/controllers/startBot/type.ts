import { Response } from "express";
import { CustomRequest } from "../../config/types";
import TelegramBot from "node-telegram-bot-api";

// ---------------------------------------------------------------
// Define interface
// ---------------------------------------------------------------

interface Controller {
    start: (req: CustomRequest, res:Response) => Promise<void>;
}

// --------------------------
// Export Controller
// --------------------------
export default Controller;
