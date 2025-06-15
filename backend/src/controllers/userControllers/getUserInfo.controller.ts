import { Response } from "express";
import { UserModel } from "../../models/user.model";
import {AuthRequest} from "../../middlewares/auth.middleware"
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

export const getUserInfoFunction = async (req: AuthRequest, res: Response) => {
    try {
        //get the user
        if(!req.user){
            throw new ApiError(404, "Please login first")
        }
        const userId = req.user?._id
        // Populating the fields
        const userCompleteInfo = await UserModel.aggregate([
            {
                $project: {
                    password: 0
                }
            },
            {
                $match: {
                    _id: userId
                }
            },
            {
                $lookup: {
                    from: "dish",
                    localField: "favroites",
                    foreignField: "_id",
                    as: "favroites",
                }
            },
            {
                $lookup: {
                    from: "ordermodels",
                    localField: "orders",
                    foreignField: "_id",
                    as: "orders",
                }
            }
        ])
        if(!userCompleteInfo){
            throw new ApiError(404, "User not found")
        }
        res.status(200).json(new ApiResponse(200, userCompleteInfo, "User found"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
};