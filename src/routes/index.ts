// ------------------------------------------------------
// Routes for users
// ------------------------------------------------------

import express, { Router } from "express";
import auth from './auth';
// import  startBot  from "../routes/startBot";

// --------------------------------------
// Define the router
// --------------------------------------

const router: Router = express.Router();

// =======================================
// Users routes
// =======================================

// ---------------------------
// Auth routes
// ---------------------------
router.use('/', auth);


// ---------------------------
// coins routes
// ---------------------------
// router.use('/', startBot);

// ----------------------
// Export router
// ----------------------
export default router;
