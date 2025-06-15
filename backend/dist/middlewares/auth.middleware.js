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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAutherization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../helpers/ApiError");
const user_model_1 = require("../models/user.model");
const verifyUserAutherization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        //verify the user
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
        if (!token) {
            throw new ApiError_1.ApiError(401, "Unauthorised request ");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET_KEY);
        if (!decodedToken || typeof decodedToken == "string") {
            throw new ApiError_1.ApiError(401, "Wrong Token");
        }
        const user = yield user_model_1.UserModel.findById(decodedToken._id).select("-password");
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid access token");
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error("Error in verify user middleware: ", err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.verifyUserAutherization = verifyUserAutherization;
