"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDishFunction = void 0;
const dish_model_1 = require("../../models/dish.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const cloudinary_1 = require("../../utils/cloudinary");
const editDishFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get all the new fields
        const { newName, newDescription, newPrice, newCategory, newInStock, newRating, } = req.body;
        // update the picture
        const newDishPictureLocalPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        let updatedData = {};
        if (newDishPictureLocalPath) {
            // update new data with image
            const newDishPicture = yield (0, cloudinary_1.uploadOnCloudinary)(newDishPictureLocalPath);
            if (!newDishPicture) {
                throw new ApiError_1.ApiError(500, "Dish picture not uploaded");
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
        }
        else {
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
        const dishFoundAndUpdated = yield dish_model_1.DishModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!dishFoundAndUpdated) {
            throw new ApiError_1.ApiError(500, "Dish not found");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, dishFoundAndUpdated, "Dish updated sucessfully"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ error: err });
    }
});
exports.editDishFunction = editDishFunction;
