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
exports.addOrderFunction = void 0;
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const user_model_1 = require("../../models/user.model");
const order_model_1 = require("../../models/order.model");
const dish_model_1 = require("../../models/dish.model");
const orderItems_model_1 = require("../../models/orderItems.model");
const addOrderFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the user making order
        const userId = req.params.userId;
        const userMakingRequest = yield user_model_1.UserModel.findById(userId);
        if (!userMakingRequest) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        // find the item to add
        const dishId = req.params.id;
        const dishToAddToOrder = yield dish_model_1.DishModel.findById(dishId);
        // get the users order list
        yield order_model_1.OrderModel.create({
            user: userMakingRequest
        });
        const userOrders = yield order_model_1.OrderModel.findOne({
            user: userMakingRequest,
        });
        if (!userOrders) {
            throw new ApiError_1.ApiError(404, "User orders not found");
        }
        let orderItemAlreadyExistsInOrders = false;
        userOrders.items.forEach((item) => {
            if (item._id == orderItem._id) {
                orderItemAlreadyExistsInOrders = true;
            }
        });
        if (orderItemAlreadyExistsInOrders) {
            // if orderitem already exists in orders
            // inc the orderitem quantity by 1
            yield orderItems_model_1.OrderItemsModel.findOneAndUpdate({ dish: dishToAddToOrder }, { $inc: { quantity: 1 } }, { new: true });
        }
        // create a new order item
        const orderItem = yield orderItems_model_1.OrderItemsModel.create({
            dish: dishToAddToOrder, //dish to add
            order: userOrders
        });
        orderItem.save();
        userOrders === null || userOrders === void 0 ? void 0 : userOrders.items.push(orderItem);
        userOrders === null || userOrders === void 0 ? void 0 : userOrders.save();
        res.status(200).json(new ApiResponse_1.ApiResponse(200, orderItem, "Item added to order"));
        // orders.items.push(orderItem)
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ error: err });
    }
});
exports.addOrderFunction = addOrderFunction;
