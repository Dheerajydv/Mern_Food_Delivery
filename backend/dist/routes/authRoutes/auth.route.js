"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../../controllers/authControllers/signup.controller");
const login_controller_1 = require("../../controllers/authControllers/login.controller");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = (0, express_1.Router)();
router.post("/signup", multer_middleware_1.upload.single("profilePicture"), signup_controller_1.signupFunction);
router.post("/login", multer_middleware_1.upload.none(), login_controller_1.loginFunction);
exports.default = router;
