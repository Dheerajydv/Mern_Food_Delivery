import {Request, Response} from "express"
import { DishModel } from "../../models/dish.model";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

export const getSearchedDishFunction = async (req: Request, res: Response) => {
    try {
        // Todo : get searched dish
        const dishToSearchSlug = req.params.dish;
        const dishToSearch = dishToSearchSlug.replace(/-/g, ' ')
        if(!dishToSearch){
            throw new ApiError(400, "Dish name required")
        }
        const searchedDish = await DishModel.findOne({name: dishToSearch})
        if(!searchedDish){
            throw new ApiError(400, "Dish not found")
        }
        res.status(200).json(new ApiResponse(200, searchedDish, "Found your dish"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}

export const getDishBySearchedCategoryFunction = async (req: Request, res: Response) => {
    try {
        // Todo : get all dished by searched category
        const categoryOfDishToSearch = req.params.category
        if(!categoryOfDishToSearch){
            throw new ApiError(400, "Select category to search")
        }
        const allDishesOfSearchedCategory = await DishModel.find({category: categoryOfDishToSearch})
        if(!allDishesOfSearchedCategory){
            throw new ApiError(400, "Dishes of selected category not found")
        }

        res.status(200).json(new ApiResponse(200, allDishesOfSearchedCategory, `All dishes of ${categoryOfDishToSearch} fetched`))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}