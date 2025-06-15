import { Response } from "express";
import { UserModel } from "../../models/user.model";
import {AuthRequest} from "../../middlewares/auth.middleware"
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

//TODO : MODIFY THE FUNCTIONS TO USE THE FINDBYIDANDUPDATE METHOD


export const changePasswordFunction = async (req: AuthRequest, res: Response) => {
    try {
        // get the user making request
        const userIdMakingRequest = req.user?._id;
        if(!userIdMakingRequest){
            throw new ApiError(401, "Not authorised")
        }
        const userMakingRequest = await UserModel.findById(userIdMakingRequest);
        if(!userMakingRequest){
            throw new ApiError(404, "User not found")
        }
        // get the old password for authentication and new password
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword){
            throw new ApiError(400, "All fields are required")
        }
        // check if new password is not same as old password
        if(oldPassword === newPassword){
            throw new ApiError(400, "New password cannot be same as old password")
        }
        // change the password
        userMakingRequest.password = newPassword
        // save to database
        // Doubt is do we need to hash the password before saving
        await userMakingRequest.save({validateBeforeSave: false})
        // return the response
        res.status(200).json(new ApiResponse(200, {}, "Password changed sucessfully"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}