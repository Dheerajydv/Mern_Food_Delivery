import {Request, Response} from "express"
import { DishModel } from "../../models/dish.model";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

export const getAllDishesFunction = async (req: Request, res: Response) => {
    try {
        const allDishesInfo = await DishModel.find();
        if(!allDishesInfo){
            throw new ApiError(500, "Error getting dishes")
        }

        res.status(200).json(new ApiResponse(200, allDishesInfo, "All dishes fetched"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}