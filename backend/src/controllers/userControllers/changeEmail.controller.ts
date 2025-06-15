import { Response } from "express";
import { UserModel } from "../../models/user.model";
import {AuthRequest} from "../../middlewares/auth.middleware"
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

//TODO : MODIFY THE FUNCTIONS TO USE THE FINDBYIDANDUPDATE METHOD

export const changeEmailFunction = async (req: AuthRequest, res: Response) => {
    try {
        // get user whose email is to change
        const userIdMakingRequest = req.user?._id;
        if(!userIdMakingRequest){
            throw new ApiError(401, "Not authorised")
        }
        const userMakingRequest = await UserModel.findById(userIdMakingRequest);
        if(!userMakingRequest){
            throw new ApiError(400, "User not found")
        }
        // get new email
        const {newEmail} = req.body
        if(!newEmail){
            throw new ApiError(400, "New email is required")
        }
        // change the email
        userMakingRequest.email = newEmail
        // save to database
        userMakingRequest.save({validateBeforeSave: false})
        // return the response
        res.status(200).json(new ApiResponse(200, {"New Email": newEmail}, "Email changed sucessfully"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}