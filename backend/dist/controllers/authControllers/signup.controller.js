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
exports.signupFunction = void 0;
const user_model_1 = require("../../models/user.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const cloudinary_1 = require("../../utils/cloudinary");
const signupFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, email, password, isAdmin } = req.body;
        if (!username) {
            throw new ApiError_1.ApiError(400, "Enter a username");
        }
        if (!password) {
            throw new ApiError_1.ApiError(400, "Enter a password");
        }
        if (!email) {
            throw new ApiError_1.ApiError(400, "Enter an email");
        }
        if (!isAdmin) {
            throw new ApiError_1.ApiError(400, "Enter if you want to be an admin or not");
        }
        const userAlreadyExistsWithUsername = yield user_model_1.UserModel.findOne({
            username,
        });
        if (userAlreadyExistsWithUsername) {
            throw new ApiError_1.ApiError(400, "Username already taken");
        }
        const userAlreadyExistsWithEmail = yield user_model_1.UserModel.findOne({ email });
        if (userAlreadyExistsWithEmail) {
            throw new ApiError_1.ApiError(400, "User already exists with provided email");
        }
        const profilePictureLocalPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!profilePictureLocalPath) {
            throw new ApiError_1.ApiError(400, "Profile picture is required");
        }
        const uploadedProfilePicture = yield (0, cloudinary_1.uploadOnCloudinary)(profilePictureLocalPath);
        if (!uploadedProfilePicture) {
            throw new ApiError_1.ApiError(500, "Picture not uploaded");
        }
        yield user_model_1.UserModel.create({
            username,
            email,
            password,
            profilePicture: uploadedProfilePicture === null || uploadedProfilePicture === void 0 ? void 0 : uploadedProfilePicture.secure_url,
            isAdmin,
        });
        const createdUser = yield user_model_1.UserModel.findOne({ username }).select("-password");
        res.status(200).json(new ApiResponse_1.ApiResponse(200, createdUser, "User registered sucessfully"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.signupFunction = signupFunction;
