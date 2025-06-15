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
exports.checkIfAdmin = void 0;
const ApiError_1 = require("../helpers/ApiError");
const user_model_1 = require("../models/user.model");
const checkIfAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userIdInObjectForm = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const userId = userIdInObjectForm.toString();
        if (!userId) {
            throw new ApiError_1.ApiError(401, "User id not found");
        }
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(401, "User not found");
        }
        if (user === null || user === void 0 ? void 0 : user.isAdmin) {
            next();
        }
        else {
            throw new ApiError_1.ApiError(401, "Not an admin");
        }
    }
    catch (err) {
        console.error("Error in verify user middleware: ", err);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({ "error": err });
    }
});
exports.checkIfAdmin = checkIfAdmin;
