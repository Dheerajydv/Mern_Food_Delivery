"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = __importDefault(require("./userRoutes/user.route"));
const auth_route_1 = __importDefault(require("./authRoutes/auth.route"));
const dish_route_1 = __importDefault(require("./dishRoutes/dish.route"));
const cart_route_1 = __importDefault(require("./cartRoutes/cart.route"));
exports.router = (0, express_1.Router)();
exports.router.use("/auth", auth_route_1.default);
exports.router.use("/user", user_route_1.default);
exports.router.use("/dish", dish_route_1.default);
exports.router.use("/orders", cart_route_1.default);
