import {Router} from "express"
import { verifyUserAutherization } from "../../middlewares/auth.middleware"
import {getCartFunction} from "../../controllers/cartControllers/getCart.controller"
import {addToCartFunction} from "../../controllers/cartControllers/addToCart.controller"
import {removeFromCartFunction} from "../../controllers/cartControllers/removeFromCart.controller"

const router = Router()

router.get("/:userId/all", verifyUserAutherization, getCartFunction)
router.post("/:userId/add/:id", verifyUserAutherization, addToCartFunction)
router.delete("/:userId/remove/:id", verifyUserAutherization, removeFromCartFunction)

export default router