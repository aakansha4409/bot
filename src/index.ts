import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import database from "./config/database";
import errorHandlers from "./middleware/error";
import routes from "./routes"; 
import bot from "./controllers/startBot"

const app = express();
// ------------------------------------------------
// Use middlewares
// ------------------------------------------------
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// --------------------------------------------------
// Connect database
// --------------------------------------------------
database();

// ----------------------------------
// Use routes
// ----------------------------------
app.use("/", routes);

// ----------------------------------
// Start bot
// ----------------------------------

app.use("/", bot);
// ----------------------------------
// Error handling
// ----------------------------------
app.use(errorHandlers.notFound);
app.use("/", errorHandlers.errors);
app.use("/", errorHandlers.server);

// --------------------------------------------------
// Run server
// --------------------------------------------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`🚀 Server running at port ${port}`);
});
