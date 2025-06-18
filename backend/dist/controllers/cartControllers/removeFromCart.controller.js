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
exports.removeFromCartFunction = void 0;
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const user_model_1 = require("../../models/user.model");
const cart_model_1 = require("../../models/cart.model");
const dish_model_1 = require("../../models/dish.model");
const removeFromCartFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dishIdToRemove = req.params.id;
        if (!dishIdToRemove) {
            throw new ApiError_1.ApiError(400, "Dish id not found");
        }
        const dishToRemove = yield dish_model_1.DishModel.findById(dishIdToRemove);
        if (!dishIdToRemove) {
            throw new ApiError_1.ApiError(404, "Dish not found");
        }
        const userMakingRequestId = req.params.userId;
        if (!userMakingRequestId) {
            throw new ApiError_1.ApiError(404, "User id Not Found");
        }
        const userMakingRequest = yield user_model_1.UserModel.findById(userMakingRequestId);
        if (!userMakingRequest) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        const cartId = userMakingRequest === null || userMakingRequest === void 0 ? void 0 : userMakingRequest.cart;
        if (!cartId) {
            throw new ApiError_1.ApiError(404, "Cart id not found");
        }
        const cartAfterRemovingDish = yield cart_model_1.CartModel.findByIdAndUpdate(cartId, {
            $pull: {
                items: {
                    product: dishIdToRemove,
                },
            },
        }, { new: true });
        res.status(200).json(new ApiResponse_1.ApiResponse(200, cartAfterRemovingDish, "Dish removed from cart"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ error: err });
    }
});
exports.removeFromCartFunction = removeFromCartFunction;
