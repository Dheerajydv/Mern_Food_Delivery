"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const getUserInfo_controller_1 = require("../../controllers/userControllers/getUserInfo.controller");
const changeEmail_controller_1 = require("../../controllers/userControllers/changeEmail.controller");
const changePassword_controller_1 = require("../../controllers/userControllers/changePassword.controller");
const changeProfilePicture_controller_1 = require("../../controllers/userControllers/changeProfilePicture.controller");
const changeUsername_controller_1 = require("../../controllers/userControllers/changeUsername.controller");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.verifyUserAutherization, getUserInfo_controller_1.getUserInfoFunction);
router.post("/changeusername", auth_middleware_1.verifyUserAutherization, changeUsername_controller_1.changeUsernameFunction);
router.post("/changeemail", auth_middleware_1.verifyUserAutherization, changeEmail_controller_1.changeEmailFunction);
router.post("/changepassword", auth_middleware_1.verifyUserAutherization, changePassword_controller_1.changePasswordFunction);
router.post("/changeprofile", auth_middleware_1.verifyUserAutherization, multer_middleware_1.upload.single("newProfilePicture"), changeProfilePicture_controller_1.changeProfilePictureFunction);
exports.default = router;
