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
exports.removeDishFunction = void 0;
const dish_model_1 = require("../../models/dish.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const removeDishFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idOfDishToRemove = req.params.id;
        if (!idOfDishToRemove) {
            throw new ApiError_1.ApiError(400, "Dish id not found");
        }
        const removedDish = yield dish_model_1.DishModel.findByIdAndDelete(idOfDishToRemove);
        if (!removedDish) {
            throw new ApiError_1.ApiError(500, "Dish not removed");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, removedDish, "Dish removed sucessfully"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.removeDishFunction = removeDishFunction;
