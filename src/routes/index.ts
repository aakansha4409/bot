// ------------------------------------------------------
// Routes for users
// ------------------------------------------------------

import express, { Router } from "express";
import user from './user';

// --------------------------------------
// Define the router
// --------------------------------------

const router: Router = express.Router();

// ---------------------------------------
// User routes
// ---------------------------------------

router.use('/', user);

// ----------------------
// Export router
// ----------------------
export default router;
