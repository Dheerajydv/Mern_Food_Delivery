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
const ApiResponse_1 = require("../../helpers/ApiResponse");
const cart_model_1 = require("../../models/cart.model");
const removeFromCartFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartIdToRemove = req.params.id;
        const removedCart = yield cart_model_1.CartModel.findByIdAndDelete(cartIdToRemove);
        res.status(200).json(new ApiResponse_1.ApiResponse(200, removedCart, "Dish removed from cart"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.removeFromCartFunction = removeFromCartFunction;
