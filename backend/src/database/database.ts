import mongoose from "mongoose";

const mongoUrl: string =
    process.env.MONGODB_URL || "mongodb://localhost:27017/food-app";
export const connectToDatabase = () => {
    mongoose
        .connect(mongoUrl)
        .then(() => console.log("Connected to database"))
        .catch((err) => {
            console.error("Error connecting to database", err);
        });
};
