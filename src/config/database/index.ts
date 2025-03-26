import mongoose from "mongoose";

// -------------------------------------------------------
// Database connection
// -------------------------------------------------------

const database = async () : Promise<void> => {
    try {
        const url : string = process.env.DATABASE_URL as string;
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database:", (error as Error).message );
    }
};

// ----------------------------
// Export database connection
// ----------------------------
export default database;

