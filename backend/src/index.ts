// Package imports
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/database";
import cookirParser from "cookie-parser";

// File imports
import { router } from "./routes/router";

// App
const app = express();

// Middleware
app.use(cookirParser());
dotenv.config();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/v1", router);

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

// Database
connectToDatabase();
