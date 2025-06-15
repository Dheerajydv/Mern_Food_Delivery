"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/food-app";
const connectToDatabase = () => {
    mongoose_1.default
        .connect(mongoUrl)
        .then(() => console.log("Connected to database"))
        .catch((err) => {
        console.error("Error connecting to database", err);
    });
};
exports.connectToDatabase = connectToDatabase;
