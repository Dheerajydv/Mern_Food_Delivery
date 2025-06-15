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
exports.getOrdersFunction = void 0;
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const user_model_1 = require("../../models/user.model");
const order_model_1 = require("../../models/order.model");
const getOrdersFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError_1.ApiError(400, "User id not found");
        }
        const userMakingOrders = yield user_model_1.UserModel.findById(userId);
        if (!userMakingOrders) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        const allOrdersCompleteInfo = yield order_model_1.OrderModel.aggregate([
            {
                $match: {
                    user: userMakingOrders
                }
            },
            {
                $lookup: {
                    from: "orderitemsmodels",
                    localField: "items",
                    foreignField: "_id",
                    as: "items"
                }
            }
        ]);
        if (!allOrdersCompleteInfo) {
            throw new ApiError_1.ApiError(404, "Order details not found");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, allOrdersCompleteInfo, "Order details found"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.getOrdersFunction = getOrdersFunction;
