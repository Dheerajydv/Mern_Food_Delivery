import { Router } from "express";
import {checkIfAdmin} from "../../middlewares/adminCheck.middleware"
import {verifyUserAutherization} from "../../middlewares/auth.middleware"
import {getAllDishesFunction} from "../../controllers/dishControllers/getAllDish.controller"
import {addDishFunction} from "../../controllers/dishControllers/addDish.controller"
import {editDishFunction} from "../../controllers/dishControllers/editDish.controller"
import {removeDishFunction} from "../../controllers/dishControllers/removeDish.controller"
import {getSearchedDishFunction} from "../../controllers/dishControllers/searchDish.controller"
import {getDishBySearchedCategoryFunction} from "../../controllers/dishControllers/searchDish.controller"
import {getDishBySearchId} from "../../controllers/dishControllers/searchDish.controller"
import { upload } from "../../middlewares/multer.middleware";

const router = Router();

router.get("/all", getAllDishesFunction);
router.get("/search/:dish", getSearchedDishFunction);
router.get("/searchById/:dishId", getDishBySearchId);
router.get("/category/:category", getDishBySearchedCategoryFunction);
router.post("/add", verifyUserAutherization, checkIfAdmin, upload.single("image"), addDishFunction);
router.delete("/remove/:id", verifyUserAutherization, checkIfAdmin, removeDishFunction);
router.post("/edit/:id", verifyUserAutherization, checkIfAdmin, upload.single("newImage"), editDishFunction);


export default router;
