import express, { Router } from "express";
import botController from "../../controllers/startBot";

// --------------------------------------
// Define the router
// --------------------------------------

const router: Router = express.Router();

// ---------------------------------------
// Start the bot
// ---------------------------------------

router.get(
    "/start",
    botController.start
);

// ----------------------
// Export router
// ----------------------
export default router;
