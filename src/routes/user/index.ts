import express, { Router } from "express";
import user  from "../../controllers/User";


// --------------------------------------
// Define the router
// --------------------------------------

const router: Router = express.Router();

// ---------------------------------------
// Get a user
// ---------------------------------------
router.get(
    "/user",
    user.get
);

// ----------------------
// Export router
// ----------------------
export default router;
