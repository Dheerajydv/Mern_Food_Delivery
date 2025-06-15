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
exports.getUserInfoFunction = void 0;
const user_model_1 = require("../../models/user.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const getUserInfoFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //get the user
        if (!req.user) {
            throw new ApiError_1.ApiError(404, "Please login first");
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        // Populating the fields
        const userCompleteInfo = yield user_model_1.UserModel.aggregate([
            {
                $project: {
                    password: 0
                }
            },
            {
                $match: {
                    _id: userId
                }
            },
            {
                $lookup: {
                    from: "dish",
                    localField: "favroites",
                    foreignField: "_id",
                    as: "favroites",
                }
            },
            {
                $lookup: {
                    from: "ordermodels",
                    localField: "orders",
                    foreignField: "_id",
                    as: "orders",
                }
            }
        ]);
        if (!userCompleteInfo) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, userCompleteInfo, "User found"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.getUserInfoFunction = getUserInfoFunction;
