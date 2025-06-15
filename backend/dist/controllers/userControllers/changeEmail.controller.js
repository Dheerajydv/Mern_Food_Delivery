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
exports.changeEmailFunction = void 0;
const user_model_1 = require("../../models/user.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
//TODO : MODIFY THE FUNCTIONS TO USE THE FINDBYIDANDUPDATE METHOD
const changeEmailFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get user whose email is to change
        const userIdMakingRequest = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userIdMakingRequest) {
            throw new ApiError_1.ApiError(401, "Not authorised");
        }
        const userMakingRequest = yield user_model_1.UserModel.findById(userIdMakingRequest);
        if (!userMakingRequest) {
            throw new ApiError_1.ApiError(400, "User not found");
        }
        // get new email
        const { newEmail } = req.body;
        if (!newEmail) {
            throw new ApiError_1.ApiError(400, "New email is required");
        }
        // change the email
        userMakingRequest.email = newEmail;
        // save to database
        userMakingRequest.save({ validateBeforeSave: false });
        // return the response
        res.status(200).json(new ApiResponse_1.ApiResponse(200, { "New Email": newEmail }, "Email changed sucessfully"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.changeEmailFunction = changeEmailFunction;
