import {Request, Response} from "express"
import { DishModel } from "../../models/dish.model";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";
import { UserModel } from "../../models/user.model";
import { CartModel } from "../../models/cart.model";


export const addToCartFunction = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userMakingRequest = await UserModel.findById(userId);
        if(!userMakingRequest){
            throw new ApiError(404, "User not found")
        }
        const productId = req.params.id
        const productToAdd = await DishModel.findById(productId)
        if(!productToAdd){
            throw new ApiError(404, "Dish not found")
        }
        const {quantity} = req.body
        const cart = await CartModel.create({user: userMakingRequest, items: [{product: productToAdd, quantity}]})
        await UserModel.findByIdAndUpdate(userId, {cart})
        
        res.status(200).json(new ApiResponse(200, cart, "Items added to cart"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}