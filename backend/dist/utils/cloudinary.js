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
exports.uploadOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    // api_key: process.env.CLOUDINARY_API_KEY!,
    // api_secret: process.env.CLOUDINARY_API_SECRET!,
    cloud_name: "dhz7abkkq",
    api_key: "393752891396517",
    api_secret: "HobM0Jxc1WMUt-CbLCOS6OlJId8",
});
const uploadOnCloudinary = (localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!localFilePath)
            return null;
        const response = yield cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: "image",
        });
        console.log("Uploading done");
        fs_1.default.unlinkSync(localFilePath);
        return response;
    }
    catch (error) {
        fs_1.default.unlinkSync(localFilePath); //removes the file from the server as the file upload got failed
        console.log(`Some error in upload on cloudinary function : ${error}`);
        return null;
    }
});
exports.uploadOnCloudinary = uploadOnCloudinary;
