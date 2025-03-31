// ------------------------------------------------------
// Routes for users
// ------------------------------------------------------

import express, { Router } from "express";
import start_bot from './startBot';
import user from './user';

// --------------------------------------
// Define the router
// --------------------------------------

const router: Router = express.Router();

// ---------------------------------------
// Start the bot
// ---------------------------------------

router.use('/', start_bot);

// ---------------------------------------
// User routes
// ---------------------------------------

router.use('/', user);

// ----------------------
// Export router
// ----------------------
export default router;
