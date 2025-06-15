import { Router } from "express";
import {verifyUserAutherization} from "../../middlewares/auth.middleware"
import {getUserInfoFunction} from "../../controllers/userControllers/getUserInfo.controller"
import {changeEmailFunction} from "../../controllers/userControllers/changeEmail.controller"
import {changePasswordFunction} from "../../controllers/userControllers/changePassword.controller"
import {changeProfilePictureFunction} from "../../controllers/userControllers/changeProfilePicture.controller"
import {changeUsernameFunction} from "../../controllers/userControllers/changeUsername.controller"
import { upload } from "../../middlewares/multer.middleware";

const router = Router();

router.get("/me", verifyUserAutherization, getUserInfoFunction);

router.post("/changeusername", verifyUserAutherization, changeUsernameFunction);

router.post("/changeemail", verifyUserAutherization, changeEmailFunction);

router.post("/changepassword", verifyUserAutherization, changePasswordFunction);

router.post("/changeprofile", verifyUserAutherization, upload.single("newProfilePicture"), changeProfilePictureFunction);


export default router;
