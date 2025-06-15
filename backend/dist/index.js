"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Package imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database/database");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// File imports
const router_1 = require("./routes/router");
// App
const app = (0, express_1.default)();
// Middleware
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Routes
app.use("/api/v1", router_1.router);
// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
// Database
(0, database_1.connectToDatabase)();
