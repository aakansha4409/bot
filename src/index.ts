import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import database from "./config/database";
import errorHandlers from "./middleware/error";
import routes from "./routes";
import userRoutes from "./controllers/startBot"; // Import the bot file where we added the API

const app = express();
const router = express.Router();

// ------------------------------------------------
// Use middlewares
// ------------------------------------------------
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ----------------------------------
// Use routes
// ----------------------------------
app.use("/api", routes);

// ----------------------------------
// Error handling
// ----------------------------------
app.use(errorHandlers.notFound);
app.use("/", errorHandlers.errors);
app.use("/", errorHandlers.server);

// --------------------------------------------------
// Connect database
// --------------------------------------------------
database();

router.use("/user", userRoutes); // ✅ Adds `/api/user`

// --------------------------------------------------
// Run server
// --------------------------------------------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
