import {Request, Response} from "express"
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";
import { UserModel } from "../../models/user.model";
import { CartModel } from "../../models/cart.model";


export const removeFromCartFunction = async (req: Request, res: Response) => {
    try {
        const cartIdToRemove = req.params.id;
        const removedCart = await CartModel.findByIdAndDelete(cartIdToRemove)
        res.status(200).json(new ApiResponse(200, removedCart, "Dish removed from cart"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}