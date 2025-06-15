"use strict";
// import {Request, Response} from "express"
// import { DishModel } from "../models/dish.model";
// import { ApiError } from "../helpers/ApiError";
// import { ApiResponse } from "../helpers/ApiResponse";
// import { uploadOnCloudinary } from "../utils/cloudinary";
// export const getAllDishesFunction = async (req: Request, res: Response) => {
//     try {
//         const allDishesInfo = await DishModel.find();
//         if(!allDishesInfo){
//             throw new ApiError(500, "Error getting dishes")
//         }
//         res.status(200).json(new ApiResponse(200, allDishesInfo, "All dishes fetched"))
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// }
// export const addDishFunction = async (req: Request, res: Response) => {
//     try {
//         const {name, description, price, category, inStock, rating} = req.body;
//         if(!name || !description || !price || !category || !inStock || !rating){
//             throw new ApiError(400, "Each field is required")
//         }
//         const dishWithNameAlreadyExists = await DishModel.findOne({name})
//         if(dishWithNameAlreadyExists){
//             throw new ApiError(400, "Dish already exists")
//         }
//         // Picture upload
//         const dishPictureLocalPath = req.file?.path
//         if(!dishPictureLocalPath){
//             throw new ApiError(400, "Picture is required")
//         }
//         const dishPicture = await uploadOnCloudinary(dishPictureLocalPath)
//         if(!dishPicture){
//             throw new ApiError(500, "Picture not uploaded")
//         }
//         // Dish creation
//         await DishModel.create({
//             name, description, price, category, inStock, rating, image: dishPicture.secure_url
//         })
//         const addedDish = await DishModel.findOne({name})
//         if(!addedDish){
//             throw new ApiError(500, "Dish addition failed")
//         }
//         res.status(200).json(new ApiResponse(200, addedDish, "Dish added sucessfully"))
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// }
