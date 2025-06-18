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
exports.addToCartFunction = void 0;
const dish_model_1 = require("../../models/dish.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const user_model_1 = require("../../models/user.model");
const cart_model_1 = require("../../models/cart.model");
const addToCartFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userMakingRequest = yield user_model_1.UserModel.findById(userId);
        if (!userMakingRequest) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        const productId = req.params.id;
        const productToAdd = yield dish_model_1.DishModel.findById(productId);
        if (!productToAdd) {
            throw new ApiError_1.ApiError(404, "Dish not found");
        }
        const { quantity } = req.body;
        //if cart already exists
        const alreadyCreatedCart = yield cart_model_1.CartModel.findOne({
            user: userMakingRequest._id,
        });
        if (alreadyCreatedCart) {
            const productToAddInAlreadyExistingCart = {
                product: productToAdd._id,
                quantity,
            };
            alreadyCreatedCart.items.push(productToAddInAlreadyExistingCart);
            alreadyCreatedCart.save();
            res.status(200).json(new ApiResponse_1.ApiResponse(200, alreadyCreatedCart, "Items added to cart"));
        }
        else {
            //if it doesnot
            const cart = yield cart_model_1.CartModel.create({
                user: userMakingRequest,
                items: [{ product: productToAdd, quantity }],
            });
            yield user_model_1.UserModel.findByIdAndUpdate(userId, { cart });
            res.status(200).json(new ApiResponse_1.ApiResponse(200, cart, "Items added to cart"));
        }
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ error: err });
    }
});
exports.addToCartFunction = addToCartFunction;
