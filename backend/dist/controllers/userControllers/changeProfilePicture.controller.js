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
exports.changeProfilePictureFunction = void 0;
const user_model_1 = require("../../models/user.model");
const ApiError_1 = require("../../helpers/ApiError");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const cloudinary_1 = require("../../utils/cloudinary");
//TODO : MODIFY THE FUNCTIONS TO USE THE FINDBYIDANDUPDATE METHOD
const changeProfilePictureFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // get user making request
        const userIdMakingRequest = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userIdMakingRequest) {
            throw new ApiError_1.ApiError(401, "Not authorised");
        }
        const userMakingRequest = yield user_model_1.UserModel.findById(userIdMakingRequest);
        if (!userMakingRequest) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        // get new profile picture
        const newProfilePictureLocalPath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        if (!newProfilePictureLocalPath) {
            throw new ApiError_1.ApiError(400, "New profile picture required");
        }
        // upload new profile pic to the cloudinary server
        const newProfilePicture = yield (0, cloudinary_1.uploadOnCloudinary)(newProfilePictureLocalPath);
        if (!newProfilePicture) {
            throw new ApiError_1.ApiError(500, "Profile picture not uploaded");
        }
        // change the profile pic
        userMakingRequest.profilePicture = newProfilePicture.secure_url;
        // save to database
        yield userMakingRequest.save({ validateBeforeSave: false });
        // return response
        res.status(200).json(new ApiResponse_1.ApiResponse(200, {}, "Profile picture changed sucessfully"));
    }
    catch (err) {
        console.error(err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.changeProfilePictureFunction = changeProfilePictureFunction;
