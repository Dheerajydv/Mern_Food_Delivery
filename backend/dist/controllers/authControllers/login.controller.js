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
exports.loginFunction = void 0;
const user_model_1 = require("../../models/user.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const generateAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(500, "User not found to generate accesss token");
        }
        const accessToken = user.generateAccessToken();
        return accessToken;
    }
    catch (error) {
        console.error("Error generating access token", error);
        return;
    }
});
const loginFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ "Request body": req.body });
        const { email, password } = req.body;
        if (!email) {
            throw new ApiError_1.ApiError(400, "Enter an email");
        }
        if (!password) {
            throw new ApiError_1.ApiError(400, "Enter an password");
        }
        const userTryingToLogin = yield user_model_1.UserModel.findOne({ email });
        if (!userTryingToLogin) {
            throw new ApiError_1.ApiError(400, "Wrong email");
        }
        const isPasswordCorrect = userTryingToLogin.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError_1.ApiError(400, "Incorrect password");
        }
        const accessToken = yield generateAccessToken(userTryingToLogin._id);
        // get the loggedin user (leaving this because not sure if its necessary to send the loggedin user date to frontend)
        // const loggedInUser = await UserModel.findById(
        //     userTryingToLogin._id
        // ).select("-password");
        // options
        const options = {
            htmlOnly: false,
            secure: false,
        };
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .json(new ApiResponse_1.ApiResponse(200, { message: "User logged in" }, "User login sucessfull"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.loginFunction = loginFunction;
