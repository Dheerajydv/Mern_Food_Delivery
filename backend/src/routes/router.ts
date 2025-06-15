import { Router } from "express";
import userRoutes from "./userRoutes/user.route";
import authRoutes from "./authRoutes/auth.route";
import dishRoutes from "./dishRoutes/dish.route";
import orderRoutes from "./cartRoutes/cart.route"

export const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/dish", dishRoutes);
router.use("/orders", orderRoutes);
