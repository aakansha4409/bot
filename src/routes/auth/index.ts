import express, { Router } from "express";
import { joi, userJoi } from "../../middleware/joi";
import { auth } from "../../controllers";
import  verify  from "../../middleware/jwt";


// --------------------------------------
// Define the router
// --------------------------------------

const router: Router = express.Router();

// ---------------------------------------
// Sign up user
// ---------------------------------------
router.post(
    "/signup",
    joi.validate(userJoi.signup),
    auth.signup
);

// ---------------------------------------
// Sign in user
// ---------------------------------------
router.post(
    "/signin",
    joi.validate(userJoi.signin),
    auth.signin
);


// ----------------------
// Export router
// ----------------------
export default router;
