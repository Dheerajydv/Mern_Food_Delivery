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
exports.addDishFunction = void 0;
const dish_model_1 = require("../../models/dish.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const cloudinary_1 = require("../../utils/cloudinary");
const addDishFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, price, category, inStock, rating } = req.body;
        if (!name || !description || !price || !category || !inStock || !rating) {
            throw new ApiError_1.ApiError(400, "Each field is required");
        }
        const dishWithNameAlreadyExists = yield dish_model_1.DishModel.findOne({ name });
        if (dishWithNameAlreadyExists) {
            throw new ApiError_1.ApiError(400, "Dish already exists");
        }
        // Picture upload
        const dishPictureLocalPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!dishPictureLocalPath) {
            throw new ApiError_1.ApiError(400, "Picture is required");
        }
        const dishPicture = yield (0, cloudinary_1.uploadOnCloudinary)(dishPictureLocalPath);
        if (!dishPicture) {
            throw new ApiError_1.ApiError(500, "Picture not uploaded");
        }
        // creating a slug for better searching
        const slug = name.replace(/\s+/g, "-");
        // Dish creation
        yield dish_model_1.DishModel.create({
            name, slug, description, price, category, inStock, rating, image: dishPicture.secure_url
        });
        const addedDish = yield dish_model_1.DishModel.findOne({ name });
        if (!addedDish) {
            throw new ApiError_1.ApiError(500, "Dish addition failed");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, addedDish, "Dish added sucessfully"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.addDishFunction = addDishFunction;
