import { Router } from "express";
import {signupFunction} from "../../controllers/authControllers/signup.controller"
import {loginFunction} from "../../controllers/authControllers/login.controller"
import { upload } from "../../middlewares/multer.middleware";

const router = Router();

router.post("/signup", upload.single("profilePicture"), signupFunction);

router.post("/login",upload.none(), loginFunction);

export default router;
