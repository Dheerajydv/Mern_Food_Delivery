import { Request, Response } from "express";
import { DishModel } from "../../models/dish.model";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";
import { uploadOnCloudinary } from "../../utils/cloudinary";

export const editDishFunction = async (req: Request, res: Response) => {
    try {
        // get all the new fields
        const {
            newName,
            newDescription,
            newPrice,
            newCategory,
            newInStock,
            newRating,
        } = req.body;
        // update the picture
        const newDishPictureLocalPath = req.file?.path;
        let updatedData = {};
        if (newDishPictureLocalPath) {
            // update new data with image
            const newDishPicture = await uploadOnCloudinary(
                newDishPictureLocalPath
            );
            if (!newDishPicture) {
                throw new ApiError(500, "Dish picture not uploaded");
            }
            updatedData = {
                name: newName,
                description: newDescription,
                price: newPrice,
                image: newDishPicture.secure_url,
                category: newCategory,
                inStock: newInStock,
                rating: newRating,
            };
        } else {
            // update data without new image
            updatedData = {
                name: newName,
                description: newDescription,
                price: newPrice,
                category: newCategory,
                inStock: newInStock,
                rating: newRating,
            };
        }
        // get the dish to be edited and edit
        const dishFoundAndUpdated = await DishModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );
        if (!dishFoundAndUpdated) {
            throw new ApiError(500, "Dish not found");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                dishFoundAndUpdated,
                "Dish updated sucessfully"
            )
        );
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({ error: err });
    }
};
