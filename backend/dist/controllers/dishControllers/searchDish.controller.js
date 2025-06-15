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
exports.getDishBySearchedCategoryFunction = exports.getSearchedDishFunction = void 0;
const dish_model_1 = require("../../models/dish.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const getSearchedDishFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Todo : get searched dish
        const dishToSearchSlug = req.params.dish;
        const dishToSearch = dishToSearchSlug.replace(/-/g, ' ');
        if (!dishToSearch) {
            throw new ApiError_1.ApiError(400, "Dish name required");
        }
        const searchedDish = yield dish_model_1.DishModel.findOne({ name: dishToSearch });
        if (!searchedDish) {
            throw new ApiError_1.ApiError(400, "Dish not found");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, searchedDish, "Found your dish"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.getSearchedDishFunction = getSearchedDishFunction;
const getDishBySearchedCategoryFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Todo : get all dished by searched category
        const categoryOfDishToSearch = req.params.category;
        if (!categoryOfDishToSearch) {
            throw new ApiError_1.ApiError(400, "Select category to search");
        }
        const allDishesOfSearchedCategory = yield dish_model_1.DishModel.find({ category: categoryOfDishToSearch });
        if (!allDishesOfSearchedCategory) {
            throw new ApiError_1.ApiError(400, "Dishes of selected category not found");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, allDishesOfSearchedCategory, `All dishes of ${categoryOfDishToSearch} fetched`));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.getDishBySearchedCategoryFunction = getDishBySearchedCategoryFunction;
