import { Request, Response } from "express";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";
import { UserModel } from "../../models/user.model";
import { CartModel } from "../../models/cart.model";

export const getCartFunction = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userMakingRequest = await UserModel.findById(userId);
        if (!userMakingRequest) {
            throw new ApiError(404, "User not found");
        }
        const cart = await CartModel.aggregate([
            {
                $match: {
                    user: userMakingRequest._id,
                },
            },
            {
                $lookup: {
                    from: "dishmodels",
                    localField: "items.product",
                    foreignField: "_id",
                    as: "items.product",
                },
            },
        ]);
        // console.log(cartId)
        // console.log(cart);
        if (!cart) {
            throw new ApiError(404, "Cart not found");
        }
        res.status(200).json(new ApiResponse(200, cart, "Cart data fetched"));
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({ error: err });
    }
};
