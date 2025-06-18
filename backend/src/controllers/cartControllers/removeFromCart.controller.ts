import { Request, Response } from "express";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";
import { UserModel } from "../../models/user.model";
import { CartModel } from "../../models/cart.model";
import { DishModel } from "../../models/dish.model";

export const removeFromCartFunction = async (req: Request, res: Response) => {
    try {
        const dishIdToRemove = req.params.id;
        if (!dishIdToRemove) {
            throw new ApiError(400, "Dish id not found");
        }
        const dishToRemove = await DishModel.findById(dishIdToRemove);
        if (!dishIdToRemove) {
            throw new ApiError(404, "Dish not found");
        }
        const userMakingRequestId = req.params.userId;
        if (!userMakingRequestId) {
            throw new ApiError(404, "User id Not Found");
        }
        const userMakingRequest = await UserModel.findById(userMakingRequestId);
        if (!userMakingRequest) {
            throw new ApiError(404, "User not found");
        }
        const cartId = userMakingRequest?.cart;
        if (!cartId) {
            throw new ApiError(404, "Cart id not found");
        }

        const cartAfterRemovingDish = await CartModel.findByIdAndUpdate(
            cartId,
            {
                $pull: {
                    items: {
                        product: dishIdToRemove,
                    },
                },
            },
            { new: true }
        );

        res.status(200).json(
            new ApiResponse(
                200,
                cartAfterRemovingDish,
                "Dish removed from cart"
            )
        );
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({ error: err });
    }
};
