import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { DishModel } from "../../models/dish.model";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

export const removeDishFunction = async (req: AuthRequest, res: Response) => {
    try {
        const idOfDishToRemove = req.params.id;
        if(!idOfDishToRemove){
            throw new ApiError(400, "Dish id not found")
        }
        const removedDish = await DishModel.findByIdAndDelete(idOfDishToRemove)
        if(!removedDish){
            throw new ApiError(500, "Dish not removed")
        }
        res.status(200).json(new ApiResponse(200, removedDish, "Dish removed sucessfully"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}